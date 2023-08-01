const express = require('express')
const passport = require('passport')
const session = require("express-session")
const mongoose = require("mongoose")

require('dotenv').config()
const path = require('path')
const app = express()



require("./auth")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'views')))
// app.use(express.static('uploads'))

const port = process.env.PORT || 5001

const dbConnect = async () => {
    try {
        conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected sucessfully")

    } catch (error) {
        console.log(error)
    }
}

dbConnect()

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})



// Loggin in with Google 
app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(passport, passport.initialize())
app.use(passport.session())

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
    }));

app.get('/auth/google/failure', (req, res) => {
    res.send("something went wrong")
})

app.get('/auth/protected', isLoggedIn, (req, res) => {
    let name = req.user.displayName
    res.send(`Hello ${name}`)
})

app.get('/auth/logout', (req, res) => {
    req.session.destroy()
    res.send('See you agan')
})









// OTP
// npm install otp-generator --save


// npm install joi
// const joi = require("joi") // validation

// const userSchema = joi.object({
//     firstName: joi.string().required(),
//     lastName: joi.string().required(),
//     email: joi.string().email().required(),
//     password: joi.string().min(8).max(30),
// })

// app.post('/createuser', (req, res)=>{
//     const {error, value} = userSchema.validate(req.body)
//     if (error){
//         res.send({error: error.details})
//     }else{
//         res.send('validated data:', value)
//     }
// })