const { Request, Response, NextFunction } = "express";
const jwt = require("jsonwebtoken");
const { VerifyErrors } = require("jsonwebtoken");



const verifyJwt = (req, res, next) => {
    // console.log(req.headers)
    const authHeader = req.headers.authorization

    try {
        if (!authHeader) {
            // console.log("TOKEN NOT RECIEVED")
            // console.log(req.headers.authorization)
            return res
                .status(401)
                .json({ message: "Unauthorized: Missing Authorization header", status: 404 });
        }

        const token = authHeader.split(" ")[1];
        // console.log(token)

        jwt.verify(
            token,
            process.env.TOKEN_SECRET || "",
            (err, user) => {
                if (err) {
                    console.log(err)
                    return res.status(403).json({ error: err, message: "Invalid token", staus: 404 });
                }

                // const  now = Date.now(); // Get the current timestamp in milliseconds
                // const  date = new Date(now);
                // const  hours = date.getHours().toString().padStart(2, '0');
                // const  minutes = date.getMinutes().toString().padStart(2, '0');
                // console.log(hours)
                // console.log(user)
                // console.log(Date.now())
                if (user.exp < Date.now() / 1000) {
                    return res.status(401).json({ error: err, message: 'Unauthorized: Token expired', status: 404 });
                }
                // Add a check for user existence before assigning
                if (!req.hasOwnProperty("user")) {
                    req.user = user;
                }
                console.log("object")
                next();
            }
        );
    } catch (error) {
        console.log(error)
        res.send({
            error: error,
            status: 404
        })
    }
};

module.exports = { verifyJwt };
