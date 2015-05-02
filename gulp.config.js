module.exports = function () {

    var config = {
        build: './build/',
        outputjs: 'geom-collision.js',
        sourcejs: './src/**/*.js',
        testjs: './test/**/*.js',
        rootjs: './*.js'
    };
    config.allJs = [
        config.sourcejs,
        config.testjs,
        config.rootjs
    ];

    return config;

};
