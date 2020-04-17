module.exports = {
	publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
	productionSourceMap: false,
	outputDir: 'dist',
	lintOnSave: false
}