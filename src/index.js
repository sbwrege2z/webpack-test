const UrlPattern = require('url-pattern');
const { Router } = require('service-worker-router');

const router = new Router();

let pattern = new UrlPattern(/^\/api\/(.*)$/);
console.log(JSON.stringify(pattern.match('/api/test')));
console.log(JSON.stringify(pattern.match('/apiii/test')));

router.get('/api/*', null);
router.get(pattern, null);

console.log('Hello world!');
