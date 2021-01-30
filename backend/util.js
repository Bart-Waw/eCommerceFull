import jwt from 'jsonwebtoken';
import config from './config';

export const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, 
    config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

export const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({msg: 'Invalid Token' })
            }
            else {
                req.user = token;
                next();
                return
            }
        })
    }
    return res.statu(401).send({msg: 'Token was not supplied' })
}

export const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        return next();
    }
    else {
        return res.status(401).send({ msg: 'Admin token is invalid' });
    }
}