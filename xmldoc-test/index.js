var fs = require('fs')
  , nws = require('./sources/wa-source-nws');

var here = {
	latitude: 28.53,
	longitude: -98.34
};

// var here = {
// 	latitude: 33.46,
// 	longitude: -88.8
// };
nws.options.alertRange = 50;

nws.getWeatherData(here, function (data) {
	console.log(data)
});

// setTimeout(function () {
// 	nws.getWeatherData(here, console.log);
// }, 3000);

// nws.getWeatherData(here, function (data) {
// 	// console.log(data.nearby_alerts);

// 	data.nearby_alerts.forEach(function (alert) {
// 		console.log(alert.event);
// 	});
// });