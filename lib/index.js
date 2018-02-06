(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global.CircleProgressBar = factory());
}(this, (function () {

	if (typeof Object.assign != 'function') {
		// Must be writable: true, enumerable: false, configurable: true
		Object.defineProperty(Object, "assign", {
			value: function assign(target, varArgs) { // .length of function is 2
				'use strict';
				if (target == null) { // TypeError if undefined or null
					throw new TypeError('Cannot convert undefined or null to object');
				}

				var to = Object(target);

				for (var index = 1; index < arguments.length; index++) {
					var nextSource = arguments[index];

					if (nextSource != null) { // Skip over if undefined or null
						for (var nextKey in nextSource) {
							// Avoid bugs when hasOwnProperty is shadowed
							if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
								to[nextKey] = nextSource[nextKey];
							}
						}
					}
				}
				return to;
			},
			writable: true,
			configurable: true
		});
	}

	function CircleProgressBar(options) {
		this.init(options);
		this.animate();
		return this;
	}

	CircleProgressBar.prototype.init = function (options) {
		if (!options || !options.canvasDom) {
			throw new Error('init circle need a valid options object!');
		}
		this.defaultOptions = {
			r: 30, // 内圆半径
			lineWidth: 5, // border宽度
			lineColor: '#3385ff',
			lineBgColor: '#eeeeee',
			isAntiClockWise: false, //默认顺时针
			angle: Math.PI * 0.5,
			startAngle: -Math.PI * 0.5,
			duration: 1000,
			text: '',
			showPercent: true,
			textFontSize: 12,
			textColor: '#3385ff',
			animationMode: 'linear' // 'linear' || 'accelerate' || 'decelerate'  匀速，加速， 减速
		};
		this.resultOptions = Object.assign(this.defaultOptions, options); // 合并后的参数对象
		this.lineWidth = this.resultOptions.lineWidth;
		this.lineColor = this.resultOptions.lineColor;
		this.lineBgColor = this.resultOptions.lineBgColor;
		this.isAntiClockWise = this.resultOptions.isAntiClockWise;
		this.angle = this.resultOptions.angle;
		this.startAngle = this.resultOptions.startAngle;
		this.duration = this.resultOptions.duration;
		this.text = this.resultOptions.text;
		this.showPercent = this.resultOptions.showPercent;
		this.textFontSize = this.resultOptions.textFontSize;
		this.textColor = this.resultOptions.textColor;
		this.animationMode = this.resultOptions.animationMode;
		// ***必选的参数***
		this.canvasDom = options.canvasDom;
		var ctx = this.canvasDom.getContext('2d');
		this.ctx = ctx;
		//canvas 宽高
		this.canvasWidth = this.canvasHeight = this.resultOptions.r * 2 + this.resultOptions.lineWidth * 2;
		this.canvasDom.width = this.canvasWidth;
		this.canvasDom.height = this.canvasHeight;
		// 计算绘制的半径与圆心，  线条宽度有一半是属于半径的，所以此处要加上线条宽度的一半
		this.r = this.resultOptions.r + this.lineWidth / 2;
		this.x = options.x === undefined ? this.r + this.lineWidth / 2 : options.x;
		this.y = options.y === undefined ? this.r + this.lineWidth / 2 : options.y;
		// 动画进度的角度
		this.animProgressAngle = this.startAngle;
		// 每帧16.667毫秒会跑动多少度
		this.anglePerFrame = this.angle / this.duration * (1000 / 60);
		this.speedRate = 1;
		switch (this.animationMode) {
			case 'linear':
				this.speedRate = 1;
				break;
			case 'accelerate':
				this.speedRate = 1.01;
				break;
			case 'decelerate':
				this.speedRate = 0.99;
				break;
			default:
				this.speedRate = 1;
		}
	}

	CircleProgressBar.prototype.draw = function () {
		var ctx = this.ctx;
		//绘制背景色
		ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, this.isAntiClockWise);
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.lineBgColor;
		ctx.stroke();
		//绘制进度条
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, this.startAngle, this.animProgressAngle, this.isAntiClockWise);
		ctx.strokeStyle = this.lineColor;
		//绘制文本
		ctx.font = this.textFontSize + 'px' + ' ' + 'sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = this.textColor;
		ctx.stroke();
		if (this.showPercent) {
			var percent = parseInt((this.animProgressAngle - this.startAngle) / (Math.PI * 2) * 100);
			ctx.fillText(percent + '%', this.x, this.y);
		} else {
			ctx.fillText(this.text, this.x, this.y);
		}
	}

	CircleProgressBar.prototype.animate = function () {
		this.draw();
		// 动画进度的角度
		this.animProgressAngle += this.anglePerFrame;
		if (this.animProgressAngle < this.startAngle + this.angle) {
			requestAnimationFrame(this.animate.bind(this));
			this.anglePerFrame *= this.speedRate;
		} else {
			this.animProgressAngle = this.startAngle + this.angle;
			this.draw();
		}
	}

	return CircleProgressBar;
})))


