


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

    section3() {
        //轮播图右边下面选项卡
        var li1 = $(".bottom_img ul li");
        li1.eq(0).css("border-bottom", "3px solid blue");
        li1.mouseenter(function () {
            var ind1 = $(this).index();
            li1.eq(ind1).css("border-bottom", "3px solid blue").siblings().css("border-bottom", "none");
            $(".ul_context").eq(ind1).css("display", "block").siblings(".ul_context").css("display", "none")
        });

        //轮播图左边列表功能
        $(".img_left ul li").mouseenter(function () {
            console.log($(this))
            $(".list_context").css("display", "block");
            if ($(this).index() == 1) {
                // $(".li_left >div").addClass("mode2_flex").children().className("mode2 clearfix");
                console.log($(".li_left >div").addClass("mode2_flex").children())
                    ;
            }

        })
        $(".img_left ul li").mouseleave(function () {
            // console.log($(this))
            $(".list_context").css("display", "none");
        })
    }
    init() {
        this.section2();
        this.section3();

    }
}