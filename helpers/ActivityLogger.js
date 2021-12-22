class ActivityLogger {
    static logActivity(type, id, login_id, activity){
        return new Promise(async (resolve, reject) => {
            try{
                if(type === "admin"){
                    const { AdminActivity } = require("../database/models/AdminActivity");
                    const adminActivity = await new AdminActivity({activity, admin_id: id, admin_login_id: login_id,});
                    adminActivity.save();
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