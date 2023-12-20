
const { libcamera } = require('libcamera');

libcamera
  .still({ config: { output: `~/photos/test-${new Date().getTime()}.jpg` } })
  .then(result => console.log(result, 'successed'))
  .catch(err => console.log(err, 'failed'));
