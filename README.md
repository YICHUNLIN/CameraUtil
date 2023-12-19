# CameraUtil

> for raspberry pi, and camera interval capture.

## Main usage

[libcamera](https://www.npmjs.com/package/libcamera)

## methods

### constructor

> params

1. option: Json Object
	- output: STRING	| path of output path
	- delaySecond: INT	| time of interval delay time
	- type: STRING		| type of cap method
2. onCapSucc: callback function, when cap successed
3. onCapErr: callback function, when cap error

### internal methods

> __video

- libcamera.vid
	- use video method 

> __photo

- libcamera.until
	- use take picture method

### public methods

> start

Starting interval by "delaySecond", and select by "type".

> end

ending interval


