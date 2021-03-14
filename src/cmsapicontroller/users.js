//import database
import db from '../models';
const AdminUser = db.adminuser;
const Op = db.Sequelize.Op;

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

//validation
import validateLoginInput from '../validation/login';
import key from '../utilities/keys';

export default {
    generateSecretKey: (req, res, next) => {
        console.log('loginnnnn');
        crypto.randomBytes(48, (err, buffer) => {
        if (err) throw err;
        req.secretkey = buffer
            .toString("base64")
            .replace(/\//g, "") // Because '/' and '+' aren't valid in URLs
            .replace(/\+/g, "-");
        });
        console.log('secretkey', req.secretkey)
        return next();
    },

    generateToken: (req, res, next) => {
        const payload = { id: req.body.id, username: req.body.username };
        const token = jwt.sign(
            payload,
            key.secretOrKey,
            { expiresIn: 3600 });
        req.cdata = {
            success: 1,
            message: "Login successful",
            jwt: token,
        }
        return next();
    },

    login: (req, res, next) => {
        const { errors, isValid } = validateLoginInput(req.body);
        console.log('loginnnnn', isValid)
        if (!isValid) {
            return res.status(400).json(errors);
        } else {
            const user = AdminUser.findAll({where: { username: req.body.username}})
            
            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            } else{
                return res.status(200).json(req.cdata);
            }
        }
    },

    generateHash: (req, res, next) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              req.hashedpassword = hash;
              return next();
            });
        });
    },

    signup: (req, res, next) => {
        // Ensure that all entries by the user are valid
        const { errors, isValid } = checkregistrationvalidation(req.body);

        // In case of invalid user entry, a status 400 is returned with the error
        if (!isValid) {
            return res.status(400).json(errors);
        } else {
            const user = ({
                email: req.body.email,
                password: req.hashedpassword,
                token: req.token,
                is_verified: false
            });

            console.log(User);

            AdminUser.create(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                errors.account = "Email already registered";
                res.status(400).json(errors);
              });

        }

    },
    
};