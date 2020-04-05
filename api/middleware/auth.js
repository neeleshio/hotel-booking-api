const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token, 'privateKey');
        req.userId = verify.userId;
    }
    catch (error) {
        res.status(500).json({
            message: "Token Auth failed"
        })
    }
    next()
};