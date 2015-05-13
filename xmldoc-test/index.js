var fs = require('fs')
  , nws = require('./sources/wa-source-nws');

// var here = {
// 	latitude: 27.98,
// 	longitude: -98.46
// };

// var here = {
// 	latitude: 35.14,
// 	longitude: -91.52
// };

var here = {
	latitude: 33.46,
	longitude: -88.8
};

nws.getWeatherData(here, console.log);

nws.getWeatherData(here, console.log);

// nws.getWeatherData(here, function (data) {
// 	// console.log(data.nearby_alerts);

// 	data.nearby_alerts.forEach(function (alert) {
// 		console.log(alert.event);
// 	});
// });