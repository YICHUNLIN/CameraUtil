
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
	this.onCapSucc = onCapzSucc;
	this.onCapErr = onCapErr;
	this.server_url = option.server_url;

	this.uploadingStack = [];// 處理上傳中的stack
}

/*
 * @description photo method
 * @method libcamera.still
 * */
Camera.prototype.__photo == function(){
	const tthis = this;
	return libcamera.still({ config: { output: tthis.output } });
}

/*
 * @description video method
 * @method libcamera.vid
 * */
Camera.prototype.__video = function(){
	const tthis = this;
	return libcamera.vid({ config: {output: tthis.output}});
}

/*
 * @description startting camera interval
 *
 * */
Camera.prototype.start = function(){
	const tthis = this;
	let op = null;
	if (this.type == "vodeo") op = tthis.__video;
	else if (this.type == "photo") op = tthis.__photo;
	if (!op) return {result: false, message: `camera start error, op = null`};
	this.intervalID = setInterval(() => {
		op
		.then(result => tthis.onCapSucc(result))
		.catch(err => tthis.onCapzErr(err));
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

Camera.prototype.__deStack = function(){
	if (this.uploadingStack.length > 0) {
		const first = this.uploadingStack.pop();
	}
}

Camera.prototype.saveToServer = function(){
	// axios call api
	if (!this.server_url) throw new Error("server_url is not avaliable or not exist");
	// if successed delete file
}

module.exports = Camera;
