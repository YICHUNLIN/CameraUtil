const Camera = require('./index');

const camera = new Camera(
	{
		delaySecond: 5,
		type: 'photo',
		output: '',
		nameFormat: () => {
			const d = new Date();
			console.log(d)
			return `${d.getYear()}-${d.getMonth()}-${d.getDay()}-${d.getTime()}.jpg`
		}
	}, (success) => {
		console.lg(success, 'cap finish')
	}, (error) => {
		console.log(errork, 'cap error')
	}
);

const result = camera.start();
console.log(result)
