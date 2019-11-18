import { applyMiddleware, applyRoutes } from './utils/index';
import middleware from './middleware';
import routes from './services';
import express from 'express';
import http from 'http';
//const functions = require('firebase-functions');
import { GerenciadorBackup } from './services/backup/backup.manager';
const gerenciadorBkp = new GerenciadorBackup();

const router = express();

applyMiddleware(middleware, router);
applyRoutes(routes, router);

const { PORT = 3000 } = process.env;
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

/*const schedule = require('node-schedule');

var j = schedule.scheduleJob({second: 5}, function(){
    console.log(new Date());
    console.log('The answer to life, the universe, and everything!');
  });*/
// gerenciadorBkp.copyFile();
gerenciadorBkp.startAutoBkp();
console.log(`Diretório de backup do banco de dados: ${process.env.ICRE_DIR_BACKUP}`)
console.log('Env', process.env.NODE_ENV);

const server = http.createServer(router);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//exports.app = functions.https.onRequest(server);