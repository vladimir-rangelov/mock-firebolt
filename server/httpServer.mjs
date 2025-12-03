
import path from 'path';
const __dirname = path.resolve();
import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import cors from 'cors';

import * as configureAPI from './configureHttpAPI.mjs';
const app = express();

function startHttpServer() {

    app.use(bodyParser.json({ limit: '1mb' })); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({             // to support URL-encoded bodies
        extended: true
    }));
    //app.use(cors());
    //app.options('*', cors());

    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './views');

    configureAPI.configureAPI(app);


    let port = 3333;
    app.listen(port);
    console.log(`Listening on HTTP port ${port}...`);


}

export { startHttpServer };
