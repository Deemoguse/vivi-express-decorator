Rollup - Template

`rollup-typescript` starter template for library development.

## Install
```
$ git clone https://github.com/Deemoguse/vivi-rollup-template.git
```
After cloning, untie the original repository and link your own:
```
$ git remote remove origin
$ git remote add <your_repository>
```

## Commands
- `build` – the command starts the library build process by first clearing the `dist` folder.
- `test` – running your tests from the `test` folder in the project root.

## Outputs
The `dist` folder will be generated based on the build result. it will contain a folder with __CommonJS__ and __ECMAScript Module__ in the `cjs` and `esm` folders, respectively, in __ES3__ language version. Type declaration in the `index.d.ts` works equally well for the two of them.

## Testing
[`jest`](https://jestjs.io/) and [`ts-jest`](https://kulshekhar.github.io/ts-jest/) are used for testing, respectively. To configure `jest`, refer to `packege.json`.
