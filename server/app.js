import createError from'http-errors';
import express from'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from'./routes/users';

import  webpack  from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.dev.config';

var app = express();

const nodeEviroment = process.env.NODE_ENV || 'production';

if(nodeEviroment == 'developement'){
  console.log("Ejecutando en modo desarrollo 🛠️");

  webpackConfig.mode = 'development';

  webpackConfig.devServer.port = process.env.PORT;

  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
  ];

  webpackConfig.plugins.push[new webpack.HotModuleReplacementPlugin()];

  const bundle = webpack(webpackConfig);

  app.use(WebpackDevMiddleware(bundle, {
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(WebpackHotMiddleware(bundle));
}else{
  console.log("Ejecutando en modo produccion 🚀");
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

export default app;
