var text = document.title
var timerID

    function newtext() {
        clearTimeout(timerID)
        document.title = text.substring(1, text.length) + text.substring(0, 1)
        text = document.title.substring(0, text.length)
        timerID = setTimeout("newtext()", 200)
    }
document.addEventListener('DOMContentLoaded', function() {
    // 获取用户浏览器语言
    const userLanguage = window.navigator.language;
    console.log('User Launguage Checking OK!');
    console.log('User Launguage is:', userLanguage);
    // 重定向到相应语言的页面
    // window.location.href = `./index.ja.html`;
    if (userLanguage == 'en-US' || userLanguage == 'en') {
        window.location.href = `./index_en.html`;
    } else if (userLanguage !== 'zh-CN' && userLanguage !== 'zh') {
        window.location.href = `./index.html`;

        function showTime(clock) {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth();
            var day = now.getDate();
            var hour = now.getHours();
            var minu = now.getMinutes();
            var second = now.getSeconds();
            month = month + 1;
            var arr_work = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
            var week = arr_work[now.getDay()];
            var time = year + "-" + month + "-" + day + " " + week + " " + hour + ":" + minu + ":" + second + "";
            clock.innerHTML = "" + time;
        }
        window.onload = function() {
            var clock = document.getElementById("clock");
            window.setInterval("showTime(clock)", 1000);

        }
        var now = new Date();

        function createtime() {
            var grt = new Date("02/06/2024 16:30:00"); //修改建站时间
            now.setTime(now.getTime() + 250);
            days = (now - grt) / 1000 / 60 / 60 / 24;
            dnum = Math.floor(days);
            hours = (now - grt) / 1000 / 60 / 60 - (24 * dnum);
            hnum = Math.floor(hours);
            if (String(hnum)
                .length == 1) {
                hnum = "0" + hnum;
            }
            minutes = (now - grt) / 1000 / 60 - (24 * 60 * dnum) - (60 * hnum);
            mnum = Math.floor(minutes);
            if (String(mnum)
                .length == 1) {
                mnum = "0" + mnum;
            }
            seconds = (now - grt) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
            snum = Math.round(seconds);
            if (String(snum)
                .length == 1) {
                snum = "0" + snum;
            }
            document.getElementById("timeDate")
                .innerHTML = "在不知不觉中，网站已经活了 " + dnum + " 天";
            document.getElementById("times")
                .innerHTML = hnum + " 小时 " + mnum + " 分 " + snum + " 秒";
        }
        setInterval("createtime()", 250);
        var DEFAULT_VERSION = "9.0";
        var ua = navigator.userAgent.toLowerCase();
        var isIE = ua.indexOf("msie") > -1;
        var safariVersion;
        if (isIE) {
            safariVersion = ua.match(/msie ([\d.]+)/)[1]; //获取浏览器版本号
        }
        if (safariVersion * 1 <= DEFAULT_VERSION * 1) { //若版本号低于IE9，则跳转到如下页面
            window.location.href = "http://minqwq.github.io/updatebrowser.html"; //提示页面（修改路径）
        }
        var BackTop = function(domE, distance) {
            if (!domE) return;
            var _onscroll = window.onscroll,
                _onclick = domE.onclick;
            window.onscroll = throttle(function() {
                typeof _onscroll === 'function' && _onscroll.apply(this, arguments);
                toggleDomE();
            }, 100);
            domE.onclick = function() {
                typeof _onclick === 'function' && _onclick.apply(this, arguments);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            };

            function toggleDomE() {
                domE.style.display = (document.documentElement.scrllTop || document.body.scrollTop) > (distance || 500) ? 'block' : 'none';
            }

            function throttle(func, wait) {
                var timer = null;
                return function() {
                    var self = this,
                        args = arguments;
                    if (timer) clearTimeout(timer);
                    timer = setTimeout(function() {
                        return typeof func === 'function' && func.apply(self, args);
                    }, wait);
                }
            }
        };
        (function fairyDustCursor() {

            var possibleColors = ["#FFFFFF", "#CCCCCC", "#999999"]
            var width = window.innerWidth;
            var height = window.innerHeight;
            var cursor = {
                x: width / 2,
                y: width / 2
            };
            var particles = [];

            function init() {
                bindEvents();
                loop();
            }

            // Bind events that are needed
            function bindEvents() {
                document.addEventListener('mousemove', onMouseMove);
                window.addEventListener('resize', onWindowResize);
            }

            function onWindowResize(e) {
                width = window.innerWidth;
                height = window.innerHeight;
            }

            function onMouseMove(e) {
                cursor.x = e.clientX;
                cursor.y = e.clientY;

                addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
            }

            function addParticle(x, y, color) {
                var particle = new Particle();
                particle.init(x, y, color);
                particles.push(particle);
            }

            function updateParticles() {

                // Updated
                for (var i = 0; i < particles.length; i++) {
                    particles[i].update();
                }

                // Remove dead particles
                for (var i = particles.length - 1; i >= 0; i--) {
                    if (particles[i].lifeSpan < 0) {
                        particles[i].die();
                        particles.splice(i, 1);
                    }
                }

            }

            function loop() {
                requestAnimationFrame(loop);
                updateParticles();
            }

            /**
             * Particles
             */

            function Particle() {

                this.character = "*";
                this.lifeSpan = 120; //ms
                this.initialStyles = {
                    "position": "fixed",
                    "display": "inline-block",
                    "top": "0px",
                    "left": "0px",
                    "pointerEvents": "none",
                    "touch-action": "none",
                    "z-index": "10000000",
                    "fontSize": "25px",
                    "will-change": "transform"
                };

                // Init, and set properties
                this.init = function(x, y, color) {

                    this.velocity = {
                        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                        y: 1
                    };

                    this.position = {
                        x: x + 10,
                        y: y + 10
                    };
                    this.initialStyles.color = color;

                    this.element = document.createElement('span');
                    this.element.innerHTML = this.character;
                    applyProperties(this.element, this.initialStyles);
                    this.update();

                    document.querySelector('.js-cursor-container')
                        .appendChild(this.element);
                };

                this.update = function() {
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    this.lifeSpan--;

                    this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 120) + ")";
                }

                this.die = function() {
                    this.element.parentNode.removeChild(this.element);
                }

            }

            /**
             * Utils
             */

            // Applies css `properties` to an element.
            function applyProperties(target, properties) {
                for (var key in properties) {
                    target.style[key] = properties[key];
                }
            }

            if (!('ontouchstart' in window || navigator.msMaxTouchPoints)) init();
        })(); < /script>
<script>
function clickEffect() {
  let balls = [];
  let longPressed = false;
  let longPress;
  let multiplier = 0;
  let width, height;
  let origin;
  let normal;
  let ctx;
  const colours = ["#0C2875", "#05688D", "#028090", "#00A896", "#02C39A"];
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
  const pointer = document.createElement("span");
  pointer.classList.add("pointer");
  document.body.appendChild(pointer);

  if (canvas.getContext && window.addEventListener) {
    ctx = canvas.getContext("2d");
    updateSize();
    window.addEventListener('resize', updateSize, false);
    loop();
    window.addEventListener("mousedown", function(e) {
      pushBalls(randBetween(10, 20), e.clientX, e.clientY);
      document.body.classList.add("is-pressed");
      longPress = setTimeout(function(){
        document.body.classList.add("is-longpress");
        longPressed = true;
      }, 500);
    }, false);
    window.addEventListener("mouseup", function(e) {
      clearInterval(longPress);
      if (longPressed == true) {
        document.body.classList.remove("is-longpress");
        pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
        longPressed = false;
      }
      document.body.classList.remove("is-pressed");
    }, false);
    window.addEventListener("mousemove", function(e) {
      let x = e.clientX;
      let y = e.clientY;
      pointer.style.top = y + "px";
      pointer.style.left = x + "px";
    }, false);
  } else {
    console.log("canvas or addEventListener is unsupported!");
  }


  function updateSize() {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(2, 2);
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
    origin = {
      x: width /
        2,
        y: height / 2
    };
    normal = {
        x: width / 2,
        y: height / 2
    };
}
class Ball {
    constructor(x = origin.x, y = origin.y) {
        this.x = x;
        this.y = y;
        this.angle = Math.PI * 2 * Math.random();
        if (longPressed == true) {
            this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
        } else {
            this.multiplier = randBetween(6, 12);
        }
        this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
        this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
        this.r = randBetween(8, 12) + 3 * Math.random();
        this.color = colours[Math.floor(Math.random() * colours.length)];
    }
    update() {
        this.x += this.vx - normal.x;
        this.y += this.vy - normal.y;
        normal.x = -2 / window.innerWidth * Math.sin(this.angle);
        normal.y = -2 / window.innerHeight * Math.cos(this.angle);
        this.r -= 0.3;
        this.vx *= 0.9;
        this.vy *= 0.9;
    }
}

function pushBalls(count = 1, x = origin.x, y = origin.y) {
    for (let i = 0; i < count; i++) {
        balls.push(new Ball(x, y));
    }
}

function randBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function loop() {
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        let b = balls[i];
        if (b.r < 0) continue;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
        ctx.fill();
        b.update();
    }
    if (longPressed == true) {
        multiplier += 0.2;
    } else if (!longPressed && multiplier >= 0) {
        multiplier -= 0.4;
    }
    removeBall();
    requestAnimationFrame(loop);
}

function removeBall() {
    for (let i = 0; i < balls.length; i++) {
        let b = balls[i];
        if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
            balls.splice(i, 1);
        }
    }
}
}
clickEffect(); //调用特效函数
//单个网页实现单击屏幕发出声音
function playSound() {
    var audio = document.getElementById("
audio ");
    if (audio.paused) { //如果音频是暂停状态
        audio.load; //加载音频文件
        audio.play(); //播放
    } else { //否则，也就是说音频是播放状态
        audio.play(); //就暂停
    }
}
//调用
window.onclick = function() {
    playSound();
}

function blinkwhitelink() {
    if (!document.getElementById('blinkwhite')
        .style.color) {
        document.getElementById('blinkwhite')
            .style.color = "black";
    }
    if (document.getElementById('blinkwhite')
        .style.color == "black") {
        document.getElementById('blinkwhite')
            .style.color = "#FFFFFF";
    } else {
        document.getElementById('blinkwhite')
            .style.color = "black";
    }
    timer = setTimeout("blinkwhitelink()", 500);
}

function stoptimer() {
    clearTimeout(timer);
}
blinkwhitelink()

function blinkredlink() {
    if (!document.getElementById('blinkred')
        .style.color) {
        document.getElementById('blinkred')
            .style.color = "red";
    }
    if (document.getElementById('blinkred')
        .style.color == "red") {
        document.getElementById('blinkred')
            .style.color = "#FFFFFF";
    } else {
        document.getElementById('blinkred')
            .style.color = "red";
    }
    timer = setTimeout("blinkredlink()", 500);
}

function stoptimer() {
    clearTimeout(timer);
}
blinkredlink()

function getLastTime() {
    // 获取系统现在时间
    var date = new Date();
    // 获取今年年份
    var year = date.getFullYear();
    // 创建获取指定时间为：今年12月31日23时59分59秒，问：为什么不是24小时？因为小时在js中是从0开始算的0~23，分和秒也是一样从0~59
    var endDate = new Date(year, 12, 31, 23, 59, 59);
    // 指定时间毫秒数 减去 现在时间毫秒数 得出 两个时间之间的毫秒差值
    // 我们知道1000毫秒等于1秒，60秒等于1分钟，60分钟等于1个小时，24个小时等于1天，问：那怎么用毫秒差得出距离的天数或者小时、分钟呢？
    /* 答： 拿天数比如以此类推：
1. 首先我们将毫秒数除于1000得出秒数，因为1000毫秒等于1秒
2. 得出时间差的秒数后，我们需要算出一天有多少秒？，我们知道一天有24个小时每个小时60分钟每分钟60秒，所以只需要24小时乘于60分钟得出1440分钟，然后1440分钟乘于60秒得出86400秒
3. 得出一天有86400秒后除于时间差的秒就得出距离指定日期还有多少天了
*/
    var time = Math.floor((endDate.getTime() - date.getTime()) / 1000);
    // 获取差值的天数
    var day = Math.floor(time / (24 * 60 * 60));
    // 获取差值的小时，时间差秒数取余数86400秒再除于一个小时3600秒得出相差小时，问:为什么取一天的秒的余数呢？？，
    // 答：时间差的秒除于1天的秒数，我们取这个的余数相当于取了不够除于1天的秒数，也就是说还剩下多少秒就是还剩下多少小时，
    // 因为如果足够除于一天的秒数那就是距离还有多少天了也就是天的数值了，而小时则是剩下的秒 除于 60分钟乘于60秒得出一个小时有3600秒然后再除于剩下的秒就变成多少小时了。
    // 后面的分钟和秒数大家自已动手算吧。
    // 注意：相同优先级运算符按从左到右的顺序计算
    // 附上一份mdn的运算符优先级表：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
    var hour = Math.floor(time % (24 * 60 * 60) / (60 * 60));
    // 获取差值的分钟，简单来说就是取余的作用就是得出不够一天的秒数和不够一个小时的秒数后除于60秒得出分钟
    var minute = Math.floor(time % (24 * 60 * 60) % (60 * 60) / 60);
    // 获取差值的秒数,简单来说就是取余的作用就是得出不够一天的秒数和不够一个小时的秒数和不够一分钟的秒
    var second = Math.floor(time % (24 * 60 * 60) % (60 * 60) % 60);
    // 如果数值小于9则是一位数，则补0
    day = day > 9 ? day : '0' + day;
    hour = hour > 9 ? hour : '0' + hour;
    minute = minute > 9 ? minute : '0' + minute;
    second = second > 9 ? second : '0' + second;
    // 获取显示元素将结果输出
    document.getElementById("show")
        .textContent = year + "年还剩" + day + "天" + hour + "时" + minute + "分" + second + "秒";
}
// 页面加载后，就调用一次，解决一秒后出现的问题
getLastTime();
// 设置1秒定时以刷新时间
setInterval(getLastTime, 1000);
fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
    const hitokoto = document.querySelector('#hitokoto_text')
    hitokoto.href = `https://hitokoto.cn/?uuid=${data.uuid}`
    hitokoto.innerText = data.hitokoto
})
    .
catch (console.error)

function myFunction() {
    var x = document.getElementById("luckvalue")
    x.innerHTML = Math.floor((Math.random() * 100) + 1);
}