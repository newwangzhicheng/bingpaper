# bingpaper
Package of utils to get bing daily wallpaper and set it as wallpaper to your PC.

## install from npm
```
$ npm install --save bingpaper

```
## how to use

```
//only for CommonJS
//create test.js 
const bingUtils = require('bingpaper');
bingUtils.setWallpaper();

//in terminal
node test
```
and you will find your wallpaper on desktop changed to lastest bing wallpaper.

the picture is stored in  `C:\Users\Administrator\Pictures` in default

## useful utils
here, I offer some useful utils for you.

1. get information about bing wallpaper, including urls of these pictures
`bingUtils.featchPicInfo(options, callback)`

| parameters     | type     | required | default | others                                                       |
| -------------- | -------- | -------- | ------- | ------------------------------------------------------------ |
| options        | Object   | No       | {}      | for options parameters                                       |
| options.n      | Number   | No       | 1       | maximum is 7，download numbers of pictures                  |
| options.format | String   | No       | 'js'    | request format, don't change                                 |
| options.ids    | number   | No       | 0       | I don't know, don't change                                   |
| callback       | Function | Yes      |         | default contains image info, type of this parameter is Array |

2. get picture urls 
`bingUtils.featchPicURLs(options, callback)`

| parameters     | type     | required | default | others                                                  |
| -------------- | -------- | -------- | ------- | ------------------------------------------------------- |
| options        | Object   | No       | {}      | for options parameters                                  |
| options.n      | Number   | No       | 1       | maximum is 7，download numbers of pictures             |
| options.format | String   | No       | 'js'    | request format, don't change                            |
| options.ids    | number   | No       | 0       | I don't know, don't change                              |
| callback       | Function | Yes      |         | default contains urls, type of this parameter is Object |

3. download these pictures
`bingUtils.downloadPic(url, options, callback)`

| parameters   | type     | required | default                         | others                                |
| ------------ | -------- | -------- | ------------------------------- | ------------------------------------- |
| url          | String   | Yes      |                                 | a url to download a picture           |
| options      | Object   | No       | {}                              | for options parameters                |
| options.name | String   | No       | date of this day                | give a name for your picture          |
| options.path | String   | No       | C:\Users\Administrator\Pictures | where you save your picture           |
| callback     | Function | Yes      |                                 | when you finish download your picture |

4. straightly set your desktop wallpaper as today's bing wallpaper
`bingUtils.setWallpaper()`

### **Tip 1: I failed to wabpack this project. anybody can help me?**

### **Tip 2: If you have no idea what I just said, go and see *test* of this project**

### **Tip 3: You can run Set.bat to set your desktop wallpaper**
