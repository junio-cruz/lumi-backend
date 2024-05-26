import glob from 'fast-glob';
import {build} from 'esbuild';
import {clean} from 'esbuild-plugin-clean';

const filePaths = glob.sync('src/**/*.ts');
const mapped = new Map(
  filePaths.map(path => {
    return [path.replace('src/', '').replace('.ts', ''), path];
  }),
);
const entryPoints = Object.fromEntries(mapped);

const sharedConfig = {
  entryPoints,
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [
    clean({
      patterns: ['./dist/*'],
      cleanOnStartPatterns: ['./prepare'],
      cleanOnEndPatterns: ['./post'],
    }),
  ],
};
build({
  ...sharedConfig,
  platform: 'node',
  outdir: 'dist',
}).then(() => {
  console.log('build for common js done...');
});
