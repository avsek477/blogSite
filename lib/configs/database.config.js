(function () {

    'use strict';

    module.exports = {
        development: {
            username: 'avsekdikshya',
            password: 'avsekDikshya123',
            host: 'ds243325.mlab.com',
            port: '43325',
            dbName: 'prj_ourblog'
        },
        production: {
            username: 'avsekdikshya',
            password: 'avsekDikshya123',
            host: 'ds243325.mlab.com',
            port: '43325',
            dbName: 'prj_ourblog'
        },
        test: {
            username: 'demouser',
            password: 'demouser',
            host: 'ds119728.mlab.com',
            port: '19728',
            dbName: 'prj_nodebeats'
        },
        dbBackup: {
            opt1: {
                type: 'archive',
                name: 'prj_nodebeats.archive',
                active: false,
                gzip: true
            },
            opt2: {
                type: 'bson',
                name: 'prj_nodebeats',
                active: true
            }
        }
    };
})();
