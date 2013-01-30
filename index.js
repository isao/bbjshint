#!/usr/bin/env node
/*jshint node:true */
'use strict';

var fs = require('fs'),
    hint = require('jshint').JSHINT,
    ascr = require('applescript'),
    note = require('terminal-notifier'),

    fref = process.env.BB_DOC_PATH,
    fname = process.env.BB_DOC_NAME,
    TITLE = 'bbedit jshint';


function logerr(err) {
    if (err) {
        console.log(err);
    }
}

function errorObj(results) {
    var out = [];
    results.forEach(function (res) {
        var item = [
                '{result_kind: "Error"',
                'result_file: "' + fref + '"',
                'result_line: ' + res.line,
                'message: "' + res.reason.replace(/"/g, '\\"') + '"}' //escape
            ].join();
        out.push(item);
    });
    return '{' + out.join() + '}';
}

function errorScriptStr(listobj, fname) {
    return [
        'tell application "BBEdit"',
        'set errs to ' + listobj,
        'make new results browser with data errs with properties {name:"' + TITLE +'"}',
        'end tell'
    ].join('\n');
}

function run(err, str) {
    if (err) {
        note("error. couldn't read bbedit document.");
    } else if (hint(str)) {
        note('no lint in ' + fname, {title: TITLE});
    } else {
        ascr.execString(errorScriptStr(errorObj(hint.errors)), logerr);
    }
}

if (require.main === module) {
    fs.readFile(fref, 'utf-8', run);
}

/*
    console.log(hint.errors)
    [ { id: '(error)',
        raw: 'Missing semicolon.',
        evidence: '        if (err) console.log(err)',
        line: 14,
        character: 34,
        scope: '(main)',
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: 'Missing semicolon.' } ]

    http://apple.stackexchange.com/questions/42497
*/
