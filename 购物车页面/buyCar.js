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


    //获取cookie并渲染标签
    getcookie() {

        //先判断页面有多少个cookie,  在动态渲染多少次商品
        var long = Cookie.getKeys().length;
        var res = ``;
        var acc = [];
        for (var i = 1; i <= long; i++) {

            acc.push(Cookie.getItem(i).split(","));

        }
        // console.log(acc)
        var acs = [];
        acc.forEach(eles => {
            // console.log(eles)
            var o = {};
            eles.forEach((ele, i) => {
                // console.log(ele, i)

                var arr4 = ele.split(":");
                // console.log(arr4)
                if (arr4.length == 3) {
                    o[arr4[0]] = `${arr4[1]}:${arr4[2]}`
                } else {
                    o[arr4[0]] = arr4[1];

                }
                // o[arr4[0]] = arr4[1];
            })

            acs.push(o);
        })
        console.log(acs)
        //acs就是每个对象   思路 遍历渲染



        //将cooki转成对象
        // console.log(Cookie.getItem("1").split(","))
        var arr = Cookie.getItem("1").split(",");
        // console.log(arr)

        var o = {};
        arr.forEach(ele => {
            var arr2 = ele.split(":")
            if (arr2.length == 3) {
                o[arr2[0]] = `${arr2[1]}:${arr2[2]}`
            } else {
                o[arr2[0]] = arr2[1];

            }
        })
        // console.log(o)



        // console.log(res);
        $(".section4 .center").append(res)
    }

    init() {
        this.section2();
        this.buyCar();
        this.getcookie();

    }
}