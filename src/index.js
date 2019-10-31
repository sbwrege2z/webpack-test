'use strict';

const UrlPattern = require('url-pattern');
const serviceWorkerRouter = require('service-worker-router');

const router = new serviceWorkerRouter.Router();

// THIS METHOD OF ROUTING DOES NOT CAUSE A PROBLEM:
router.get('/api/*', null);

// CAUSES BUNDLE TO BREAK:
router.get(new UrlPattern(/^\/api\/(.*)$/), null);

console.log('Hello world!');
