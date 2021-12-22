"use strict"
const useragent = require('useragent');

class LoginData {
    static getLoginData(req){
        return new Promise(async(resolve, reject) => {
            let ip = ( req.headers['x-forwarded-for'] || '').split(",").pop() || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
            let _user_agent = useragent.lookup(req.headers['user-agent']);

            let login_schema = {
                ip: ip,
                browser: _user_agent.toString(),
                details: JSON.stringify({})
            }

            resolve(login_schema)
        })
    }
}

module.exports = LoginData;