const express = require('express');
const sequelize  = require('sequelize');
const User = require('./models/User');
const CrytopJs = require('crypto-js');
require('dotenv').config();

const { genToken } = require('./utils/tokenGen');


const app = express();

app.post('/register', async (req, res) => {
   try {
    if(req.body.password !== req.body.repeatPassword) {
        return res.status(400).json({
            "status": "error",
            "message": "Passwords do not match"
        })
    }
    const tmpUser = await User.findOne({
        where: {email: req.body.email}
    })
    if (tmpUser) return res.status(400).json({
        'status': 'error',
        'message': 'Email address has already been used'
    })

    // hash password
    password_hash = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_PASS
    ).toString();

    const user = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: password_hash,
    });
    return res.status(201).json({
        'status': 'success',
        'message': 'User Created successfully',
        'data': user
    })
   } catch (error) {
        console.log(error)
        return res.status(400).json({
            'status': 'error',
            'message': error
        })
   }
})
app.post('/create')


app.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({
            where: {email: req.body.email}
        })
        if (!user) return res.status(404).json({
            'status': 'error',
            'message': 'Email or password is incorrect'
        })
        // hash passsword
        const hashPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_PASS
        );
        const tempPassword = hashPassword.toString(CryptoJS.enc.Utf8);
        if (tempPassword !== req.body.password) return res.status(401).json({
            'status': 'error',
            'message': 'Email or password is incorrect'
        })
        const token = genToken(user, '2h')
        return res.status(200).json({
            'status': 'success',
            'message': 'login successful',
            'data': {
                'token': token
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            'status': 'error',
            'message': error
        })
    }
})