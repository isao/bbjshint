#!/usr/local/bin/node

/*jshint node:true */
'use strict';

var fs = require('fs'),
    path = require('path'),
    lint = require('jshint').JSHINT,
    bbresults = require('bbresults'),
    stripJsonComments = require('strip-json-comments'),
    title = 'JSHint results',
    pathname = process.env.BB_DOC_PATH;

function getOptions(dir) {
    var candidate, opts;

    if (dir === '/') {
        opts = require('./jshint-flags');
    }

    if (fs.existsSync(candidate = path.join(dir, '.jshintrc'))) {
        opts = JSON.parse(stripJsonComments(fs.readFileSync(candidate, "utf8")));
    }

    return opts || getOptions(path.join(dir, '..'));
}

function run(err, str) {
    if (err) {
        bbresults.notify('error, reading ' + pathname, {title: title});

    } else if (lint(str, getOptions(path.dirname(pathname)))) {
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
