const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (token, callback) => {
        if (token) {
            verify(token, "aqwesrxctvyibunizxrdctfvygbuh789645", (err, decoded) => {
                if (err) {
                    return callback({
                        success: 0,
                        message: "Invalid token"  
                        }); 
                }
                else{
                    return callback(decoded);
                }
            })
        }else{
            return callback({
                success: 0,
                message: "Access denied! unauthorized user"
            })
        }
    }
};