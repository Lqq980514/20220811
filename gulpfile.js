
let { src, dest, series, parallel,watch} = require('gulp');
let clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const fileInclude =require('gulp-file-include');
const webserver = require('gulp-webserver');

//清理任务
function cleanTask(){
    return src('./dist',{allowEmpty:true}).pipe(clean())
}

//sass转换任务
function sassTask(){
    return src('./src/css/*.scss')
    .pipe(sass())
    .pipe(dest('./dist/css'))
}

//html片段任务
function fileIncludeTask(){
    return src('./src/views/*.html')
    .pipe(fileInclude({
        prefix:'@',
        basepath:'./src/views/templates'
    }))
    .pipe(dest('./dist/views'))
}

//拷贝任务
function jsTask(){
    return src('./src/js/**').pipe(dest('./dist/js'))
}
function libTask(){
    return src('./src/lib/**').pipe(dest('./dist/lib'))
}
function staticTask(){
    return src('./src/static/**').pipe(dest('./dist/static'))
}
function apiTask(){
    return src('./src/api/**').pipe(dest('./dist/api'))
}


//启动web服务器，实时监听文件变化
function webTask(){
        src('./dist')
        .pipe(webserver({
            port:8080,
            open:'views/index.html'
        }))
}

function watchTask(){
         watch('./src/views/**',fileIncludeTask)
         watch('./src/css/**',sassTask)
         watch('./src/js/**',jsTask)
         watch('./src/lib/**',libTask)
         watch('./src/static/**',staticTask)
         watch('./src/api/**',apiTask)

}

module.exports = {
    start:series(cleanTask,parallel(sassTask,fileIncludeTask,jsTask,libTask,staticTask,apiTask),parallel(webTask,watchTask))
};

