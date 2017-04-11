var gulp = require('gulp'),
	less = require('gulp-less');

gulp.task('testLess',function(){
	gulp.src('less/index.less')
		.pipe(less())
		.pipe(gulp.dest('css'));
});

//监听less文件，有修改自动编译
gulp.task('watchLess',function(){
	return gulp.watch('less/index.less',['testLess']);
});

gulp.task('default',['testLess','watchLess']);
