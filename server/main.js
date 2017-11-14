import express from 'express';
import path from 'path';

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const devPort = 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, './../public')));

app.get('/hello', (req, res) => {
    return res.send('Hello Sunglik');
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

