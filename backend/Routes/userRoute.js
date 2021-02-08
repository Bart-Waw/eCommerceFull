import express from 'express';
import { getToken } from '../util'
const pool = require('../db');

const userRouter = express.Router();

userRouter.post('/login', async (req, res, next) => {
    const loginUser = await pool.query(`select * from users where email = '${req.body.email}' AND password = '${req.body.password}';`)
    if (loginUser) {
        res.send({
            _id: loginUser.rows[0]._id,
            name: loginUser.rows[0].name,
            email: loginUser.rows[0].email,
            isAdmin: loginUser.rows[0].isAdmin,
            token: getToken(loginUser.rows[0])
        });
    }
    else {
        res.status(401).send({msg: 'Invalid Email or Password'});
    }
})


userRouter.post('/register', async (req, res, next) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    const newUser = await pool.query(`insert into users (name, email, password) values
    ('${user.name}', '${user.email}', '${user.password}');`)
    if (newUser) {
        res.status(201).send({msg: 'Account registered successfully'});
    }
    else {
        res.status(401).send({msg: 'Invalid data'});
    }
})

export default userRouter;