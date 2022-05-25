const esbuild = require('esbuild');
async function build_native() {
  esbuild.build({
    entryPoints: ['./index.ts'],
    bundle: true,
    outfile: 'dist/native.js',
  });
}

async function build_plugin(){
   esbuild.build({
    entryPoints: ['./index.ts'],
    bundle: true,
    outfile: 'dist/plugin.js',
    plugins: [{
      name: 'plugin',
      setup(build){
        build.onResolve({filter:/.*/},args => {
          let id = require.resolve(args.path, args.resolveDir ||__dirname);
          return {
            path: id
          }
        })
      }
    }]
  });
}

async function main(){
  await build_native();
  await build_plugin();
}

main();