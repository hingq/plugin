var $ = unsafeWindow.jQuery
var  md5 = md5 || window.md5
var Typr = Typr || window.Typr
// 判断是否存在加密字体 @font-face
var $tip = $('style:contains(font-cxsecret)')
if (!$tip.length) return;
// 获取base64编码的二进制字符串
var font = $tip.text().match(/base64,([\w\W]+?)'/)[1]
font = Typr.parse(base64ToUint8Array(font))[0];

//记载映射表
var table = JSON.parse(GM_getResourceText('Table'))

var match = {};
const arr = []

/**
 * 匹配中文字符，因为只有中文字符进行了加密
 * 
 * 对匹配的数组进行去重，由于油猴本身的环境，这里set无法生效（es6）
 */
$('.font-cxsecret').html(function (index, html) {
    //匹配中文字符
    var key = new RegExp(/[\u4e00-\u9fa5]/, 'g')
    if (hasLengthProperty(html.match(key))) {
        for (var j = 0; j < key.length; j++) {
            if (arr.indexOf(key[j].charCodeAt()) === -1) arr.push(key[j].charCodeAt())
        }
    }
})

/**
 * arr数组存放字符的Unicode
 * 通过获取每个字符的字形数据，使用MD5生成哈希与映射表的匹配
 * 
 */
for (var i = 0; i < arr.length; i++) { 
    var index = Typr.U.codeToGlyph(font, arr[i])
    $tip = Typr.U.glyphToPath(font, index);
    if (!$tip) continue;
    $tip= md5(JSON.stringify($tip)).slice(24)
    if (index) match[arr[i]] = table[$tip];
}

/**
 * match数组存放正确的Unicode，使用fromCharCode,得到正确的字
 */
$('.font-cxsecret').html(function (index, html) {
    $.each(match, function (key, value) {
        key = String.fromCharCode(key);
        key = new RegExp(key, 'g');
        value = String.fromCharCode(value)
        html = html.replace(key, value)
    });
    return html;
}).removeClass('font-cxsecret'); 
function base64ToUint8Array(base64) {
    var data = window.atob(base64);
    var buffer = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
        buffer[i] = data.charCodeAt(i);
    }
    return buffer;
}
function hasLengthProperty(variable) {
    return variable != null && typeof variable.length !== 'undefined';
}
