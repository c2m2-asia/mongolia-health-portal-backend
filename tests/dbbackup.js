import {execute} from '@getvim/execute';
import compress from 'gzipme';
import axios from 'axios';
import FormData from 'form-data';
import fs from'fs';
import cron from 'node-cron';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const username = config.username;
const database = config.database;
const date = new Date();

const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const fileName = `db-backup-${currentDate}.tar`;
const fileNameGzip = `${fileName}.tar.gz`;

function backup() {
    execute(
        `pg_dump -U ${username} -d ${database} -f ${fileName} -F t`,
    ).then(async ()=> {
        await compress(fileName);
        fs.unlinkSync(fileName);
        console.log("Finito");
    }).catch(err=> {
        console.log(err);
    })
}
 
function restore() {
    execute(`pg_restore -cC -d ${database} ${fileNameGzip}`)
        .then(async ()=> {
            console.log("Restored");
        }).catch(err=> {
        console.log(err);
    })
}
 
function sendToBackupServer(fileName = fileNameGzip) {
    const form = new FormData();
    form.append('file', fileName);
    axios.post('http://localhost:8080', form, {
        headers: form.getHeaders(),
    }).then(result => {
        // Handle result…
        console.log(result.data);
        fs.unlinkSync(fileNameGzip);
    }).catch(err => {
        // log error, send it to sentry... etc
        console.error(err);
    });
}
 
function startSchedule() {
    cron.schedule('*/1 * * * *', () => {
        backup()
        sendToBackupServer();
    }, {});
}
 
module.exports = {
    startSchedule
}