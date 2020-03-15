const bingUtils = require('../src/bingUtils');
const path = require('path');

const options = {
  n: 11,
};
bingUtils.featchPicURLs(options, (urls) => {
  Object.keys(urls).forEach((name) => {
    const options = {
      name,
      path: path.resolve(process.cwd(), './image'),
    }
    bingUtils.downloadPic(urls[name], options, () => {
      console.log('保存成功');
    })
  })
});