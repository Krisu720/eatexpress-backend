const router = require("express").Router();

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post('/login',async (req,res)=>{
    const user = await User.findOne({
        email: req.body.email
    });
    if(!user) {

        res.status(401).json("Wrong email or password");
    } else {

        const unhashedPassword = CryptoJS.AES.decrypt(user._doc.password, process.env.PASS_SECRET).toString(CryptoJS.enc.Utf8);
        if(unhashedPassword !== req.body.password) {

            res.status(401).json("Wrong email or password");
        } else {

            const token = jwt.sign({
                id:user._id,
            },process.env.JWT_SECRET,{expiresIn:"30s"})
            const {password,...destructured} = user._doc; 
            res.status(200).json({...destructured,token})
        }
    }
})


router.post('/register', async (req, res) => {
    const { name, surname, email, password, role, img, address, phone } = req.body;
    const hashedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString();
    const user = await User.create({ name, surname, email, password:hashedPassword, role, img, address, phone });
    res.json(user);
})

module.exports = router;
