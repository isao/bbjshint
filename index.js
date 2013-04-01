#!/usr/bin/env node
/*jshint node:true */
'use strict';

var fs = require('fs'),
    lint = require('jshint').JSHINT,
    opts = require('./jshint-flags'),
    bbresults = require('bbresults'),
    pathname = process.env.BB_DOC_PATH;


function run(err, str) {
    var title = 'JSHint results';

    if (err) {
        bbresults.notify('error, reading ' + pathname, {title: title});
    } else if(lint(str, opts)) {
        bbresults.notify(pathname + ' is lint free', {title: title});
    } else {
        bbresults.show(lint.errors, pathname, title);
    }
}

if (require.main === module) {
    fs.readFile(pathname, 'utf-8', run);
}
