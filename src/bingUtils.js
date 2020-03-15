const superAgent = require('superagent');
const fs = require('fs');
const path = require('path');
const wallpaper = require('wallpaper');

const bing = 'https://cn.bing.com';
const bingURL = 'http://www.bing.com/HPImageArchive.aspx';
const userAgent = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
};
module.exports = {
  /**
   * 获取bing壁纸的信息
   */
  featchPicInfo: function (options = {}, callback) {
    let defaultOptions = {
      ids: 0,
      format: 'js',
      n: 1,
    };

    //合并两个option
    const returnedOptions = Object.assign(defaultOptions, options);

    superAgent
      .get(bingURL)
      .set(userAgent)
      .query(returnedOptions)
      .end((err, res) => {
        try {
          const text = JSON.parse(res.text);
          callback && callback(text.images);
        } catch (error) {
          console.log('获取url的时候出错了');
          console.log('err :', err);
          throw error;
        }
      });
  },

  /**
   * 获取bing壁纸的url
   * 
   */
  featchPicURLs: function (options = {}, callback) {
    this.featchPicInfo(options, (images) => {
      const imgs = {};
      images.forEach((image) => {
        const date = image.startdate;
        imgs[date] = bing + image.url;
      });

      callback && callback(imgs);
    })
  },

  /**
   * 下载壁纸
   */
  downloadPic: function (url, options = {}, callback) {
    //默认参数
    //获取时间作为图片的名称
    const name = this.getDate();
    const pathName = path.normalize(process.cwd()); 
    let defaultOptions = {
      name,
      path: pathName,
    };

    //合并options
    const returnedOptions = Object.assign(defaultOptions, options);
    returnedOptions.path = path.normalize(returnedOptions.path);

    superAgent
      .get(url)
      .end((err, res) => {
        if (err) {
          throw err;
        } else {
          //图片路径
          const imagePath = path.resolve(returnedOptions.path, `./${returnedOptions.name}.jpg`);
          fs.writeFile(imagePath, res.body, 'binary', (error) => {
            if (error) throw error;
            callback && callback();
          });
        }
      });
  },

  /**
   * 设置今日的壁纸
   * 
   */
  setWallpaper: function () {  
    const options = {
      n: 1,
    };
    this.featchPicURLs(options, (urls) => {
      Object.keys(urls).forEach((name) => {
        const imagePath = path.normalize('C:/Users/Administrator/Pictures');
        const options = {
          name,
          path: imagePath,
        }
        this.downloadPic(urls[name], options, () => {
          //设置今日最新的为壁纸
          const imageURL = path.resolve(imagePath, `./${name}.jpg`);
          wallpaper.set(imageURL);
        })
      })
    });
  },
  /**
  * 返回年月日
  */
  getDate: function () {  
    const date = new Date();
    const day = [];

    day.push(date.getFullYear());
    day.push(date.getMonth());
    day.push(date.getDate());

    return day.join('');
  }
};