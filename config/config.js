// Config depending on `process.env.NODE_ENV`, default is `development`

var path = require('path'),
	rootPath = path.normalize(__dirname + '/..')

var config = {
    // Dev config
    development: {
        server: {
            port: 9000,
            hostname: 'localhost'
        },
        database: {
            url: 'mongodb://localhost/nodetemplate'
        },
        root     : rootPath,
        app      : {
            name : 'NodeJsTemplate'
        }
    },

    // Test config
    test: {
        server: {
            port: 9001,
            hostname: 'localhost'
        },
        database: {
            url: 'mongodb://localhost/nodetemplate_test'
        }
    }
}

module.exports = config[process.env.NODE_ENV || 'development'];