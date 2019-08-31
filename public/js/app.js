console.log('Client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
	response.json().then((data) => {
		console.log(data)
	})
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

//messageOne.textContent = data.location

weatherForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const location = search.value
	messageOne.textContent = 'Loading'
	messageTwo.textContent = ''

	fetch('http://localhost:3000/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error
			} else {
				messageOne.textContent = data.location 
				messageTwo.textContent = data.forecast
			}
		})
	})
})