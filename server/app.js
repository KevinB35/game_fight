const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const charactersRouter = require('./routes/characters');
const {initDb} = require("./config/database");

const cors = require('cors');

const app = express();

initDb()
    .then(() => {
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));

        app.use(cors({
            'allowedHeaders': ['authorization', 'sessionId', 'Content-Type'],
            'exposedHeaders': ['authorization', 'sessionId'],
            'origin': 'http://localhost:3000',
            'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'preflightContinue': false
        }));

        app.use('/users', usersRouter);
        app.use('/characters', charactersRouter);

        app.use((req, res) => {
            res.status(500).send("Erreur 500");
        })
        app.use((req, res) => {
            res.status(404).render('404')
        })
    })
    .catch(err => {
        console.error(err)
    })

module.exports = app;
