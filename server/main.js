import express from 'express';
import path from 'path';

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import morgan from 'morgan';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import session from 'express-session';

import api  from './routes';


const app = express();
const port = 3000;
const devPort = 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {console.log('Connected to mongodb Server');});
mongoose.connect('mongodb://localhost/admin');

app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true
}));

app.use('/', express.static(path.join(__dirname, './../public')));

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

app.use(function(err, req, res ,next){
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});


if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}

