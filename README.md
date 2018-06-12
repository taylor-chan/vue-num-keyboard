# iNumKeyboard

***demo online*** [click to view](https://taylor-chan.github.io/vue-num-keyboard/dist/#/)

> a vue component for virtual number keyboard

![](http://ww1.sinaimg.cn/mw690/873fcdb7gy1fs8hz3wxkbj20u01hcabp.jpg)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```



## source path

**iNumKeyboard component path**
`src/base/iNumKeyboard`

**demo component path**
`src/demo.vue`  


## code example

```  
<iNumKeyboard
    ref="child" 
    :buttonName="buttonName" 
    :result="result" 
    :keyboardShow="keyboardShow" 
    @parentHide="hideKeyboard" 
    @parentResult="getChildResult" 
    @childSubmit="parentSubmit">
</iNumKeyboard>
```



## API 
>Input props  

|属性|说明|类型|默认值|
|:----:|:------:|:-----:|:------:|
|button-name|键盘主button名称|String|确定|
|result|虚拟键盘在输入区域默认输入值|String\|Number|默认为空|
|hasDotLength|含小数点的输入结果值最大数目限制|Number|10|
|noDotLength|不含小数点的输入结果值最大数目限制|Number|10|
|keyboardShow|控制虚拟键盘弹出与收起（true弹出，false收起）|Boolean|true|

<br/>

>Input events  

|方法名|说明|参数|
|:-----:|:------:|:-----:|
|childSubmit|键盘主button点击事件|无|
|parentResult|键盘输入的回调事件|无|









