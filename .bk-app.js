const request = require('request');
const Camera = require('./index');
const {Stack, Job} = require('./Stack');
const stack = new Stack(2, 10);
const FormData = require('form-data');
const fs = require('fs');
const client_id = "afaf6a6c-1892-4f7e-8265-3d93aed6bc4a";
stack.start();
const {v4: uuidv4} = require('uuid');

const Uploading = require('./upload');
const upload = new Uploading('https://cam.kmn.tw','/home/jarvis/photos');
upload.check();
const camera = new Camera(
	{
		delaySecond: 10,
		type: 'photo',
		output: '~/photos',
		nameFormat: () => {
			const d = new Date();
			console.log(d)
			return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getTime()}.jpg`
		}
	}, (filename) => {
		stack.addJob(new Job(() => {
			return new Promise((resolve, reject) => {
				fs.readFile(`/home/jarvis/photos/${filename}`, function(err, data) {
  					if (err) return reject(err) // Fail if the file can't be read.
					const d = new Date();
					const fd = new FormData();
					fd.append('media', data, {filename});
					request.post({
						url: `https://cam.kmn.tw/v1/api/upload/image?client_id=${client_id}&cam=1&group=${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
						, headers: {'Content-Type': `multipart/form-data;boundary=${fd._boundary}`}
						, body: fd
					}, (error, response, body) => {
						if (error) return reject(error);
						return resolve({response, body});
					})
				});
			});
		}, (successed) => {
			console.log(`upload ${filename} successed.`, successed);
		}, (failed) => {
			console.log(`upload ${filename} failed.`, failed);
		}))
		console.log(filename, 'cap finish')
	}, (error) => {
		console.log(errork, 'cap error')
	}
);

const result = camera.start();
console.log(result)
