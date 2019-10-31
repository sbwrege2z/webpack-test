# webpack-test

Simple application illustrating a problem with webpack

This program is not meant to be functional. It just illustrated a problem.

Something with the Webpack bundling process breaks the application. There are two entry points:

1.  src/index.js gets bundled to dist/bundle1.js
2.  src/index2.js gets bundled to dist/bundle2/js

The ONLY difference between index.js and index2.js is the line 11:

`router.get(pattern, null);`

They should all produce the same output when run:

````["test"]
null
Hello world!```

When dist/bundle1.js is run I get the following error:

```TypeError: argument must be a regex or a string
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
