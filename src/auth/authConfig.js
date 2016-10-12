import passportJWT from 'passport-jwt';
import Account from '../account/Account.js';
import passport from 'passport';
import config from '../config';
import {requestProfile} from './profileRequest.js';

let ExtractJWT = passportJWT.ExtractJwt;
let JWTStrategy = passportJWT.Strategy;

let jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: Buffer.from(config.auth.secret, 'base64')
};

let serializer = async (jwtPayload, done) => {
    let userProfile = await requestProfile(jwtPayload.sub);
    try {
        let user = await Account.findOne({email: userProfile.email});
        if (user) {
            return done(null, user);
        }

        let userData = {
            email: userProfile.email,
            name: userProfile.name,
            userID: jwtPayload.sub,
            currentBalance: 0
        };

        user = new Account(userData);
        user.save();

        done(null, userData);
    } catch (e) {
        return done(e, false);
    }
};

passport.use(new JWTStrategy(jwtOptions, serializer));
