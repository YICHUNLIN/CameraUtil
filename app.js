const Camera = require('./index');

const camera = new Camera(
	{
		delaySecond: 300,
		//type: 'photo',
		type: 'video',
		output: '~/photos',
		nameFormat: () => {
			const d = new Date();
			console.log(d)
			return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getTime()}.h264`
			//return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getTime()}.jpg`
		}
	}, (success) => {
		console.log(success, 'oo cap finish')
	}, (error) => {
		console.log(errork, 'cap error')
	}
);

const result = camera.start();
console.log(result)
