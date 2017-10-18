# 介绍
circle-progress-bar.js 是一款利用canvas绘制圆环进度条的插件，不依赖任何库。    
效果如图：   
![](http://owbd0ue91.bkt.clouddn.com/aabc.gif)
# 用法
### 下载
`git clone` 此仓库，然后在html中引用 lib文件夹中的`circle-progress-bar.js`即可。
### 基础用法
```
<style>
	#my-canvas {
		/*利用css控制canvas元素的宽高，解决canvas本身的失真问题*/
		width: 20px; 
	}
</style>
<canvas id="my-canvas" > 
</canvas>
<script src="./circle-progress-bar.js">
</script>
<script>
	var myCanvas = document.querySelector('#my-canvas');
	var c1 = new CircleProgressBar({
		canvasDom: myCanvas
	});
</script>
```
### 参数配置

```
{
	canvasDom: CanvasDomNeedToSet, // 必填的canvas dom 
	// 以下的数值为默认参数值
	r: 30,						   // 内圆半径
	lineWidth: 5, 				   // border宽度
	lineColor: '#3385ff', 		   // border进度条颜色
	lineBgColor: '#eeeeee',        // border背景颜色
	angle: Math.PI * 0.5,          // 需要转动的角度
	startAngle: -Math.PI * 0.5,    // 起始角度
	duration: 1000,				   // 过渡时间, 单位:ms
	text: '',    				   // 圆圈中的文字
	showPercent: true, 			   // 是否显示百分比数值
	textFontSize: 12, 			   // 文字大小 (px)
	textColor: '#3385ff', 		   // 文字颜色
	animationMode: 'linear'        // 'linear' || 'accelerate' || 'decelerate'  匀速，加速， 减速
}
```

# 兼容性

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) 
--- | --- | --- | --- | --- | ---
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 10+ ✔ 

### Tips
* **此插件运行方向均为顺时针，暂时不支持逆时针；**

* **当showPercent为true时，同时又存在text: '示例文字' ，则'示例文字'不会出现，只会出现百分比文字；**  
 
* **如何解决canvas失真的问题？**   
失真问题是canvas本身就会存在的问题，利用css缩小canvas的宽高即可；   
如：设置参数：r: 50, lineWidth: 10, 则此时canvas的width会是 50*2+10\*2 === 120, 此时css设置`	#my-canvas {width: 60px;}` 便缩小至了60px。

* **可以设置多行文字吗？**   
不行，只能设置单行文字。

* **如何解决文字换行的问题？**   
此插件不支持文字换行，文字过多时会造成canvas的显示不正常。   
解决方案： 设置参数`showPercent: false`, 然后用户自己编写文字元素并利用定位调整到圆环中心显示。
