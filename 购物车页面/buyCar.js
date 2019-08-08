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
        //页面开始，就要用对应数量来渲染价格
        var startSum = $(".shops .sum span");
        Array.from(startSum).forEach(eles => {
            var startPrices = $(eles).parent().siblings(".prices").children().text().slice(1) * 1;
            var startValue = $(eles).parent().siblings(".num").find("input").val() * 1;
            $(eles).text("¥" + (startPrices * startValue));
        })

        // console.log(startSum)



        //数量增减
        // $(".num_box input").val("1");//默认1   应该传值
        //开始默认全选  并附上价格
        var index = Array.from($(".sum span")).length;
        var zon = 0;
        for (var i = 0; i < index; i++) {
            zon += ($(".sum span").eq(i).text().slice(1)) * 1;
        }
        $(".rightss a").text("¥" + zon);




        $(".shops").mouseenter(function () {
            //加法


            $(this).find(".num_box span").eq(1).click(function () {


                var tes = Number($(this).siblings("input").val()) + 1
                $(this).siblings("input").val(tes);

                //点击改变默认value
                /* ？？？怎么改渲染时传进来的数量？ 商品详情页->购物车页面*/
                var valueId = $(this).siblings("input").val();
                $(this).siblings("input").attr("value", valueId);



                //同时更改总价
                var nums = $(this).siblings("input").val();
                var prices = $(this).parents(".num").siblings(".prices").children().text().slice(1);
                $(this).parents(".num").siblings(".sum").children().text("¥" + nums * prices);
                // var sums = $(this).parents(".num").siblings(".sum").children().text().slice(1);
                // console.log($(".sum span"))
                //同时再变动合计总价

                var index = Array.from($(".sum span")).length;
                var zon = 0;
                for (var i = 0; i < index; i++) {
                    if ($(".sum span").eq(i).parents(".sum").siblings(".checkbox").children().is(":checked") == true) {

                        zon += ($(".sum span").eq(i).text().slice(1)) * 1;
                    } else {
                        zon += 0;

                    }
                }
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
                    if ($(".sum span").eq(i).parents(".sum").siblings(".checkbox").children().is(":checked") == true) {

                        zon += ($(".sum span").eq(i).text().slice(1)) * 1;
                    } else {
                        zon += 0;

                    }
                }
                // console.log(zon)


                $(".rightss a").text("¥" + zon);

            })
        })
        $(".shops").mouseleave(function () {
            $(this).find(".num_box span").unbind();
        })



        //全选功能   (要用prop)  attr大坑
        $(".section3 .center ul li").eq(0).children().attr("checked", "checked");
        $(".cbox input").attr("checked", "checked");
        $(".shops .checkbox input").attr("checked", "checked");
        $(".section3 .center ul li").eq(0).children().click(function () {
            if ($(this).is(":checked") == true) {
                $(".shops .checkbox input").prop("checked", true);
                $(".cbox input").prop("checked", true);
                var index = Array.from($(".sum span")).length;
                var zon = 0;
                for (var i = 0; i < index; i++) {
                    zon += ($(".sum span").eq(i).text().slice(1)) * 1;
                }
                $(".rightss a").text("¥" + zon);
            }
            if ($(this).is(":checked") == false) {
                $(".shops .checkbox input").prop("checked", false);
                $(".cbox input").prop("checked", false);
                $(".rightss a").text("¥0");
            }
        })

        $(".cbox input").click(function () {
            // console.log($(this).is(":checked"))
            if ($(this).is(":checked") == true) {
                $(".shops .checkbox input").prop("checked", true);
                $(".section3 .center ul li").eq(0).children().prop("checked", true);

                var index = Array.from($(".sum span")).length;
                var zon = 0;
                for (var i = 0; i < index; i++) {
                    zon += ($(".sum span").eq(i).text().slice(1)) * 1;
                }
                $(".rightss a").text("¥" + zon);

            } else
                if ($(this).is(":checked") == false) {
                    $(".shops .checkbox input").prop("checked", false);
                    $(".section3 .center ul li").eq(0).children().prop("checked", false);
                    $(".rightss a").text("¥0");
                }
        });


        //监听单个单选按钮
        $(".shops .checkbox input").click(function () {
            var nums = $(this).parents(".checkbox").siblings(".num").find("input").val() * 1;
            var sums = $(this).parents(".checkbox").siblings(".sum").find("span").text().slice(1) * 1;
            // console.log(nums, sums)
            // console.log($(this).is(":checked"))

            if ($(this).is(":checked") == true) {
                var nowprices = $(".rightss a").text().slice(1) * 1;
                nowprices += nums * sums;
                $(".rightss a").text(`¥${nowprices}`);
            } else {
                var nowprices = $(".rightss a").text().slice(1) * 1;

                nowprices -= nums * sums;
                $(".rightss a").text(`¥${nowprices}`);
            }
        });



        // 为删除添加事件
        $(".section4 .del span").click(function () {
            $(this).parents(".shops").remove();
            //同时删除对应的cookie (通过商品编号)
            var ids = $(this).parent().siblings(".shopNum").children().text();

            Cookie.removeItem(`${ids}`);//删不掉cookie /cookie失败？
            //怎么设置cookie,就要怎么删，前面加了path，所以删除也要传path,与设置相同
            // Cookie.clear();
            // console.log(23)
        })

        //全删功能
        $(".section5 .fl_ul p").eq(1).click(function () {
            Cookie.clear();
            window.location.reload();
        });

        //批量删除

        $(".section5 .fl_ul p").eq(0).click(function () {
            // console.log(123)
            Array.from($(".shops .checkbox").find("input")).forEach(ele => {
                if ($(ele).is(":checked") == false) {
                    // $(ele).parents(".shops").remove();
                    var dleIndex = $(ele).parent().siblings(".shopNum").children().text();
                    Cookie.removeItem(`${dleIndex}`);
                    window.location.reload();
                }

            })
        });


    }


    //获取cookie并渲染标签
    getcookie() {

        //先判断页面有多少个cookie,  在动态渲染多少次商品
        var long = Cookie.getKeys().length;
        // console.log(Cookie.getItem(1))


        var acc = [];
        for (var i = 1; i <= long; i++) {
            // console.log(Cookie.getKeys(0))
            if (Cookie.getKeys(0) == "") {
                alert("当前没有商品");
            } else {
                var arr = Cookie.getKeys();
                var ins = arr[i - 1];
                // console.log(ins)
                acc.push(Cookie.getItem(ins).split(","));
            }


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
            // console.log(o)
            acs.push(o);
        })
        // console.log(acs)
        //acs就是每个对象   思路 遍历渲染

        var shops = acs.map((eles, i) => {
            // console.log(eles)
            return ` <div class="shops">
            <div class="checkbox">
                <input type="checkbox">
            </div>
            <div class="shopName">
                <div class="dflex">
                    <img src="${eles.img}" alt="">
                    <p>${eles.name}</p>
                </div>
            </div>

            <div class="shopNum">
                <span>${eles.ids}</span>
            </div>
            <div class="factory">
                <span>北京美浓日用品有限公司</span>
            </div>
            <div class="prices">
                <span>¥ ${eles.prices}</span>
            </div>
            <div class="num">
                <div class="num_box">
                    <span>-</span>
                    <input type="text" value=${eles.num}>
                    <span>+</span>
                </div>
            </div>
            <div class="sum">
                <span>¥ ${eles.prices}</span>
            </div>
            <div class="del">
                <span>删除</span>
            </div>
        </div>`;

        }).join("")
        //去value替换数量框的值

        $(".section4 .center").append(shops)






        //将cooki转成对象
        // console.log(Cookie.getItem("1").split(","))
        // var arr = Cookie.getItem("1").split(",");
        // console.log(arr)

        // var o = {};
        // arr.forEach(ele => {
        //     var arr2 = ele.split(":")
        //     if (arr2.length == 3) {
        //         o[arr2[0]] = `${arr2[1]}:${arr2[2]}`
        //     } else {
        //         o[arr2[0]] = arr2[1];

        //     }
        // })
        // console.log(o)



        // console.log(res);
        // $(".section4 .center").append(res)
    }



    init() {
        this.section2();
        this.getcookie();
        this.buyCar();

    }
}