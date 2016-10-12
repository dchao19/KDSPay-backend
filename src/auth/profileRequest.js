import unirest from 'unirest';
import config from '../config.js';
import {getUserProfile} from './authURLS.js';

let requestProfile = (userID) => {
    return new Promise((resolve, reject) => {
        let request = unirest.get(`${getUserProfile}${userID}`);
        request.header('Authorization', `Bearer ${config.auth.userProfileSecret}`);
        request.end((response) => {
            resolve(response.body);
        });
    });
};

export {requestProfile};
