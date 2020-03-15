const bingUtils = require('../src/bingUtils');
const path = require('path');
const wallpaper = require('wallpaper');

const options = {
  n: 1,
};
bingUtils.featchPicURLs(options, (urls) => {
  Object.keys(urls).forEach((name) => {
    const imagePath = path.resolve(process.cwd(), './images');
    const options = {
      name,
      path: imagePath,
    }
    bingUtils.downloadPic(urls[name], options, () => {
      //设置今日最新的为壁纸
      const imageURL = path.resolve(imagePath, `./${name}.jpg`);
      wallpaper.set(imageURL);
    })
  })
});