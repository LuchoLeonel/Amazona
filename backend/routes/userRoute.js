import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';


const router = express.Router();

router.post('/signin', async (req, res) => {
    
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (signinUser) {
        res.send({
            id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({ msg: 'Invalid Email or Password'});
    }
})

router.post('/register', async (req, res) => {

    let users = await User.find({});
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == req.body.email) {
            res.status(401).send({msg: 'User already created'});
        }
    }

    if (res.statusCode !== 401){
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        const newUser = await user.save();
        if (newUser) {
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
        })
        }
    }
})


router.get("/createadmin", async (req, res) => {

    let users = await User.find({});
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == 'carrenoluciano@gmail.com') {
            res.status(401).send({msg: 'Admin already created'});
        }
    }

    if (res.statusCode !== 401){
        try {
        const user = new User({
            name:'LuchoLeonel',
            email:'carrenoluciano@gmail.com',
            password:'12345678',
            isAdmin: true
        });
        
        const newUser = await user.save();
        res.send(newUser);
        } catch (error) {
            res.send({ msg: error.message });
        }
    }
    
})


/* DEVELOPER ROUTE
router.get('/userslist', async function(req, res) {
    let users = await User.find({});
    res.send({ users });
});
*/

/* DEVELOPER ROUTE
router.post('/delete/:email', async function(req, res) {
    const userEmail = req.params.email;
    User.findOne({
        email: userEmail,
    }).remove().exec();

    res.send({ msg: `El usuario ${userEmail} fue removido` });
});
*/

export default router;