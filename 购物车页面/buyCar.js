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


    //制作购物车功能
    buyCar() {
        //数量增减
        $(".num_box input").val("1");//默认1   应该传值
        $(".shops").mouseenter(function () {
            //加法
            $(this).find(".num_box span").eq(1).click(function () {
                var tes = Number($(this).siblings("input").val()) + 1
                $(this).siblings("input").val(tes);

                //同时更改总价
                var nums = $(this).siblings("input").val();
                var prices = $(this).parents(".num").siblings(".prices").children().text().slice(1);
                $(this).parents(".num").siblings(".sum").children().text("¥" + nums * prices);
                // var sums = $(this).parents(".num").siblings(".sum").children().text().slice(1);
                console.log($(".sum span"))
                //同时再变动合计总价

                var index = Array.from($(".sum span")).length;
                var zon = 0;
                for (var i = 0; i < index; i++) {
                    zon += ($(".sum span").eq(i).text().slice(1)) * 1;
                }
                console.log(zon)
          

                $(".rightss a").text("¥" + zon);
            })

            //减法
            $(this).find(".num_box span").eq(0).click(function () {

                var tes = Number($(this).siblings("input").val()) - 1
                if (tes == 0) {
                    return;
                } else {
                    $(this).siblings("input").val(tes);
                }
                //同时更改总价
                var nums = $(this).siblings("input").val();
                var prices = $(this).parents(".num").siblings(".prices").children().text().slice(1);
                $(this).parents(".num").siblings(".sum").children().text("¥" + nums * prices)
                // var sums = $(this).parents(".num").siblings(".sum").children().text().slice(1);
                //同时再变动合计总价
                var index = Array.from($(".sum span")).length;
                var zon = 0;
                for (var i = 0; i < index; i++) {
                    zon += ($(".sum span").eq(i).text().slice(1)) * 1;
                }
                console.log(zon)
          

                $(".rightss a").text("¥" + zon);

            })
        })
        $(".shops").mouseleave(function () {
            $(this).find(".num_box span").unbind();
        })



        //商品合计监听


        // console.log($(".rightss a").text())


    }


    init() {
        this.section2();
        this.buyCar();
    }
}