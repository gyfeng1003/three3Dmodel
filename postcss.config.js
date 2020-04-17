module.exports = ({file})=>{
  let vwUnit // 判断条件
	if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
		vwUnit = 37.5
	} else {
		vwUnit = 75
	}
	return {
    plugins: {
      'postcss-pxtorem': {
        rootValue: vwUnit, // 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
        propList: ['*'],
        minPixelValue: 3,
        selectorBlackList: ['vant'] // 忽略转换正则匹配项
      }
    }
  }
}