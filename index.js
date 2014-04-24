#!/usr/bin/env node
/*jshint node:true */
'use strict';

var fs = require('fs'),
    path = require('path'),
    lint = require('jshint').JSHINT,
    bbresults = require('bbresults'),

    title = 'JSHint results',
    pathname = process.env.BB_DOC_PATH;

function getOptions(dir) {
  if (dir === '/') {
    return require('./jshint-flags');
  }

  var candidate = path.join(dir, '.jshintrc');
  if (fs.existsSync(candidate)) {
    return JSON.parse(fs.readFileSync(candidate));
  }

  return getOptions(path.join(dir, '..'));
}

function run(err, str) {
    if (err) {
        bbresults.notify('error, reading ' + pathname, {title: title});
    } else if(lint(str, getOptions(path.dirname(pathname)))) {
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
