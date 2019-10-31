'use strict';

const UrlPattern = require('url-pattern');

let pattern = new UrlPattern(/^\/api\/(.*)$/);
console.log(JSON.stringify(pattern.match('/api/test')));
console.log(JSON.stringify(pattern.match('/apiii/test')));

console.log('Hello world!');
