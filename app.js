const request = require('request');
const Camera = require('./index');
const {Stack, Job} = require('./Stack');
const stack = new Stack(1, 10);
const FormData = require('form-data');
const fs = require('fs');
const client_id = "afaf6a6c-1892-4f7e-8265-3d93aed6bc4a";
stack.start();
const {v4: uuidv4} = require('uuid');

const Uploading = require('./upload');
const upload = new Uploading({ 
	url: 'https://cam.kmn.tw/v1/api/upload/image',
	dir: '/home/jarvis/photos',
	cam: 1,
	client_id
});

let x = false;
setInterval(() => {
	if (x) return;
	x = true;
	upload.check(r => {
		console.log(r.length)
		r.forEach(m => {
			stack.addJob(new Job(() => m, 
				succ => {
					console.log(succ)
				}, err => {
					console.log(err)
				}));
		});
		console.log('check...')
	})
}, 60 * 1000)

const camera = new Camera(
	{
		delaySecond: 10,
		type: 'photo',
		output: '~/photos',
		nameFormat: () => {
			const d = new Date();
			return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getTime()}.jpg`
		}
	}, (filename) => {
		console.log('on save', filename)
	}, (error) => {
		console.log(error, 'cap error')
	}
);

const c = camera.start();
console.log(c);


