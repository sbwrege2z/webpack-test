# webpack-test

Simple application illustrating a problem with webpack

This program is not meant to be functional. It just illustrates a problem.

Something with the Webpack bundling process breaks the application. There are two entry points:

1.  src/index.js gets bundled to dist/bundle1.js
2.  src/index2.js gets bundled to dist/bundle2/js

The ONLY difference between index.js and index2.js is the line 11:

```javascript
router.get(pattern, null);
```

Here's the full source:

```javascript
const UrlPattern = require('url-pattern');
const { Router } = require('service-worker-router');

const router = new Router();

let pattern = new UrlPattern(/^\/api\/(.*)$/);
console.log(JSON.stringify(pattern.match('/api/test')));
console.log(JSON.stringify(pattern.match('/apiii/test')));

router.get('/api/*', null);
router.get(pattern, null);

console.log('Hello world!');
```

They should all produce the same output when run:

```
["test"]
null
Hello world!
```

When dist/bundle1.js is run I get the following error:

````
TypeError: argument must be a regex or a string
at new t (C:\Repository\cloudflare\webpack-test\dist\bundle1.js:21:4982)
at e.addRoute (C:\Repository\cloudflare\webpack-test\dist\bundle1.js:21:8028)
at e.get (C:\Repository\cloudflare\webpack-test\dist\bundle1.js:21:7259)
at Object.<anonymous> (C:\Repository\cloudflare\webpack-test\dist\bundle1.js:21:9338)
at r (C:\Repository\cloudflare\webpack-test\dist\bundle1.js:1:110)
at C:\Repository\cloudflare\webpack-test\dist\bundle1.js:1:902
at Object.<anonymous> (C:\Repository\cloudflare\webpack-test\dist\bundle1.js:1:911)
at Module.\_compile (internal/modules/cjs/loader.js:778:30)
at Object.Module.\_extensions..js (internal/modules/cjs/loader.js:789:10)
at Module.load (internal/modules/cjs/loader.js:653:32)```
````

Is there a configuration option for Webpack that will make this work? I'd
like to use these modules in a cloudflare service worker.

## SOLVED

The problem was in these two lines of code:

```javascript
const UrlPattern = require('url-pattern');
const { Router } = require('service-worker-router');
```

Even though the service-worker-router module was using the same version of the url-pattern
module I had installed, Webpack was treating them as two seperate copies. During the
minify process, they got assigned to different names (e.g. A and B). When a route
was defined with UrlPattern (A), the service worker did not recognize it as a UrlPattern (B),
so it tried to create a new UrlPattern (B) with the first parameter being a UrlPattern (A).
The UrlPattern constructor accepts a string, a Regex, or a UrlPattern (A), but the
UrlPattern (B) was none of those so an error was thrown. The UrlPattern and the Router
need to be imported from the same unit:

```javascript
const { UrlPattern, Router } = require('service-worker-router');
```
