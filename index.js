#!/usr/local/bin/node

var fs = require('fs'),
    exec = require('child_process').exec,
    hint = require('jshint').JSHINT,
    ascr = require('applescript'),
    fref = process.env.BB_DOC_PATH,
    fname = process.env.BB_DOC_NAME;

if (hint(fs.readFileSync(fref, 'utf-8'))) {
    notify('no lint in ' + fname);
} else {
    ascr.execString(errorScriptStr(errorObj(hint.errors)), function(err) {
        if (err) console.log(err);
    });
}

// http://apple.stackexchange.com/questions/42497/how-do-i-get-bbedit-to-display-the-error-browser-programmatically
function errorObj(results) {
    var out = [];
    results.forEach(function(res) {
        var item = [
                '{result_kind: "Error"',
                'result_file: "' + fref + '"',
                'result_line: ' + res.line,
                'message: "' + res.reason + '"}'
            ].join();
        out.push(item);
    });
    return '{' + out.join() + '}';
}

function errorScriptStr(listobj) {
    return [
        'tell application "BBEdit"',
        'set errs to ' + listobj,
        'make new results browser with data errs with properties {name:"Errors"}',
        'end tell'
    ].join('\n');
}

function notify(msg, cb) {
    exec('terminal-notifier -title bbedit -message "' + msg + '"');
}
