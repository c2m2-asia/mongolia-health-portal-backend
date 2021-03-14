import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from './src/models';
import apidata from './src/apicontroller/index';
import cmsapi from './src/cmsapicontroller/index';


var app = express();

import cronJob from "./src/apicontroller/cronjobscheduler";
const useCronJob = true;
if(!cronJob.running && useCronJob){
	cronJob.start(); //start cron job
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
	next();
});
app.use("/extracts",  express.static(__dirname + "/extracts"));
app.use("/apidocs", express.static(path.join(__dirname, "/apidocs")));
app.use('/api/v1', apidata);
app.use('/admin/api/v1', cmsapi);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

db.sequelize.sync()

export default app;
