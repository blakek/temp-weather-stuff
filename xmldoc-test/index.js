var fs = require('fs')
  , xmldoc = require('xmldoc')
  , geoloc = require('./geoloc');

function now() {
	return Math.floor(Date.now() / 1000);
}

var here = {
	"lat": 33.4503998,
	"lon": -88.81838719999999
};

var j = JSON.parse(fs.readFileSync('./nws-local.json'));

var na = fs.readFileSync('./nws-national-alerts.xml')
  , nadoc = new xmldoc.XmlDocument(na);

var x = fs.readFileSync('./test.xml')
  , doc = new xmldoc.XmlDocument(x);

var parameters = doc.descendantWithPath('data.parameters')
  , temps = {};

parameters.childrenNamed('temperature').forEach(function (n) {
	temps[n.attr.type] = n;
});

var closestStorm;
var closestStormDistance;
var closestStormBearing;

nadoc.childrenNamed('entry').forEach(function (n) {
	if ((x = n.valueWithPath('cap:polygon')) !== '') {
		x.split(' ').some(function (point) {
			var loc = point.split(',');
			var distance = geoloc.getDistance(loc[0], loc[1], here.lat, here.lon, 'mi');

			// Example: Retrieving the closest storm
			if (closestStorm === undefined || distance < closestStormDistance) {
				closestStorm = n;
				closestStormDistance = distance;

				closestStormBearing = geoloc.getBearing(here.lat, here.lon, parseFloat(loc[0]), parseFloat(loc[1]));
			}

			// Example: Getting all storms less than 50 mi away
			if (distance < 50) {
				console.log('Nearby storm: ' + n.valueWithPath('title'));
				return true;
			}
		});
	}
});

console.log({
	last_updated: now(),
	locaiton: {
		latitude: j.location.latitude,
		longitude: j.location.longitude,
		name: j.location.areaDescription
	},
	now: {
		temp: temps.hourly.valueWithPath('value'),
		temp_apparent: temps.apparent.valueWithPath('value'),
		conditions: j.currentobservation.Weather,
		icon: j.data.iconLink[0]
	},
	nearest_storm: {
		bearing: closestStormBearing,
		distance: closestStormDistance
	},
	precipitation: {
		probability: ''
	}
});


/*
{
	last_updated: now(),
	location: {
		latitude: result_object.latitude,
		longitude: result_object.longitude
	},
	now: {
		temp: Math.round(result_object.currently.temperature),
		temp_apparent: Math.round(result_object.currently.apparentTemperature),
		conditions: result_object.currently.summary,
		icon: forecast_io2waIcon(result_object.currently.icon),
		nearest_storm: {
			bearing: result_object.currently.nearestStormBearing || 0,
			distance: result_object.currently.nearestStormDistance || 0
		},
		precipitation: {
			intensity: result_object.currently.precipIntensity,
			probability: Math.round(result_object.currently.precipProbability * 100),
			type: result_object.currently.precipType
		},
		wind: {
			speed: Math.round(result_object.currently.windSpeed),
			bearing: result_object.currently.windBearing
		}
	},
	today: {
		temp: {
			high: Math.round(result_object.daily.data[0].temperatureMax),
			low: Math.round(result_object.daily.data[0].temperatureMin)
		},
		sun: {
			rise_time: result_object.daily.data[0].sunriseTime,
			set_time: result_object.daily.data[0].sunsetTime
		},
		summary: result_object.hourly.summary,
		icon: forecast_io2waIcon(result_object.hourly.icon),
		hourly: function () { // will contain precipitation, temp, and other hourly data
			var r = [];

			result_object.hourly.data.forEach(function (hour_data) {
				r.push({
					temp: Math.round(hour_data.temperature),
					precipitation: {
						intensity: hour_data.precipIntensity,
						probability: Math.round(hour_data.precipProbability * 100),
						type: hour_data.precipType
					},
					sun: {
						rise_time: hour_data.sunriseTime,
						set_time: hour_data.sunsetTime
					},
					wind: {
						bearing: hour_data.windBearing,
						speed: Math.round(hour_data.windSpeed)
					},
					summary: hour_data.summary,
					icon: forecast_io2waIcon(hour_data.icon),
					time: hour_data.time
				});
			});
			return r;
		}
	},
	week: {
		daily: function() {
			var r = [];

			result_object.daily.data.forEach(function (day_data) {
				r.push({
					temp: {
						high: Math.round(day_data.temperatureMax),
						low: Math.round(day_data.temperatureMin)
					},
					precipitation: {
						intensity: day_data.precipIntensity,
						probability: Math.round(day_data.precipProbability * 100),
						type: day_data.precipType
					},
					sun: {
						rise_time: day_data.sunriseTime,
						set_time: day_data.sunsetTime
					},
					wind: {
						bearing: day_data.windBearing,
						speed: Math.round(day_data.windSpeed)
					},
					summary: day_data.summary,
					icon: forecast_io2waIcon(day_data.icon),
					time: day_data.time
				});
			});
			return r;
		}
	},
	alerts: result_object.alerts,
	alert_count: (result_object.alerts) ? (result_object.alerts.length) : 0,
	units: {
		temp: 'F',
		distance: 'mi',
		speed: 'mph'
	}
}
 */