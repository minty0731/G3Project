import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import {Vegan} from './models/veganModel.js';

const app = express();

//parsing request body
app.use(express.json());

app.get('/', (request, response) =>{
    console.log(request);
    return response.status(234).send("welcome");
});

// Route for Save a new vegan
app.post('/vegan', async (request, response) => {
    try{
        if (
            !request.body.name ||
            !request.body.user ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields: name, user, publishYear",
            });
        }
        const newVegan = {
            name: request.body.name,
            user: request.body.user,
            publishYear: request.body.publishYear,
        };

        const veganstore = await Vegan.create(newVegan);

        return response.status(201).send(veganstore)
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Route for Get all Vegan store from database

app.get('/vegans', async (request, response) =>{
    try {
        const vegans = await Vegan.find({});

        return response.status(200).json({
            count: vegans.length,
            data: vegans

    });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for Get all Vegan store from database by id

app.get('/vegans/:id', async (request, response) =>{
    try {

        const {id} = request.params;

        const vegan = await Vegan.findById(id);


        return response.status(200).json(vegan);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
}); 

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () =>{
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});