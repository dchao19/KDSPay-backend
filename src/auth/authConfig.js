import {Strategy as JWTStrategy, ExtractJWT} from 'passport-jwt';
import Account from '../account/Account.js';
import passport from 'passport';

let jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeader(),
    secretOrKey: "secret"
};

let serializer = (jwtPayload, done) => {
    Account.findOne({id: jwtPayload.sub}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            let newAccount = new Account();
            newAccount.id = jwtPayload.sub;
        }
    });
};

passport.use(new JWTStrategy(jwtOptions, serializer));
