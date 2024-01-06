import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// create server instance
export const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// import routes 

// use routes

