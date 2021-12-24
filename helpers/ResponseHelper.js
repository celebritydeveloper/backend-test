class ResponseHelper {
    static async sendResponse(
        req,
        res,
        status,
        error = null,
        data = null,
        message = null
    ){
        let response = {
            data: data ? data : false,
            error: error ? true : false
        }

        switch (status){
            case 200:
                response["message"] = message ? message : "Successful";
                break;
            case 201:
                response["message"] = message ? message : "Created Successfully";
                break;
            case 203:
                status = 403;
                response["error"] = true;
                response["message"] = message ? message : "An Error Occured";
                break;
            case 204:
                break;
            case 401:
                response["error"] = true;
                response["message"] = message ? message : "Unauthorized Access";
                break;
            case 403:
                response["error"] = error;
                response["message"] = message ? message : "Invalid Request Format";
                break;
            case 404:
                response["error"] = true;
                response["message"] = message ? message : "Resource Not Found";
                break;
            case 405:
                response["error"] = true;
                response["message"] = message ? message : "Method Not Allowed";
                break;
            case 500:
                response["error"] = true;
                response["message"] = message ? message : "Internal Server Error";
                break;
        }

        return res.status(status).json(response)

    }
}

module.exports = ResponseHelper;