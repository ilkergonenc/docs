const { task, series, parallel, watch } = require("gulp")
const bend = require('./docs'),
      the = 'docs',
      ui  = 'ui/**/', 
      re  = 're/', 
      to  = '@/',
      _to = {
        js:   to+'assets/js',
        css:  to+'assets/css',
        img:  to+'assets/img',
        json: to+'static/',
      },
      jsIndex = require('./re/js')

// task('ui:yml',  () => bend.x.concat(ui+'*.yml', 'UI.yml', {dirname: ''}, re+'data'))
// task('ui:data', () => bend.x.concat(ui+'*.yml', 'DATA.yml', {dirname: ''}, re+'data'))
// task('ui:js',   () => bend.x.rename(ui+'*.js', {dirname: ''}, re+'js'))
// task('ui:scss', () => bend.x.rename(ui+'*.scss', {dirname: ''}, re+'scss'))
// task('ui',      parallel(
                  // 'ui:yml', 
                  // 'ui:data',
                  // 'ui:js', 
                  // 'ui:scss'
                  // ))


task('@:html',      () => bend.ui.html([the+'/**/docs.pug', the+'/**/index.pug'], re+'data/data.yml', 'ui', to))

task('@:css:build', () => bend.ui.css.build(re+'scss/_.'+the+'.scss', _to.css))
task('@:css:min',   () => bend.ui.css.min(_to.css))
task('@:css',       series('@:css:build', '@:css:min'))

task('@:js:build',  () => bend.ui.js.concat(jsIndex, the+'.js', _to.js))
task('@:js:min',    () => bend.ui.js.min(_to.js))
task('@:js',        series('@:js:build', '@:js:min'))

task('@:asset',     () => bend.x.copy(re+'assets/**/*', to+'assets'))

task('@',           parallel('@:html', '@:css', '@:js', '@:asset'))

task('sync',    () => bend.sync.browser([to]))
task('sync:re', () => bend.sync.reload())

// task('w:ui',    () => watch(['./src/views/**/*'], 'ui'))
// task('w:yml',   () => watch([ui+'*.yml'], parallel('ui:yml')))
task('w:pug',   () => watch([ui+'*.pug', ui+'*.*.pug', re+'data/*.yml', 'docs/**/*'], parallel('@:html')))
task('w:scss',  () => watch([re+'scss/**', ui+'*.scss'], parallel('@:css')))
task('w:js',    () => watch([re+'js/**', ui+'*.js'], parallel('@:js')))
task('w:re',    () => watch([re+'assets/**'], parallel('@:assets')))
task('w:@',     () => watch([to+'**/*.html'], parallel('sync:re')))

task('watch',   parallel('w:pug', 'w:scss', 'w:js', 'w:@'))

exports.default = parallel('sync', 'watch')