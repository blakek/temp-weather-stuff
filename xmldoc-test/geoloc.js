'use strict';

function GeoLoc (lat, lon) {
	this.lat = lat;
	this.lon = lon;
}

function toRad(dec) {
	return Math.PI * dec / 180;
}

function toDeg(rad) {
	return	rad * 180 / Math.PI;
}

function getDistance(lat1, lon1, lat2, lon2, unit) {
	if (typeof unit === 'undefined') {
		unit = 'km';
	}

	var unitConvert = {
		mi: 1.1515,
		km: 1.85316
	};

	var radlat1 = toRad(lat1),
		radlat2 = toRad(lat2),
		radlon1 = toRad(lon1),
		radlon2 = toRad(lon2),
		theta = toRad(lon1 - lon2);

	// Using the Haversine formula...assumes a perfectly spherical earth
	var dist = toDeg(Math.acos(Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(theta)))  * 60;

	return dist * unitConvert[unit];
}

function getBearing(startLat, startLong, endLat, endLong) {
	startLat = toRad(startLat);
	startLong = toRad(startLong);
	endLat = toRad(endLat);
	endLong = toRad(endLong);

	var dLong = endLong - startLong;

	var dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));

	if (Math.abs(dLong) > Math.PI) {
		if (dLong > 0.0)
			dLong = -(2.0 * Math.PI - dLong);
		else
			dLong = (2.0 * Math.PI + dLong);
	}

	return (toDeg(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
}

module.exports = {
	'GeoLoc': GeoLoc,
	'toRad': toRad,
	'toDeg': toDeg,
	'getBearing': getBearing,
	'getDistance': getDistance
};