


class indexManeger {
    constructor(data) {
        this.topimg1 = data.topimg;
        this.selectdata = data.selectdata;
        this.selectlist = data.selectlist;//列表数据
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


        //动态渲染商品分类列表
        var shoplist = this.selectlist.map(element => {
            return `  <li><span></span><a href="">${element.title}</a></li>`;
        }).join("");
        $(".img_left ul").append(shoplist);
        /*
        本想动态插入背景图，谁知傻X官方图不规则
                $(".img_left ul li span").each((c, elecc) => {
                    var num = -32 + 30 * c;
        
                    $(elecc).css({ backgroundPosition: `-58px ${num}px` })
                });


                */
        $(".img_left ul li span").each((c, elecc) => {



        });



        //动态渲染分类列表中的数据
        var li_left1 = this.selectlist.map(element => {
            // console.log(element)
            var mode = element.list2.map(ele => {
                // console.log(ele)
                var dds = ele.datas.map(eles => {
                    // console.log(eles)
                    return `<dd>${eles}</dd>`;
                }).join("");
                return `<div class="mode clearfix">
                            <p>${ele.type}</p>
                            <dl class="clearfix">
                                ${dds}
                            </dl>
                        </div>`
            }).join("");
            // console.log(mode);
            return ` <div class="li_left">
                         <div class="">
                         ${mode}
                         </div>
                    </div>
                    `
        }).join("");
        $(".list_context").append(li_left1);
        // console.log(li_left1);

        //右边对应的两张图片
        var img_right = this.selectlist.map(element => {
            var img_right1 = element.rightimg.map(ele => {
                return ` <div><img src="${ele}" alt=""></div>`
            }).join("");
            return `<div class="imr">${img_right1}</div>`;
        }).join("");
        $(".li_right").append(img_right);
        // console.log(img_right);

        //为列表信息字添加随机颜色
        var ddlength = $(".li_left dl dd").length;
        for (var c = 0; c < 60; c++) {
            var sd = parseInt(Math.random() * (ddlength + 1));
            $(".li_left dl dd").eq(sd).css("color", "blue")
        }


        //轮播图左边列表功能
        $(".img_left ul li").mouseenter(function () {
            // console.log($(this).index());
            $(".li_right .imr").eq($(this).index()).css("display", "block").siblings().css("display", "none")

            $(".li_left dl").removeAttr("style")
            $(".list_context").css("display", "block");
            $(".list_context .li_left").eq($(this).index()).css("display", "block").siblings(".li_left").css("display", "none");
            if ($(this).index() == 1 || $(this).index() == 5 || $(this).index() == 6 || $(this).index() == 7 || $(this).index() == 8) {
                // $(".li_left >div").addClass("mode2_flex").children().className("mode2 clearfix");
                var aa = $(".li_left >div").addClass("mode2_flex").children();
                aa.each((i, ele) => {
                    $(ele).attr("class", "mode2 clearfix");
                })
            } else if ($(this).index() == 2 || $(this).index() == 4) {
                $(".li_left >div").attr("class", "").children().attr("class", "mode clearfix");
                $(".li_left").eq($(this).index()).find("dl").eq(0).css({ width: "330px" });
                $(".li_left").eq($(this).index()).find("dl").eq(1).css({ width: "330px" });
                $(".li_left").eq($(this).index()).find(".mode").eq(0).css({ float: "left" });
                $(".li_left").eq($(this).index()).find(".mode").eq(1).css({ float: "left" })
            } else {
                $(".li_left dl").removeAttr("style");
                $(".li_left >div").attr("class", "").children().attr("class", "mode clearfix");
            }



        })
        //鼠标移出消失
        $(".context ").mouseleave(function () {
            // console.log($(this))
            $(".list_context").css("display", "none");
        });


    }
    init() {
        this.section2();
        this.section3();

    }
}