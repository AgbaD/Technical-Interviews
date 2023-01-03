const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.tokens;
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.jwt, (err, user) => {
            if (err) {
                return res.status(403).json({
                    'status': 'error',
                    'message': 'Token is invalid'
                })
            }
            req.user = user;
            next
        })
    } else {
        return res.status(403).json({
            'status': 'error',
            'message': 'Token is invalid'
        })
    }
}



module.exports = {verifyToken}
