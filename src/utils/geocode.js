const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibDNyNCIsImEiOiJjanZsMGx5aTEwOHM1NGFxc25wbjNrYWttIn0.7gRyMvPx6saCK-oujBVmSg'

	request({url: url, json: true}, (error, response) => {
		if (error) {
			callback('Cannot connect to location services', undefined)
		} else if (response.body.features.length === 0 ) {
				callback ('Cannot find location', undefined)
		} else {
			callback(undefined, {
				longitude: response.body.features[0].center[0],
				latitude: response.body.features[0].center[1],
				location: response.body.features[0].place_name
			})
		}
	})
}

module.exports = geocode