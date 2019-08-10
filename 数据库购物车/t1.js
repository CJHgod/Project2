
$(function () {


    //页面渲染，从car数据库拿数据渲染

    $.ajax({
        type: "post",
        url: "./数据/carIndex.php",
        dataType: "json",
        success: function (response) {
            var sums = 0;

            var shops = response.map(element => {
                var allsum = element.sum * element.num;
                if (element.isActive == 1) {
                    sums += allsum;

                }
                // console.log(element.isActive == 1 ? "checked" : "none")
                // sum += element.sum;
                return ` <div class="shops">
                      <div class="checkbox">
                          <input type="checkbox" ${element.isActive == "1" ? "checked" : ""}>
                      </div>
                      <div class="shopName">
                          <div class="dflex">
                              <img src="${element.img}" alt="">
                              <p>${element.shopname}</p>
                          </div>
                      </div>

                      <div class="shopNum">
                          <span>${element.goodsid}</span>
                      </div>
                      <div class="factory">
                          <span>北京美浓日用品有限公司</span>
                      </div>
                      <div class="prices">
                          <span>¥ ${element.prices}</span>
                      </div>
                      <div class="num">
                          <div class="num_box">
                              <span>-</span>
                              <input type="text" value="${element.num}">
                              <span>+</span>
                          </div>
                      </div>
                      <div class="sum">
                          <span>¥ ${allsum}</span>
                      </div>
                      <div class="del">
                          <span>删除</span>
                      </div>
                      </div>`;

            }).join("");

            $(".section4 .center").append(shops);
            $(".section5 .rightss a").text("¥" + sums);
        }
    });

    // console.log($(".section4 "))

    //监听页面加减法,与离开input
    $(".section4").on("mouseenter", ".shops", function () {
        // console.log($(this).find(".num_box span"))
        //按钮（加）
        $(this).find(".num_box span").eq(1).click(function () {
            var num = ($(this).siblings("input").val() * 1) + 1;
            $(this).siblings("input").val(num);
            // var price=
            var price = $(this).parents(".num").siblings(".prices").children().text().slice(1) * 1;
            $(this).parents(".num").siblings(".sum").children().text("¥" + price * num);




            var goodsid = ($(this).parents(".num").siblings(".shopNum").children().text() * 1)
            // console.log(num, goodsid)
            $.ajax({
                type: "post",
                url: "./数据/NumUp.php",
                data: `changeNum=${num}&goodsid=${goodsid}`,
            })
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
        //按钮（减）
        $(this).find(".num_box span").eq(0).click(function () {
            var num = ($(this).siblings("input").val() * 1) - 1;
            var price = $(this).parents(".num").siblings(".prices").children().text().slice(1) * 1;

            // console.log(price)
            if (num == 0) {
                return;
            } else {

                $(this).siblings("input").val(num);
                $(this).parents(".num").siblings(".sum").children().text("¥" + price * num);
            }


            var goodsid = ($(this).parents(".num").siblings(".shopNum").children().text() * 1)
            // console.log(num, goodsid)
            $.ajax({
                type: "post",
                url: "./数据/NumUp.php",
                data: `changeNum=${num}&goodsid=${goodsid}`,
            })
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

        //文本框输入，焦点离开(先清掉以前绑定的事件)
        $(this).find(".num_box input").unbind().blur(function () {
            var nowNum = $(this).val() * 1;
            var goodsid = ($(this).parents(".num").siblings(".shopNum").children().text() * 1)
            var price = $(this).parents(".num").siblings(".prices").children().text().slice(1) * 1;
            // console.log(num, goodsid)
            $.ajax({
                type: "post",
                url: "./数据/NumUp.php",
                data: `changeNum=${nowNum}&goodsid=${goodsid}`,
            })
            $(this).parents(".num").siblings(".sum").children().text("¥" + nowNum * price);
            //同时更新合计
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
    $(".section4").on("mouseleave", ".shops", function () {
        // console.log($(this).find(".num_box span"))
        // console.log($(this).find(".num_box span"))
        $(this).find(".num_box span").unbind();
    })




    //监听选择按钮
    $(".section4").on("click", ".checkbox input", function () {
        var flag = $(this).is(":checked");
        // var goodsid = ($(this).parents(".num").siblings(".shopNum").children().text() * 1)

        var goodsid = $(this).parent().siblings(".shopNum").children().text() * 1;
        // var num;
        // if (flag) {
        //     num = 1;
        // } else {
        //     num = 0;
        // }
        $.ajax({
            type: "post",
            url: "./数据/changeActive.php",
            data: `isActive=${flag == true ? 1 : 0}&goodsid=${goodsid}`,
        })
        //更新总价
        if (!flag) {

            var sums = $(this).parent().siblings(".sum").children().text().slice(1) * 1;
            var allsums = $(".rightss a").text().slice(1) * 1;

            $(".rightss a").text("¥" + (allsums - sums));
        } else {
            var sums = $(this).parent().siblings(".sum").children().text().slice(1) * 1;
            var allsums = $(".rightss a").text().slice(1) * 1;
            $(".rightss a").text("¥" + (allsums + sums));
        }


    })


    //全选功能
    //下面按钮
    $(".section5 .cbox input, .section3 ul li input").click(function () {
        var flag1 = $(this).is(":checked");

        $.ajax({
            type: "post",
            url: "./数据/changeActive.php",
            data: `isActive=${flag1 == true ? 3 : 4}`,
        })

        if (flag1 == true) {
            $(".section4 .checkbox input").prop("checked", true);
            $(".section3 ul li input").prop("checked", true);
            $(".section5 .cbox input").prop("checked", true);

            var index = Array.from($(".sum span")).length;
            var zon = 0;
            for (var i = 0; i < index; i++) {
                zon += ($(".sum span").eq(i).text().slice(1)) * 1;
            }
            // console.log(zon)


            $(".rightss a").text("¥" + zon);
        } else {
            $(".section4 .checkbox input").prop("checked", false);
            $(".section3 ul li input").prop("checked", false);
            $(".section5 .cbox input").prop("checked", false);

            $(".rightss a").text("¥" + 0);
        }
    })




    //批量删除功能 与 清空购物车功能
    $(".section5 .fl_ul p").click(function () {
        var p_index = $(this).index();
        // console.log(p_index)
        if (p_index == 0) {
            var arr = [];
            var str = "";
            $(".shops .checkbox input").each((i, ele) => {
                var flag = $(ele).prop("checked");
                if (!flag) {
                    $(ele).parents(".shops").remove();
                    var goodsid = $(ele).parent().siblings(".shopNum").children().text();
                    arr.push(goodsid);
                    str = "(" + arr.join(",") + ")";
                }
            })
            $.ajax({
                type: "post",
                url: "./数据/del.php",
                data: `goodsid=${str}`,

            })
            // window.location.reload()
        } else if (p_index == 1) {
            var arr = [];
            var str = "";
            $(".shops .checkbox input").each((i, ele) => {
                $(ele).parents(".shops").remove();
                var goodsid = $(ele).parent().siblings(".shopNum").children().text();
                arr.push(goodsid);
                str = "(" + arr.join(",") + ")";
            })
            $.ajax({
                type: "post",
                url: "./数据/del.php",
                data: `goodsid=${str}`,

            })
        }
    })

    //单个删除功能
    $(".section4 ").on("click", ".shops .del span", function () {
        var goodsid = "(" + $(this).parent().siblings(".shopNum").children().text() + ")";

        $.ajax({
            type: "post",
            url: "./数据/del.php",
            data: `goodsid=${goodsid}`,

        })
        $(this).parents(".shops").remove();

    })


})//加载括号