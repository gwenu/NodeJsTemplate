var logger           = require('morgan');
var path             = require('path');
var methodOverride   = require('method-override');
var bodyParser       = require('body-parser');
var cookieParser     = require('cookie-parser');
var session          = require('express-session');
var MongoStore       = require('connect-mongo')({ session: session });
var errorHandler     = require('errorhandler');
var expressValidator = require('express-validator');
var env              = process.env.NODE_ENV || 'development';
var pkg              = require('../package.json');
var flash            = require('express-flash');
var routes           = require('../app/routes');

module.exports = function (app, express, passport) {

    var allowCrossDomain = function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Credentials', true)
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    };

    // settings
    app.set('env', env);
    app.set('port', app.config.server.port || 3000);
    app.set('views', path.join(__dirname, '../app/views'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.static(path.join(__dirname, '../public')));

    app.enable('trust proxy');
    app.disable('x-powered-by');

    // Express use middlewares
    app.use(allowCrossDomain);
    if (env === 'development') {
        app.use(logger('dev'))
    } else {
        app.use(logger())
    };

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
    	extended: true
    }));
    app.use(expressValidator());
    app.use(methodOverride());

    app.use(cookieParser('notagoodsecretnoreallydontusethisone'));
    app.use(session({
        secret: pkg.name,
        store: new MongoStore({
            url: app.config.database.url,
            collection : 'sessions',
            auto_reconnect: true
        }), 
        resave: true,
        saveUninitialized: true
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session({
        maxAge: new Date(Date.now() + 3600000)
    }));
    app.use(flash());

    /** ROUTES Apps */
    app.use(routes);

}
