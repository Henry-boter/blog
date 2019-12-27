
# Vue项目主题色适配，看这一篇文章就够了
项目开发经常遇到一套代码需要配值不同的主体色，比如后台管理系统不同品牌的主体颜色不一样，需要根据不同品牌的环境变量打包生成不同颜色的主题和背景图片，或者节日期间更换网页皮肤，亦或者最近比较火的微信黑暗模式和明亮模式。都会有切换主题色的需求，那么本文就来探讨Vue项目关于主题色切换有哪些方法？

## 各大主流框架是怎么做的
### 1.iView官方推荐的方式
在项目中创建文件assets/my-theme/index.less，并写入一下内容：
```
// assets/my-theme/index.less
@import '~view-design/src/styles/index.less';

// Here are the variables to cover, such as:
@menu-dark-title: #001529;
@menu-dark-active-bg: #000c17;
@layout-sider-background: #001529;
@primary-color: #8c0776;

```
官方提供了完整的样式变量[默认样式变量](https://github.com/iview/iview/blob/2.0/src/styles/custom.less)，
我们在main.js中引用我们创建的文件assets/my-theme/index.less

```
// main.js
import Vue from 'vue';
import ViewUI from 'view-design';
import '../my-theme/index.less';

Vue.use(ViewUI);

```
my-theme引入之前：
![UTOOLS1577351448523.png](https://user-gold-cdn.xitu.io/2019/12/26/16f417995acbdfd8?w=3360&h=2054&f=png&s=289969)
引入my-theme之后：
![UTOOLS1577351553155.png](https://user-gold-cdn.xitu.io/2019/12/26/16f417b799552435?w=3360&h=2054&f=png&s=281459)
> 优点

- 简单快速，只需要修改变量，无需单个配置

> 缺点

1. 不能改变图标颜色
2. 不能动态切换（本地开发能根据js判断切换主题，打包后失效）
3. 不能切换页面图片

#### 2.Element UI
##### 1.主题编辑器

Element 默认提供一套主题，CSS 命名采用 BEM 的风格，方便使用者覆盖样式。我们提供了四种方法，可以进行不同程度的样式自定义。
使用[在线主题编辑器](https://element.eleme.cn/#/zh-CN/theme)，可以修改定制 Element 所有全局和组件的 Design Tokens，并可以方便地实时预览样式改变后的视觉
![16f41c0e1fc0b82d](https://user-gold-cdn.xitu.io/2019/12/26/16f41c0e1fc0b82d?w=1740&h=1088&f=png&s=291428)
主题编辑完成，下载等到一个文件theme文件
> 
![UTOOLS1577357295155.png](https://user-gold-cdn.xitu.io/2019/12/26/16f41d3faf9556aa?w=297&h=99&f=png&s=8920)

```
import Vue from 'vue'
import Element from 'element-ui'
import './assets/theme/index.css'

Vue.use(Element)
```
看例子：
默认主题
>   
![UTOOLS1577361714541.png](https://user-gold-cdn.xitu.io/2019/12/26/16f4215e14cac19b?w=3360&h=2054&f=png&s=181575)
> 
主题编辑器例子：
>   
![UTOOLS1577361157154.png](https://user-gold-cdn.xitu.io/2019/12/26/16f420d954b5f788?w=1710&h=938&f=png&s=116483)
![UTOOLS1577361511372.png](https://user-gold-cdn.xitu.io/2019/12/26/16f4212efc735275?w=3360&h=2054&f=png&s=184273)
>  
##### 2.在项目中改变 SCSS 变量
> Element 默认提供一套主题，CSS 命名采用 BEM 的风格，方便使用者覆盖样式。我们提供了四种方法，可以进行不同程度的样式自定义。

新建一个样式文件，例如 element-variables.scss，写入以下内容：

```
/* 改变主题色变量 */
$--color-primary: teal;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
```
之后，在项目的入口文件中，直接引入以上样式文件即可

```
import Vue from 'vue'
import Element from 'element-ui'
import './element-variables.scss'

Vue.use(Element)
```

改变 SCSS 变量例子

![UTOOLS1577362235442.png](https://user-gold-cdn.xitu.io/2019/12/26/16f421e17f5d51d5?w=3360&h=2054&f=png&s=172356)
> 优点
1. 提供在线编辑器，可直观的看到各个组件的样式
2. 直接引入样式文件，操作简单
3. 可改变图标颜色
> 缺点
1. 未实现动态改变主题样式
2. 图标只支持字体格式的图标（unicode，font-class），且需纯色图标
3. 不能改变页面图片(welcome.png)
#### 3.Vue-element-admin
##### 1.动态换肤，选择任意颜色替换主题色 
原理： element-ui 2.0 版本之后所有的样式都是基于 SCSS 编写的，所有的颜色都是基于几个基础颜色变量来设置的，所以就不难实现动态换肤了，只要找到那几个颜色变量修改它就可以了。 首先我们需要拿到通过 package.json 拿到 element-ui 的版本号，根据该版本号去请求相应的样式。拿到样式之后将样色，通过正则匹配和替换，将颜色变量替换成你需要的，之后动态添加 style 标签来覆盖原有的 css 样式。

```
const version = require('element-ui/package.json').version

const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
this.getCSSString(url, chalkHandler, 'chalk')

getCSSString(url, callback, variable) {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
      callback()
    }
  }
  xhr.open('GET', url)
  xhr.send()
}
```
官方提供主颜色选择器组件ThemePicker

```
import ThemePicker from '@/components/ThemePicker'
```
例子：
未修改前
![UTOOLS1577414523609.png](https://user-gold-cdn.xitu.io/2019/12/27/16f453ba989c88b3?w=3360&h=2054&f=png&s=393702)
修改后：![UTOOLS1577414595780.png](https://user-gold-cdn.xitu.io/2019/12/27/16f453ce3462f134?w=3360&h=2054&f=png&s=286293)
> 优点
1. 无需准备多套主题，可以自由动态换肤
2. 官方提供组件，用户可直接操作
> 缺点
1. 自定义不够，只支持基础颜色的切换（一种色系）
2. 不能更改图标和图片
##### 2.多套主题换肤
本方法就是最常见的换肤方式，本地存放多套主题，两者有不同的命名空间，如写两套主题，一套叫 day-theme ，一套叫 night-theme ，night-theme 主题都在一个 .night-theme 的命名空间下，我们动态的在 body 上 add .night-theme ; remove .night-theme。
## 
css样式编写：（已命名空间custom-theme为例）
```
.custom-theme .el-button + .el-button {
  margin-left: 10px
}

.custom-theme .el-button.is-round {
  padding: 12px 20px
}

.custom-theme .el-button:focus, .custom-theme .el-button:hover {
  color: #262729;
  border-color: #bebebf;
  background-color: #e9e9ea
}

.custom-theme .el-button:active {
  color: #222325;
  border-color: #222325;
  outline: 0
}
```
js操作
```
toggleClass(document.body, 'custom-theme')
```
浏览器DOM渲染
![UTOOLS1577416076182.png](https://user-gold-cdn.xitu.io/2019/12/27/16f45534e585231e?w=946&h=529&f=png&s=198652)
![UTOOLS1577416160750.png](https://user-gold-cdn.xitu.io/2019/12/27/16f45549d72a1c31?w=3360&h=2054&f=png&s=271413)
![UTOOLS1577416228235.png](https://user-gold-cdn.xitu.io/2019/12/27/16f4555cda4d7401?w=946&h=529&f=png&s=203198)
![UTOOLS1577416269777.png](https://user-gold-cdn.xitu.io/2019/12/27/16f45565ffb90470?w=3360&h=2054&f=png&s=267874)
> 优点
1. 可更换任意页面组件颜色
2. 官方提供主题生成库 element-theme 可根据需求进行了相应的改造。
> 缺点
1. 样式组件只能是element UI，其他UI组件不生效
2. 本地存放多套样式代码，代码冗余
3. 图片不行
## 我们项目怎样实现
需求：我们在套代码里实现两个品牌的主题色适配，适配内容全局的主题色更换（Jeep为橙色，alfa为红色），包括header，aside，button，table，table:hover，tabs，form。图片更换包括logo，aside图标，welcome页面，error页面，disable页面

#### 实现方案1
按照iView官方给出的方案：准备两套主题配色的css(Jeep,Alfa),不同的环境变量import不同的样式文件，貌似很简单。Do it!
#
创建两个文件theme_alfa.less,theme_jeep.less
```
// assets/less/theme_alfa.less
@import '../../../node_modules/view-design/src/styles/index.less';

@primary-color: #CC5D5B; // Jeep:#F7BB03,alfa:#CC5D5B
@success-color: #19be6b;
@warning-color: #F58220;
@error-color: #FF6C5D;
@place-color: #9B9B9B;
@btn-primary-color: #fff;
```
js判断

```
// 入口文件app.js
......
    const preject = globalRes.data.data.brandName;
    if (preject === 'JEEP') {
      require('./assets/less/theme_jeep.less');
    } else if (preject === 'ALFA') {
      require('./assets/less/theme_alfa.less');
    }
......
```
run dev，运行，搞定！
#
编译打包，上测试环境。。。
问题来了，服务器上的jeep，没有问题，alfa样式未改变。改代码不做js判断直接import './assets/less/theme_alfa.less',编译打包上测试，alfa样式OK。思考：为什么本地运行一切OK上环境就不行了呢？可能的原因：
1. 本地运行依赖于node,js可动态的改变css引入
2. css文件属于静态文件，webpack先打包静态文件，存为静态资源（服务器缓存静态资源）

于是乎这个实现方式被否定了，另辟蹊径。
#### 实现方案2
既然JS解决不了的问题能不能交给css来处理？采用css作用域的方式来控制控制作用域下面的子元素显示不同的颜色。
#
运用less预处理的函数方法，将颜色值设为变量，用函数的形式管理css作用域

```
// assets/less/theme.less
.theme(@primary-color: #CC5D5B, @btn-primary-color: #fff, @header-logo-width: 45px, @header-logo-height: 45px){
  .ivu-btn-primary {
    background-color: @primary-color;
    border-color: @primary-color;
    color: @btn-primary-color;
  }
  .ivu-btn-text {
    color: @primary-color;
  }
  .ivu-btn-default:hover {
    border-color: @primary-color;
    color: @primary-color;
  }
  .ivu-btn-primary:focus {
    box-shadow: none;
  }
}
.jeep{
  .theme(#F7BB03, #000000, 89px, 36px); //不传参，使用默认色
}
.alfa {
  .theme(#CC5D5B, #FFFFFF);
}
```

```
// app.js
import './assets/less/theme.less'
// app.vue
    initTheme() {
      const brandName = this.global.brandName.toLowerCase();
      document.getElementsByTagName('body')[0].className = brandName;
    },
```
样式编写搞定，run dev
![UTOOLS1577423938379.png](https://user-gold-cdn.xitu.io/2019/12/27/16f45cb7aee32e59?w=946&h=529&f=png&s=205132)
![UTOOLS1577424006293.png](https://user-gold-cdn.xitu.io/2019/12/27/16f45ccaa25c796a?w=3360&h=2054&f=png&s=578623)
![UTOOLS1577424343112.png](https://user-gold-cdn.xitu.io/2019/12/27/16f45d18fd3e317a?w=946&h=529&f=png&s=208379)
![UTOOLS1577424391048.png](https://user-gold-cdn.xitu.io/2019/12/27/16f45d23322a640a?w=3360&h=2054&f=png&s=577856)
打包上线，ok搞定。
#
> 思考：既然颜色值，像素值可以设为变量，那图片可以设为变量否？一切皆是变量。

```
// assest/less/theme.less
.welcome{
    background-size: 50% auto;
    background-repeat: no-repeat;
    background-position: center;
}
.themeImg(@welcome-img) {
  .welcome{
    background-image: url(@welcome-img);
  }
}

@welcome-img_jeep: '../img/jeep/welcome.png';
@welcome-img_alfa: '../img/alfa/welcome.png';

.jeep{
  .theme(#F7BB03, #000000, 89px, 36px); //不传参，使用默认色
  .themeImg(@welcome-img_jeep);
}

.alfa {
  .theme(#CC5D5B, #FFFFFF);
  .themeImg(@welcome-img_alfa);
}
```
效果如下：
![UTOOLS1577424088885.png](https://user-gold-cdn.xitu.io/2019/12/27/16f45dd44ff8d7b9?w=3360&h=2054&f=png&s=270286)
![UTOOLS1577425201039.png](https://user-gold-cdn.xitu.io/2019/12/27/16f45dea5a616450?w=3360&h=2054&f=png&s=315222)
关于页面代码，优化前：
```
<template>
  <div class="welcome">
    <img :src="require(`../assets/img/welcome_${global.brandName}.png`)" alt="Welcome!" class="welcome-img"/>
  </div>
</template>
<style scoped lang="less">
  .wrapper .main-container .page-view.welcome{
    left: 0;
    right: 0;
    padding-bottom: 0;
    background: #F4F7F8;
    background-repeat: no-repeat;
    background-size: 100% 20%;
    background-position: 0 100%;
    img {
      width: 800px;
      position: absolute;
      right: 50%;
      bottom: 50%;
      transform: translate(50%, 40%);
    }
  }
  .welcome-img {
    max-width: 100%;
  }
</style>
<script>
import { mapGetters } from 'vuex';
export default {
  components: {},
  computed: {
    ...mapGetters({
      global: 'getGlobal',
    }),
  },
};
</script>

```
代码优化后：
```
<template>
  <div class="welcome"></div>
</template>
```
同理，我们的logo，aside图标，welcome页面，error页面，disable页面都可以采用这种方式，不用js判断，CSS就能搞定。
> 优点
1. 同时满足了主题色和图片图标的适配
2. 一套代码，多品牌适配（如需适配更多品牌，只需要传不同的变量即可）
3. 简化代码结构
> 缺点
1. 需要适配主题色的组件需要手动适配到.theme(){}内
2. 图片是以div背景图的形式处理的，所以需要预先设置div高宽，不能按照图片大小自动撑开
3. 编码时，必须将样式颜色值单独提取，不能随意写死

## 结语
就此，实现是本项目的需求，期间踩过一些坑（方案1），分享出来，避免同样问题困扰其他小伙伴，其中表述的观点可能不正确，还需小伙伴们指出讨论。也可直接微信我，或者关注我GitHub账号[Henry-boter](https://github.com/Henry-boter)，掘金账号[Henry-boter](https://juejin.im/user/5ab0b6315188255572083569)
![UTOOLS1577426974834.png](https://user-gold-cdn.xitu.io/2019/12/27/16f45f9c05ac0caf?w=453&h=487&f=png&s=88717)

## 写在最后
工作中的一些[想法](https://henry-boter.github.io/blog/)
