const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.get('token');
    console.log(token);
    jwt.verify(token, 'secret',(err, decoded)=> {
        if(err) {
            return res.status(401).json({
                message: "user not valid",
                error: err,
                httpStatus: 400
            })
        }
        req.user = decoded.data;
        //continue the request after check
        next();
    })
}

const checkAdmin = (req, res, next) => {

    const role = req.user.role;

    if(role === "ADMIN") {
        next();
    } else {
        return res.status(401).json({
            message: "user not valid",
            error: "invalid user for current operation",
            httpStatus: 401
        })
    }
}

module.exports = {
    checkAuth,
    checkAdmin
}