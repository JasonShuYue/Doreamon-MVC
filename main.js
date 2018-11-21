function Model(options) {
    this.code = options.code;
    this.duration = options.duration;
}

function View(options) {
    this.element = options.element;
}


View.prototype.writeCode = function(dom, model, callback) {
    dom = document.querySelector(dom);
    var tagName = dom.tagName;
    var n = 0;
    setTimeout(function fn() {
        n += 1;
        if(n === model.code.length) {
            callback && callback();
        } else {
            if(tagName === "STYLE") {
                dom.innerHTML += model.code.substring(n - 1, n);
            }
            if(tagName === "PRE") {
                dom.scrollTop = dom.scrollHeight;
                dom.innerText += model.code.substring(n - 1, n);
            }
            setTimeout(fn, model.duration);
        }
    }, model.duration);
}







let model = new Model({
    code: `/*
    首先准备上下布局，上面为代码区，下面为预览区
*/
#code-part {
    height: calc(50% - 30px);
    overflow: hidden;
    border-bottom: 1px solid black;
}

#code-pre {
   height: 100%;
   overflow: hidden;
}

#pre-part {
    height: calc(50% + 30px);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
/*
    我们把字体放大点
*/
* {
    font-size: 16px;
}
/*
    画一个蓝色大头呢
*/
.head {
    width: 330px;
    height: 330px;
    position: relative;
    border: 5px solid black;
    background: #019FE9;
    border-radius: 50%;
}

/*
    来个大白脸
*/
.face {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: white;
    border: 3px solid black;
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
}

/*
    一双明亮的大眼睛
*/
.leftEye, .rightEye {
    width: 70px;
    height: 80px;
    position: absolute;
    background: white;
    border-radius: 55%;
    border: 5px solid black;
}

.eyeBall {
    content: '';
    display: block;
    position: absolute;
    bottom: 10px;
    left: 10%;
    width: 30px;
    height: 40px;
    background: black;
    border-radius: 48%;
}

.eyeBall::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 30%;
    left: 20%;
    width: 15px;
    height: 15px;
    background: white;
    border-radius: 100%;
}

.leftEye {
    left:50%;
    top: 0;
    transform: translateX(-100%);
}

.rightEye {
    left:50%;
    top: 0;
}

/*
    可爱的红鼻子
*/
.nose {
    width: 40px;
    height: 40px;
    position: absolute;
    border: 5px solid black;
    border-radius: 50%;
    background: red;
    left: 50%;
    transform: translateX(-50%);
    top: 65px;
}

.nose::after {
    content: '';
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
    left: 5px;
    top: 5px;
}

/*
    来6根胡子
*/
.mustache {
    position: absolute;
    left: 50%;
    top: 105px;
    transform: translateX(-50%);
}

.mustache-0 {
    width: 5px;
    height: 170px;
    background: black;
}


.mustache-1, .mustache-2, .mustache-3, .mustache-4, .mustache-5, .mustache-6 {
    width: 115px;
    height: 3px;
    position: absolute;
    background: black;
    margin-bottom: 15px;
    left: 0;
    top: 0;
}

.mustache-1 {
    transform: translateX(-120%) rotate(10deg);
}

.mustache-2 {
    transform: translateX(25%) rotate(-10deg);
}

.mustache-3 {
    transform: translateX(-120%);
    top: 30px;
}

.mustache-4 {
    transform: translateX(25%);
    top: 30px;
}

.mustache-5 {
    transform: translateX(-120%) rotate(-10deg);
    top: 60px;
}

.mustache-6 {
    transform: translateX(25%) rotate(10deg);
    top: 60px;
}

/*
    一个大大的笑容
*/
.mouth {
    width: 180px;
    height: 60px;
    background: transparent;
    border: 3px solid black;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: none;
    transform: translateX(-50%);
    border-bottom-left-radius: 100px 90px;
    border-bottom-right-radius: 100px 90px;
}

.tie {
    width: 200px;
    height: 25px;
    position: absolute;
    top: 95%;
    left: 50%;
    transform: translateX(-50%);
    background: red;
    border: 4px solid black;
    border-radius: 10px;
}

.bell {
    width: 40px;
    height: 40px;
    position: absolute;
    border: 4px solid black;
    border-radius: 100%;
    background: #ECC81A;
    left: 50%;
    top: -65%;
    transform: translateX(-50%);

}

.black-circle {
    width: 10px;
    height: 10px;
    position: absolute;
    background: black;
    border-radius: 100%;
    left: 50%;
    transform: translateX(-50%);
    bottom: 6px;
}

.bell-rectangle {
    width: 44px;
    height: 10px;
    background: #ECC81A;
    position: absolute;
    border: 3px solid black;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    top: 4px;
}

.black-circle::after {
    content: '';
    display: block;
    width: 3px;
    height: 6px;
    position: absolute;
    background: black;
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
}
    
    `,
    duration: 100
});

let view1 = new View({
    element: "#styleTag",
});

let view2 = new View({
    element: "#code-pre",
});




let controller = {
    init(options) {
        this.view = options.view;
        this.model = options.model;
        this.bindEvents();
        this.view.writeCode(this.view.element, this.model);
    },
    bindEvents() {
        var $speedControl = $('.speed-control');
        $speedControl.on("click", "[data-speed]", (e) => {
        let current = e.currentTarget;
        let speed = $(current).attr("data-speed");
        // 清楚兄弟的active，然后在当前元素添加active
        $(current).addClass("active")
            .siblings(".active").removeClass("active");
        switch(speed) {
            case "slow":
                this.model.duration = 100;
                break;
            case "normal":
                this.model.duration = 50;
                break;
            case "high":
                this.model.duration = 10;
                break;
        }
    });
    }
};

controller.init({
    view: view1,
    model: model
});

controller.init({
    view: view2,
    model: model
});










