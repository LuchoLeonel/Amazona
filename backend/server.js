import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import cors from 'cors';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5000

const app = express();

const uri = process.env.MONGODB_URL;

try {
    mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("Connected"));    
} catch (error) { 
    console.log("could not connect");    
}


app.use(bodyParser.json());

/* MIDDLEWARE
const whitelist = ["http://localhost:3000", `http://localhost:${PORT}`, "https://amazona-project.herokuapp.com", "http://localhost:27017"]
const corsOption = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin Rejected")
            callback(new Error("Not allowed by CORS"))
        }
    }
}
app.use(cors(corsOption)) */

app.use('/api/users', userRoute);
app.use('/api/product', productRoute);

/*
app.get('/api/product/:id', (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ msg: "Product Not Found." })
    }
});*/

/* app.get('/api/product', (req, res) => {
    res.send(data.products);
}); */


app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


app.listen(PORT, () => {console.log(`Server started at http://localhost:${PORT}`)});

