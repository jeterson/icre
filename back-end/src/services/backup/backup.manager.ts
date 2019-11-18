import fs from 'fs';
import path from 'path';
import { BackupRepository } from '../repositories/backup.repository';
import { Response } from 'express';
import { ErrorResponse } from '../model/error.model';
const scheduler = require('node-schedule')

const DIR_BKP = process.env.ICRE_DIR_BACKUP;

export class GerenciadorBackup {
    backupRepository = new BackupRepository();
    task: any;

    copyFile(manual = false, callback: (err: any) => void) {
        const env = process.env.NODE_ENV || 'development';
        console.log('Ambiente: ' + env);
        const source = env === 'development' ? './src/dev.sqlite3.db' : './dev.sqlite3.db';


        let dirs = DIR_BKP ? DIR_BKP : 'C:/bkp_icre';
        const diaSemanaStr = this.getDayOfWeekStr();

        for (let dir of dirs.split(';')) {

            const dirBkp = `${dir}/${diaSemanaStr}`;


            if (!fs.existsSync(dirBkp)) {
                fs.mkdirSync(dirBkp);
            }

            fs.copyFile(source, `${dirBkp}/dev.sqlite3.db`, (err: any) => {
                if (err) {

                    this.backupRepository.insert({
                        data: new Date(),
                        status: 'FALHA',
                        manual: manual,
                        log: new ErrorResponse(err).message
                    }).then(e => {
                        console.log('Log com erro registrado');
                    }).catch(err => {                        
                        console.log('Erro ao gravar log');
                    });


                    if (callback != null) {
                        callback(err);
                    }


                } else {
                    console.log('Arquivo de banco de dados copiado com sucesso');
                    const obj = {
                        data: new Date(),
                        status: 'SUCESSO',
                        manual: manual,
                        log: 'Backup Executado com sucesso para ' + dirBkp
                    };
                    if (callback != null)
                        callback(null);
                    this.backupRepository.insert(obj).then(res => {
                        console.log('Log registrado')
                    }).catch(err => {
                        console.log('Falha ao gravar log', err)
                    });
                }

            });

        }
    }

    getDayOfWeekStr() {
        const date = new Date();

        switch (date.getDay()) {
            case 0:
                return 'Domingo';
            case 1:
                return 'SegundaFeira';
            case 2:
                return 'TerçaFeira';
            case 3:
                return 'QuartaFeira';
            case 4:
                return 'QuintaFeira';
            case 5:
                return 'SextaFeira';
            case 6:
                return 'Sabado';
            default:
                return 'Domingo';
        }
    }

    executeBackup(res: Response) {
        this.copyFile(true, (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send();
            }
        });
    }




    async startAutoBkp() {
        if (this.task != null) {
            this.task.cancel();
        }
        const config = await this.backupRepository.getConfig();
        const horariostr: string = config.horario;
        const horario = {
            hora: horariostr.substr(0, 2),
            minuto: horariostr.substr(2, 4)
        }

        if (config.automatico) {
            this.task = scheduler.scheduleJob({ hour: horario.hora, minute: horario.minuto }, () => {
                this.copyFile(false, null);
            });
        }
    }

    async getConfig(res: Response) {
        try {
            const cfg = await this.backupRepository.getConfig();
            res.send(cfg);
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }

    async alterConfig(cfg: any, res: Response) {
        try {
            await this.backupRepository.alterConfig(cfg);
            this.startAutoBkp();
            res.send();
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }
}