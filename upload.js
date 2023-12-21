const request = require('request');
const client_id = "afaf6a6c-1892-4f7e-8265-3d93aed6bc4a";
const FormData = require('form-data');
const fs = require('fs');

function Uploading(options){
	this.url = options.url;
	this.dir = options.dir;
	this.cam = options.cam;
	this.client_id = options.client_id;
	this.q = {};

}

Uploading.prototype.check = function(cb){
	const tthis = this;
	const fnrgx = /(\d{4})-(\d{2})-(\d{2})-(\d{13}).jpg/;
	var methods = [];
	fs.readdir(this.dir, function (err, files) {
    		//handling error
    		if (err) return console.log('Unable to scan directory: ' + err);	 
    		//listing all files using forEach
    		files.filter(f => !tthis.q.hasOwnProperty(f)).forEach(function (file) {
			console.log(file)
			const gs = file.match(fnrgx);
			const ymd = `${gs[1]}-${gs[2]}-${gs[3]}`;
			const content = (resolve, reject) => {
				fs.readFile(`${tthis.dir}/${file}`, function(err, data) {
					if (err) return reject(err);
					tthis.q[file] = 1;
					const fd = new FormData();
					fd.append('media', data, {filename: file});
					const url = `${tthis.url}?client_id=${tthis.client_id}&cam=${tthis.cam}&group=${ymd}`
					console.log('POST ', url)
					request.post({
						url
						, headers: {'Content-Type': `multipart/form-data;boundary=${fd._boundary}`}
						, body: fd
					}, (error, response, body) => {
						console.log(error,  body)
						if (error) return reject(error);
						console.log(`on upload ${file}`)
						delete tthis.q[file];
						fs.unlink(`${tthis.dir}/${file}`, (err) => {
 							 if (err) {
    								reject(err);
  							} else {
    								resolve('File already uploaded and be deleted local. ' + file);
  							}
						});
					})
				});
			}
			methods.push(new Promise(content))
    		});
		cb(methods);
	});
}

module.exports = Uploading;

