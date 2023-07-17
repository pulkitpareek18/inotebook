const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Harryisagoodb$oy';

const fetchuser = (req, res, next) => {
    // Get the user from the JWT token and add ID to the req object.
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token." })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user=data.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: "Please authenticate using a valid token." })
    }


}

module.exports = fetchuser