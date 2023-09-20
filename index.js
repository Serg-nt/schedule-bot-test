import express from 'express';
import mongoose from "mongoose";
import config from 'config';
import cors from 'cors';
import {UserController} from "./controllers/index.js";
import {startBot} from "./bot/index.js";
import TelegramApi from "node-telegram-bot-api";


const app = express();
const PORT = config.get('serverPort');

app.use(express.json());
app.use(cors());

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"));
        console.log('DB ok');

        app.get('/users', UserController.getAllUsers);
        app.get('/users/sort/:sort', UserController.sortUser);
        app.post('/users', UserController.addUser);
        app.delete('/users/:id', UserController.removeUser);
        app.put('/users/:id', UserController.updateUser)


        app.listen(PORT, () => {
            console.log('Server started on port ', PORT);
        })
    } catch (err) {
        console.log('DB error ', err);
    }
}

startBot()

start();