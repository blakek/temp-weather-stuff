var fs = require('fs')
  , nws = require('wa-source-nws');

var here = {
	latitude: 28.53,
	longitude: -98.34
};

// var here = {
// 	latitude: 33.46,
// 	longitude: -88.8
// };

nws.options.testing = false;
nws.options.alertRange = 75;

nws.getWeatherData(here, function (data) {
	console.log(data.nearest_storm.polygon);
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