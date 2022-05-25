# esbuild-bug
```sh
node build.js # will genereate different result in dist/plugin.js and dist/native.js
```
* dist/native.js (useDefineForClassFields works)
```ts
(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // index.ts
  var A = class {
    constructor() {
      __publicField(this, "a");
      __publicField(this, "b", 10);
    }
  };
  console.log({ A });
})();
```
* dist/plugin.js (useDefineForClassFields not works )

```ts
(() => {
  // index.ts
  var A = class {
    constructor() {
      this.b = 10;
    }
  };
  console.log({ A });
})();

```
