const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/fa6dceef958411b891369e92508af463/' + latitude + ',' + longitude

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Cannot connect', undefined)
		} else if (body.error) {
			callback('Cannot find location', undefined)
		} else {
			callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain.')
		}
	})
}

module.exports = forecast