import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util'

const userRouter = express.Router();

userRouter.post('/login', async (req, res, next) => {
    const loginUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (loginUser) {
        res.send({
            _id: loginUser.id,
            name: loginUser.name,
            email: loginUser.email,
            isAdmin: loginUser.isAdmin,
            token: getToken(loginUser)
        });
    }
    else {
        res.status(401).send({msg: 'Invalid Email or Password'});
    }
})


userRouter.post('/register', async (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const newUser = await user.save();
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        });
    }
    else {
        res.status(401).send({msg: 'Invalid data'});
    }
})


userRouter.get('/createadmin', async (req, res, next) => {
    try {
        const user = new User({
            name: 'Admin',
            email: 'admin@email.com',
            password: 'admin1234',
            isAdmin: true
        })
    
        const newUser = await user.save();
        res.send(newUser);
    }
    catch (error) {
        res.send({ msg: error.message });
    }
    
})

export default userRouter;