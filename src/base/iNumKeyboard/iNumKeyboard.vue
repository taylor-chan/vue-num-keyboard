/*
* @Author: taochen
* @Date: 2018-03-39 15:15:19
* @Last Modified by:   taochen
* @Last Modified time: 2018-06-11 18:28:19
*/
<template>
    <div id="iNumKeyboard" 
        @touchstart="typeIn" 
        @contextmenu.prevent.stop 
        :class="['animated' , { 'fadeInUp': keyboardShow , 'fadeOutDown': !keyboardShow}]">
        <div class="container-left">
            <div class="key-items">
                <div class="item">1</div>
                <div class="item">2</div>
                <div class="item">3</div>
            </div>
            <div class="key-items">
                <div class="item">4</div>
                <div class="item">5</div>
                <div class="item">6</div>
            </div>
            <div class="key-items">
                <div class="item">7</div>
                <div class="item">8</div>
                <div class="item">9</div>
            </div>
            <div class="key-items">
                <div class="item">.</div>
                <div class="item">0</div>
                <div class="item hideKeyboard"></div>
            </div>
        </div>

        <div class="container-right">
            <div class="item backSpace"></div>
            <div class="item">{{ buttonName }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'keyboard',
    props: {
        buttonName: {
            type: String,
            default: '确定'
        },
        hasDotLength: {
            type: Number,
            default: 10
        },
        noDotLength: {
            type: Number,
            default: 10
        },
        result: {
            type: String,
            required: true
        },
        keyboardShow: {
            type: Boolean,
            default: true
        }
    },
    /*
    * @创建一个copyResult变量缓存result数据
    * @在子组件需要调用result的地方调用data对象copyResult
    * @Author：taochen
    */
    data () {
      return {
        copyResult: this.result
      }
    },
    /*
    * @新增result的watch，监听变更同步到copyResult
    * @监听父组件对props属性result的修改，并同步到组件内的data属性
    * @Author：taochen
    */
    watch: {
      result (val) {
        this.copyResult = val
      }
    },
    methods: {
        // 键盘输入事件
        typeIn(evt) {
            
            let self = this
            const $tar = evt.target || evt.srcElment
            var currentInput = !!$tar.innerText ? $tar.innerText : $tar.classList[1]
            var str = self.copyResult

            // 按下的是“确认”按钮
            if (currentInput == self.buttonName) {
                self.$emit("childSubmit")
                return;
            }
            // 按下的是“删除”按钮
            if (currentInput == "backSpace") {
                self.copyResult = self.copyResult.slice(0 , -1)
                self.$emit('parentResult' , self.copyResult)
                return;
            }
            // 按下的是“隐藏键盘”按钮，且当前键盘状态是show
            if (currentInput == "hideKeyboard" && self.keyboardShow) {
                // 清空当前currentInput值“hideKeyboard”，避免被渲染到界面上
                currentInput = ""
                self.$emit('parentHide')
            }
            // 不允许输入多个小数点
            if (currentInput == "." && str.indexOf('.')>=0) {
                return;
            }
            // 当数字0开头，紧随其后的输入只允许为小数点
            if (str == '0' && currentInput != '.') {
                return;
            }
            // 小数点后最多只允许输入两位字符
            if (str.slice(str.indexOf('.')).length == 3) {
                return;
            }
            // 将当前输入拼接到字符串上，以供取值和界面渲染展示
            let _result = str + currentInput

            // 进行输入值长度校验，通过后才可确认为有效输入结果
            if (_result.length <= (_result.indexOf('.')>=0 ? self.hasDotLength : self.noDotLength)) {
                self.copyResult = _result
            }
            // 将输入结果派发到父组件
            self.$emit('parentResult' , self.copyResult)
        }
    }
}
</script>

<style lang="less">
    @import "./iNumKeyboard.less";
</style>
<style>
.animated {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both
}

@-webkit-keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp
}

@-webkit-keyframes fadeOutDown {
  0% {
    opacity: 1
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
}

@keyframes fadeOutDown {
  0% {
    opacity: 1
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
}

.fadeOutDown {
  -webkit-animation-name: fadeOutDown;
  animation-name: fadeOutDown
}
</style>
