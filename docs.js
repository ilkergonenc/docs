/**
 * Workspace for rendered static HTML web site using gulp, markdown, yml, pug
 * https://static.bendui.git
 * 
 * License: GPL-3.0
 * 
 * İlker Gönenç 
 * https://ilkergonenc.github
 * 
 * last update: 21-12-2022
 */

const { src, dest } = require("gulp")

const concat = require("gulp-concat")
const rename = require("gulp-rename")
const sourcemaps = require('gulp-sourcemaps')

const yamlData = require('gulp-yaml-data')
const pug = require('gulp-pug')

const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('gulp-cssnano')

// const rollup = require('rollup')
// const {babel} = require('@rollup/plugin-babel')
const terser = require('gulp-terser')

const browserSync = require('browser-sync').create()

module.exports = bend = {

  x: {
    copy:   (s, d) =>         src(s).pipe(dest(d)),
    rename: (s, re, d) =>     src(s).pipe(rename(re)).pipe(dest(d)),
    concat: (s, cc, re, d) => src(s).pipe(concat(cc)).pipe(rename(re)).pipe(dest(d)),
  },

  ui: {
    html: (s, y, b, d) => src(s)
      .pipe(yamlData({ property: 'data', src: y }))
      .pipe(pug({ basedir: b, pretty: true }))
      .pipe(rename((path) => {
        path.basename = 'index'
        path.dirname = 'docs/' + path.dirname 
        // if(path.basename !== 'index') path.basename = path.dirname.replace('\\', '--')
        // path.dirname = ''
      }))
      .pipe(dest(d)),
    css: {
      build: (s, d) => src(s).pipe(rename((path) => { path.basename = path.basename.replace('_.', '') }))
        .pipe(sourcemaps.init())
          .pipe(sass().on('error', sass.logError))
          .pipe(postcss([autoprefixer({ cascade: false })]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(d))
        .pipe(browserSync.stream()),
      min: (d) => src(['*.css', '!*.min.css'], { cwd: d })
        .pipe(sourcemaps.init())
          .pipe(cssnano()).pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(d))
        .pipe(browserSync.stream())
    },
    js: {
      concat: (s, cc, d) => src(s)
        .pipe(sourcemaps.init())
          .pipe(concat(cc))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(d))
        .pipe(browserSync.stream()),
    //   rollup: '',
      min: (d) => src(['*.js', '!*.min.js'], { cwd: d })
        .pipe(sourcemaps.init())
          .pipe(terser()).pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(d))
        .pipe(browserSync.stream())
    }

  },

  sync: {
    browser: (b) => {
      browserSync.init({
          server: {
              baseDir: b,
              // index: 'html/index.html',
              // directory: true,
          }
      })
    },
    reload: () => {	browserSync.reload() }
  },

}