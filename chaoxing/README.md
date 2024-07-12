## 仅供学习研究，请勿使用于非法用途



[md5](https://github.com/blueimp/JavaScript-MD5).js

### [Typr.js](https://github.com/photopea/Typr.js)



## 思路



使用jQuery，通过class的样式去抓取包含加密文字的标签

使用正则匹配表达式去匹配中文汉字，获取对应的Unicode

对数组进行去重处理

通过抓取的字体文件，通过索引找到图元信息，使用md5加密

建立建立哈希表，与正确字体的哈希表进行匹配

返回结果使用对象储存，key=>加密字体的Unicode，value=>解密字体的Unicode

最后遍历每组加密的字体，使用正确字体替换掉加密的字体

代码需要在油猴下运行

[tampermonkey](https://www.tampermonkey.net/)

参考：https://scriptcat.org/zh-CN/script-show-page/432/code
