define(function (require) {
    return {
        init: function (args) {
            var _this = args;
            $('#login-tabs').tabs().css('visibility','visible');
            _this.CanvasBg.init();
        },
        CanvasBg: {
            _: {
                //线条：开始xy坐标，结束xy坐标，线条透明度
                Line: function (x, y, _x, _y, o) {
                    this.beginX = x,
                        this.beginY = y,
                        this.closeX = _x,
                        this.closeY = _y,
                        this.o = o;
                },
                //点：圆心xy坐标，半径，每帧移动xy的距离
                Circle: function (x, y, r, moveX, moveY) {
                    this.x = x,
                        this.y = y,
                        this.r = r,
                        this.moveX = moveX,
                        this.moveY = moveY;
                },
                //生成max和min之间的随机数
                num: function (max, _min) {
                    var min = arguments[1] || 0;
                    return Math.floor(Math.random() * (max - min + 1) + min)*2;
                },
                // 绘制原点
                drawCricle: function (cxt, x, y, r, moveX, moveY) {
                    var circle = new this.Circle(x, y, r, moveX, moveY);
                    cxt.beginPath();
                    cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
                    cxt.closePath();
                    cxt.fill();
                    return circle;
                },
                //绘制线条
                drawLine: function (cxt, x, y, _x, _y, o) {
                    var line = new this.Line(x, y, _x, _y, o);
                    cxt.beginPath();
                    cxt.strokeStyle = 'rgba(0,0,0,' + o + ')'
                    cxt.moveTo(line.beginX, line.beginY);
                    cxt.lineTo(line.closeX, line.closeY);
                    cxt.closePath();
                    cxt.stroke();

                },
                //初始化生成原点
                init: function (context, OPTS) {
                    OPTS.circleArr = [];
                    for (var i = 0; i < OPTS.POINT; i++) {
                        OPTS.circleArr.push(this.drawCricle(context, this.num(OPTS.WIDTH), this.num(OPTS.HEIGHT), this.num(15, 2), this.num(10, -10) / 10, this.num(10, -10) / 10));
                    }
                    this.draw(context, OPTS);
                },

                //每帧绘制
                draw: function (context, OPTS) {
                    var canvas = OPTS.canvas;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    var circleArr = OPTS.circleArr;
                    for (var i = 0; i < OPTS.POINT; i++) {
                        this.drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
                    }
                    for (var i = 0; i < OPTS.POINT; i++) {
                        for (var j = 0; j < OPTS.POINT; j++) {
                            if (i + j < OPTS.POINT) {
                                var A = Math.abs(circleArr[i + j].x - circleArr[i].x),
                                    B = Math.abs(circleArr[i + j].y - circleArr[i].y);
                                var lineLength = Math.sqrt(A * A + B * B);
                                var C = 1 / lineLength * 7 - 0.009;
                                var lineOpacity = C > 0.03 ? 0.03 : C;
                                lineOpacity= 5*lineOpacity;
                                if (lineOpacity > 0) {
                                    this.drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity);
                                }
                            }
                        }
                    }
                }
            },
            init: function () {
                //定义画布宽高和生成点的个数
                var OPTS = {
                    WIDTH: window.innerWidth,
                    HEIGHT: window.innerHeight,
                    POINT: 18,
                    circleArr: []
                };
                var canvas = document.querySelector('.canvas-background');
                canvas.width = OPTS.WIDTH,
                    canvas.height = OPTS.HEIGHT;
                var context = canvas.getContext('2d');
                context.strokeStyle = 'rgba(0,255,0,0.2)',
                    context.strokeWidth = 1,
                    context.fillStyle = 'rgba(82,183,237,0.5)';
                OPTS.canvas = canvas;
                //调用执行
                var drawHelper = this._;
                drawHelper.init(context, OPTS);
                setInterval(function () {
                    for (var i = 0; i < OPTS.POINT; i++) {
                        var cir = OPTS.circleArr[i];
                        cir.x += cir.moveX;
                        cir.y += cir.moveY;
                        if (cir.x > OPTS.WIDTH) cir.x = 0;
                        else if (cir.x < 0) cir.x = OPTS.WIDTH;
                        if (cir.y > OPTS.HEIGHT) cir.y = 0;
                        else if (cir.y < 0) cir.y = OPTS.HEIGHT;
                    }
                    drawHelper.draw(context, OPTS);
                }, 48);
            }
        }
    }
});