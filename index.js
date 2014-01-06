#!/usr/bin/env node
/*jshint node:true */
'use strict';

var fs = require('fs'),
    lint = require('jshint').JSHINT,
    opts = require('./jshint-flags'),
    bbresults = require('bbresults'),

    title = 'JSHint results',
    pathname = process.env.BB_DOC_PATH;


function run(err, str) {
    if (err) {
        bbresults.notify('error, reading ' + pathname, {title: title});
    } else if(lint(str, opts)) {
        bbresults.notify(pathname + ' is lint free', {title: title});
    } else {
        bbresults.show(lint.errors, pathname, title);
    }
}

if (require.main === module) {
    if (undefined === pathname) {
        bbresults.notify('please save the document and try again', {title: title});
    } else {
        fs.readFile(pathname, 'utf-8', run);
    }
}
