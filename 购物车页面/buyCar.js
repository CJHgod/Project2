class indexManeger {
    constructor(data) {
        this.topimg1 = data.topimg;
        this.selectdata = data.selectdata;


    }
    section2() {
        //渲染页面广告图
        $(".topimg").eq(0).append(`<img src="../首页${this.topimg1[0]}" alt="">`);
        //渲染搜索框热门内容
        var lidatas = this.selectdata.map((ele) => {
            return ` <li><a href="">${ele}</a></li>`
        }).join("");
        $(".b2 ul").append(lidatas);
        //渲染商品分类

    }


    //获取查询字符串



    init() {
        this.section2();

    }
}