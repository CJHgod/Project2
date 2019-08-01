


class indexManeger {
    constructor(data) {
        this.topimg1 = data.topimg;
        this.selectdata = data.selectdata;
    }
    section2() {
        //渲染顶图
        $(".topimg").append(`<img src="${this.topimg1}" alt="">`);
        //渲染搜索框热门内容
        var lidatas = this.selectdata.map((ele) => {
            return ` <li><a href="">${ele}</a></li>`
        }).join("");
        $(".b2 ul").append(lidatas);
        //渲染商品分类

    }
    init() {
        this.section2();
    }
}