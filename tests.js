#!/usr/bin/env node

var test = require('tape'),
    lint = require('jshint').JSHINT;


test('returns false if lint is found', function(t) {
    t.plan(1)
    t.false(lint('var no_semicolon'));
});

test('jshint errors are properties of itself', function(t) {
    t.plan(2);
    var expected = [{
            id: '(error)',
            raw: 'Missing semicolon.',
            evidence: 'var no_semicolon',
            line: 1,
            character: 17,
            scope: '(main)',
            a: undefined,
            b: undefined,
            c: undefined,
            d: undefined,
            reason: 'Missing semicolon.'
        }];

    t.false(lint('var no_semicolon'));
    t.same(lint.errors, expected);
});

test('returns true if lint-free', function(t) {
    t.plan(1)
    t.false(lint('var no_semicolon'));
});

test('lint-free jshint errors property is an empty array', function(t) {
    t.plan(2);
    t.true(lint('var isok;'));
    t.same(lint.errors, []);
});
