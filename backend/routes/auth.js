const express = require('express');
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = 'Harryisagoodb$oy'; 

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required.
router.post("/createuser", [
    body("email", "Enter a valid email.").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 Characters.").isLength({ min: 5 })

], async (req, res) => {

    // If there are errors return Bad requests and Errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // Check whether the email exists already
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists." })
        }
        else {
            // Create a new User
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword
            })

            const data = {
                user:{
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data,JWT_SECRET)
            res.json({ authtoken })
        }

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal Server Error.");
    }
})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required.
router.post("/login", [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password cannot be blank.").exists()
], async (req, res) => {

    // If there are errors return Bad requests and Errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email: email})
        if(!user){
            return res.status(400).json({ error: "Please try to login with correct credentials." })
        }

        const passwordCompare = await bcrypt.compare(password,user.password);

        if(!passwordCompare){
            return res.status(400).json({ error: "Please try to login with correct credentials." })
        }

        const data = {
            user:{            
                id: user.id
            }
        }

        const authtoken = jwt.sign(data,JWT_SECRET);
        res.json({authtoken});

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal Server Error.");
    }

})

// ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser". Login required.

try {
    router.post("/getuser", fetchuser, async (req, res) => {
        let userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    })
} catch (error) {
    console.error(error.message)
    return res.status(500).send("Internal Server Error.");
}

module.exports = router