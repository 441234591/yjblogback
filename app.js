var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var https = require('https');
var http = require('http');
var fs =require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//https读取密钥
const httpsOption = {
  key : fs.readFileSync("scs1617625734000_www.yijieback.xyz_server.key"),
  cert: fs.readFileSync("scs1617625734000_www.yijieback.xyz_server.crt")
}
var httpsServer=https.createServer(httpsOption, app);

var httpServer=http.createServer(app);

app.use('/',(req,res,next)=>{
  //console.log(req);
  console.log("router 请求");
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

httpsServer.listen(443);
httpServer.listen(8081);

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

module.exports = app;
