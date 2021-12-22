class ActivityLogger {
    static logActivity(type, id, login_id, activity){
        return new Promise(async (resolve, reject) => {
            try{
                if(type === "admin"){
                    // const AdminModel = require('../database/models').admin_activities;
                    // await AdminModel.create({activity, admin_id: id, admin_login_id: login_id})
                }
                else{
                    const { UserActivity } = require("../database/models/UserActivity");
                    const userActivity = await new UserActivity({activity, user_id: id, user_login_id: login_id,});
                    userActivity.save();
                }
                resolve();
            }
            catch (err) {
                reject(err);
            }
        })
    }
}

module.exports = ActivityLogger;