//job
function Job(content, onSuccess, onFailed){
	this.content = content;
	this.onSuccess = onSuccess;
	this.onFailed = onFailed;
}

Job.prototype.exec = function(){
	const tthis = this;
	
	const content = new Promise(tthis.content);
	return new Promise((resolve, reject) => {
		content
			.then(result => {
				tthis.onSuccess(result)
				return resolve(result);
			})
			.catch(err => {
				
				tthis.onFailed(err)
				return reject(err);
			});
	});
}

// stack
function Stack(intervalTime){
	this.list = [];	
	this.running = false;
	this.timeoutID = undefined;
	this.intervalTime = intervalTime;
	this.intervalID = undefined;
}

Stack.prototype.addJob = function(job){
	this.list.push(job);
}

/* 
 * @description 超過時間沒反應 自動reset狀態
 */
Stack.prototype.timeout = function(s){
	const tthis = this;
	this.timeoutID = setTimeout(() => {
		tthis.running = false;
		tthis.resetTimeout();
	}, s * 1000);
}

/*
 * @description 重置timeout
 * */
Stack.prototype.resetTimeout = function(){
	clearTimeout(this.timeoutID);
	this.timeoutID = undefined;
}

/*
 * @description 重置 interval
 * */

Stack.prototype.end = function(){
	clearInterval(this.intervalID);
	console.log('---job stack end---')
}

/*
 * @description 執行 stack
 * */
Stack.prototype.start = function(){
	const tthis = this;
	console.log('---job stack start---')
	this.intervalID = setInterval(() => {
		if ((tthis.list.length > 0) && !tthis.running) {
			tthis.running = true;
			const item = tthis.list.pop();
			tthis.timeout(10)
			item.exec()
				.then(result => {
					console.log('job exec successed')
					tthis.running = false;
					tthis.resetTimeout();
				})
				.catch(err => {
					console.log('job exec err', err)
					tthis.runngin = false;
					tthis.resetTimeout();
				})
		}
	}, 1000 * this.intervalTime)
}

module.exports = {Job, Stack}
