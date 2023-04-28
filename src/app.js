import express from "express";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.listen(process.env.APP_PORT || 8085, () => {
    console.log(`Server running on ${process.env.APP_PORT || 8085}`);
})