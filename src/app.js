const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const address = process.argv[2]


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up Handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Set up static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { 
    res.render('index', {
        title: 'home',
        name: 'Not me'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About bugcat',
        name: 'not Lera'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        name: 'not bugcat'
    })
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Provide an address'
		})
	}
    geocode(req.query.address, (error, {latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({ 
            	address: req.query.address,
            	location,
            	forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'Provide a search term NOW'
		})
	} 

	console.log(req.query.search) 
	res.send({ 
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: 'error',
		name: 'not me hehe',
		errorMessage: 'your plea for help isnt valid'
	})
})


app.get('*' , (req,res) => {
	res.render('error', {
		title:'oops',
		name: 'probably wasnt good anyway',
		errorMessage: 'nonsense'
	})
})


app.listen(3000, () => {
    console.log('Server is up on port 3000 .')
})