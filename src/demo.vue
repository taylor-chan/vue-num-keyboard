<template>
  <div class="demo-container">

      <div class="box">
          <input type="hidden" />
          <p class="fake-placeholder" v-if="!result">请输入数字金额</p>
          <div class="fake-input" @click="showKeyboard">
              <p class='text-code' v-bind:class="{'i-cursor-show':iCursorShow&&keyboardShow,'i-cursor-hide':!iCursorShow||!keyboardShow}">{{result}}</p>
          </div>
      </div>

      <iNumKeyboard ref="child" :buttonName="buttonName" :result="result" :keyboardShow="keyboardShow" @parentHide="hideKeyboard" @parentResult="getChildResult" @childSubmit="parentSubmit">
      </iNumKeyboard>

  </div>
</template>

<script type="text/ecmascript-6">
import iNumKeyboard from './base/iNumKeyboard/iNumKeyboard.vue'

export default {
  data () {
      return {
        iCursorShow: true,//控制虚拟光标的显示与隐藏
        result: '',//虚拟键盘输入的结果值
        keyboardShow: true,//控制虚拟键盘的显示与隐藏
        buttonName: '确定',//虚拟键盘主button的名称
      }
  },
  created () {
      this.iCursorStatus()// 用于生成虚拟光标
  },
  methods: {
      // 用于实现虚拟光标的闪烁
      iCursorStatus() {
          const _this = this
          setInterval(function() {
              _this.iCursorShow = !_this.iCursorShow;
          }, 500);
      },
      /*
      * 虚拟数字键盘相关函数
      * showKeyboard显示键盘、hideKeyboard隐藏键盘、
      * getChildResult将子组件result值传递给父组件、parentSubmit提交按钮的回调
      */
      showKeyboard() {
          this.keyboardShow = true
          // console.log('我是show')
      },
      hideKeyboard() {
          this.keyboardShow = false
          // console.log('我是hide')
      },
      getChildResult(data) {
          this.result = data
      },
      parentSubmit() {
          this.keyboardShow = false
          console.log("提交，结果是：" , this.result)
          // alert("提交，结果是："+this.result)
      }
  },
  computed: {

  },
  mounted () {

  },
  components: {
    iNumKeyboard
  }
}
</script>

<style lang="less" scoped>
 @import "./demo.less";
</style>
