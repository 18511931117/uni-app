
var config = require('./config.js')

 //请求城市天气
var getArticleList = function(e){
	return config.getRequest("historyWeather/weather",e);
	console.log(e)
}

//获取北京天气
var getArticleList2 = function(e){
	return config.getRequest("historyWeather/weather",e)
}


module.exports = {
	getArticleList,
	getArticleList2
}