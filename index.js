
const { libcamera } = require('libcamera');

/*
 * @description 相機
 * @params
 * 	- option: JsonObject
 * 		- {
 *			output: STRING		| path of output file
 *			delaySecond: INT	| time of interval delay
 *			type: STRING		| type of cap method
 * 		  }
 * 	- onCapSucc: call back function, when cap success
 * 	- onCapErr: call back function, when cap error
 * */
function Camera(option, onCapSucc, onCapErr){
	this.intervalID = undefined;
	this.output = option.output;
	this.delaySecond = option.delaySecond;
	this.type = option.type;
	this.onCapSucc = onCapSucc;
	this.onCapErr = onCapErr;
	this.nameFormat = option.nameFormat;
}


/*
 * @description photo method
 * @method libcamera.still
 * */
Camera.prototype.methodSwitch = function(){
	let method = null;
	const fn = `${this.nameFormat()}`;
	if (this.type == "video")
		method = libcamera.vid({config: { output: `${this.output}/${fn}`, timeout: 300000}, timeout: 500000})
	else method = libcamera.still({ config: { output: `${this.output}/${fn}`}});
	return new Promise((resolve, reject) => {
		method.then(successed => resolve(fn))
		.catch(err => reject(err));
	})
}

/*
 * @description startting camera interval
 *
 * */
Camera.prototype.start = function(){
	const tthis = this;
	let cam_status = false;
	this.intervalID = setInterval(() => {
		if (!cam_status){
			cam_status = true;
			tthis.methodSwitch()	
				.then(result => {
					tthis.onCapSucc(result)
					cam_status = false;
				})
				.catch(err => {
					tthis.onCapErr(err)
					cam_status = false;
				});
		}else {
			console.log("cam is in process.")
		}
	}, this.delaySecond * 1000);
	return {result: true, message: `camera start successed!`};
}

/*
 * @description stop camera interval
 *
 * */
Camera.prototype.end = function(){
	if (!this.intervalID) return {result: false, message: 'interval is undefined'}
	clearInterval(this.intervalID);
	this.intervalID = undefined;
	return {result: true}
}



module.exports = Camera;
