


class indexManeger {
    constructor(data) {
        this.topimg1 = data.topimg;
        this.selectdata = data.selectdata;
        this.selectlist = data.selectlist;//列表数据
        this.loopImg = data.loopImg;
        this.discoount = data.discoount;
        this.centershop = data.centershop;
        this.shoplist = data.shoplist;
        this.right_shoplist = data.right_shoplist;
    }
    section2() {
        //渲染页面广告图
        $(".topimg").eq(0).append(`<img src=".${this.topimg1[0]}" alt="">`);
        $(".topimg").eq(1).append(`<img src=".${this.topimg1[1]}" alt="">`);
        $(".topimg").eq(2).append(`<img src=".${this.topimg1[2]}" alt="">`);

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
            return `  <li><span></span><a >${element.title}</a></li>`;
        }).join("");
        $(".img_left ul").append(shoplist);
        /*
        本想动态插入背景图，谁知傻X官方图不规则
                $(".img_left ul li span").each((c, elecc) => {
                    var num = -32 + 30 * c;
        
                    $(elecc).css({ backgroundPosition: `-58px ${num}px` })
                });


                */


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


        //定义轮播图功能
        var ul_li = this.loopImg.map(ele => {
            return ` <li></li>`       //定义下面点数
        }).join("");
        $(".se3_img ul").append(ul_li);

        var loopimgs = this.loopImg.map(ele => {
            return ` <img src="${ele}" alt="">`
        }).join("");
        $(".se3_img").append(loopimgs);//插入图片


        //设置轮播图功能
        $(".se3_img img").eq(0).css("opacity", "1");
        $(".se3_img li").eq(0).css("background", "orange");
        var ind = 1;
        var time = function () {
            var timers = setInterval(function () {
                $(".se3_img img").eq(ind).css("opacity", "1").siblings("img").css("opacity", "0");
                $(".se3_img li").eq(ind).css("background", "orange").siblings("li").css("background", "#CCC");;
                var imglength = $(".se3_img img").length
                if (ind == imglength - 1) {
                    ind = 0;
                } else {
                    ind++;
                }
            }, 3000);
            $(".se3_img").mouseenter(function () {
                clearInterval(timers)
            })

        }
        time();//页面刷新就调用
        // console.log($(".se3_img li"))
        $(".se3_img li").mouseenter(function () {
            // console.log($(this))
            ind = $(this).index();
            $(".se3_img img").eq(ind).css("opacity", "1").siblings("img").css("opacity", "0");
            $(".se3_img li").eq(ind).css("background", "orange").siblings("li").css("background", "#CCC");;

        });

        $(".se3_img").mouseleave(function () {
            time();
        })


    }


    section4() {
        //定时器
        setInterval(function () {
            var nowTimes = new Date();
            var years = nowTimes.getFullYear();
            var months = nowTimes.getMonth() + 1;
            var date = nowTimes.getDate();
            var target = new Date(`${years}-${months}-${date} 23:59:59`);
            var offset = Math.round((target.getTime() - nowTimes.getTime()) / 1000);
            var h = Math.floor(offset / 60 / 60 % 24);
            var m = Math.floor(offset / 60 % 60);
            var s = Math.floor(offset % 60);
            $(".section4 .times .hours").html(h);
            $(".section4 .times .minute").html(m);
            $(".section4 .times .second").html(s);
        }, 1000);

        //动态插入打折数据
        var discount = this.discoount.map(ele => {
            return `<div class="shops clearfix">
                        <div class="s_left">
                            <p>${ele.active}</p>
                            <h3>${ele.shop}</h3>
                            <div class="pris">
                                <span class="spancss">￥${ele.prices}</span>
                                <span style="text-decoration: line-through">￥${ele.prices2}</span>
                            </div>
                        </div>
                        <div class="s_right">
                            <img src="${ele.img}" alt="">
                        </div>
                    </div>`;
        }).join("");
        $(".se4_right").append(discount);

        // console.log(discount)
    }

    section5() {
        var se5_context = this.centershop.map((ele) => {
            var rightcontext = ele.rightdata.map(eles => {
                return `  <div class="fr_list">
                <div class="fr_text">
                    <p>${eles.centername}</p>
                    <h3>${eles.centerspan}</h3>
                </div>
                <div>
                    <img src="${eles.img}" alt="">
                </div>
            </div>`;
            }).join("");


            return ` <div class="se5_one clearfix">
            <div class="first">
                <p>${ele.firstp}</p>
                <h3>${ele.firstspan}</h3>
                <div>
                    <img src="${ele.firstImg}" alt="">
                </div>
            </div>
            <div class="first_right">
              ${rightcontext}
            </div>
        </div>`;
        }).join("");
        // console.log(se5_context)

        $(".section5 .center").append(se5_context);

    }



    //     section6() {
    //         console.log(this.shoplist)
    //         this.shoplist.map(eless=>{
    //             console.log(eless)



    //         })
    //         //插入轮播图及标题
    //        var se_6= this.shoplist.map(ele => {
    //             var loImg = ele.img.map(eles => {
    //                 return ` <img src="${eles}" alt="">`;
    //             }).join("");
    //             return `   <h2>${ele.title}</h2>
    //             <div class="se6_img"> <div class="loop_border">${loImg}</div></div>`;
    //         })
    //         // $(".se6_left").append(se_6);
    //         //插入列表数据下的icon
    //         var ress = ``;
    //         this.shoplist.map(ele => {
    //             ele.datas.img.map((eles, i) => {
    //                 // console.log(eles, i)
    //                 if (i == 5) {
    //                     ress += ` <li><img src="${eles}" alt=""></li></ul><ul>`
    //                 } else {
    //                     ress += ` <li><img src="${eles}" alt=""></li>`;
    //                 }

    //             });
    //             ress = `  <div class="se6_icon"><ul>${ress}</ul></div>`;
    //         });

    //         //插入列表数据
    //         var res = ``;
    //         this.shoplist.map(ele => {
    //             ele.datas.context.map((eles, i) => {
    //                 // console.log(eles, i)
    //                 if (i == 5) {
    //                     res += ` <li><a>${eles}</a></li></ul><ul>`
    //                 } else {
    //                     res += `<li><a>${eles}</a></li>`;
    //                 }

    //             });
    //             res = `  <div class="se6_context clearfix"><ul>${res}</ul></div>`;
    //             // console.log(res);
    //             // return `${ele.title}`;
    //         });
    //         // $(".se6_left").append(res);
    //         // $(".se6_left").append(ress);
    //         $(".section6 .center").append(` <div class="se6_box clearfix"><div class="se6_left">${se_6}${res}${ress}</div><div class="se6_right"></div></div>`)



    //         //做se_6的轮播图
    //        var imgNum=$(".loop_border img").length;
    // var ins=0;
    //         setInterval(function(){
    //             $(".loop_border").css("left",`${ins}`)
    //             ins+=-360;
    //             if(ins==imgNum*-360){
    //                 ins=0;

    //             }
    //         },2000)

    //     }

    section6() {
        //获取商品信息
        // console.log(this.right_shoplist)

        // var slists = this.right_shoplist.map(ele => {
        //     return ` <li>
        //     <img src="${ele.img}" alt="">
        //     <p>${ele.shop}</p>
        //     <h4>
        //         <span>¥${ele.prices}</span>
        //         <span>¥${ele.prices2}</span>
        //     </h4>
        // </li>`;
        // });
        // console.log(slists[0])
        //根据tab数量划分数据,生成拼接多个shops然后没执行一下下面的循环，插入一次
        this.shoplist.map(ele => {
            var long = ele.tab.length * 8;
            // console.log(long)
            // console.log(slists.length)

            // console.log(slists.slice(long))
        });



        // console.log(this.shoplist)
        var se6_s = this.shoplist.map((ele, ind) => {
            // console.log((ind+1)*8-1)
            //定义右边数据              思路：外层Map执行一次输出0-7，第二次8-15
            // console.log(this.right_shoplist)
            // this.right_shoplist.map((ele, i) => {
            //     // if (i <= (ind + 1) * 8 - 1 && i >= ind * 8) {
            //     //     console.log(i)

            //     // }
            // })


            // console.log(ele.datas)
            //左边标题
            var se_6img = ele.img.map(ele => {
                return ` <img src="${ele}" alt="">`;
            }).join("");

            //数据
            var res = ``;
            ele.datas.context.map((eles, i) => {
                // console.log(eles, i)
                if (i == 5) {
                    res += ` <li><a>${eles}</a></li></ul><ul>`
                } else {
                    res += `<li><a>${eles}</a></li>`;
                }
            });
            res = `  <ul>${res}</ul>`;


            //处理icon图标
            var ress = ``;
            ele.datas.img.map((eles, i) => {
                // console.log(eles, i)
                if (i == 5) {
                    ress += ` <li><img src="${eles}" alt=""></li></ul><ul>`
                } else {
                    ress += ` <li><img src="${eles}" alt=""></li>`;
                }
            });
            ress = ` <ul>${ress}</ul>`;


            //右边tab
            var tabs = ele.tab.map(eles => {
                // console.log(ele.tab)
                return `<li>${eles}</li>`;
            }).join("");

            //处理右边数据
            // console.log(ele.listsdata)
            var lis = ele.listsdata.map(eles => {
                var lidata = eles.map(ele => {
                    // console.log(ele)
                    return ` <li>
                         <img src="${ele.img}" alt="">
                        <p>${ele.shop}</p>
                        <h4>
                            <span>¥${ele.prices}</span>
                            <span style="text-decoration:line-through">¥${ele.prices2}</span>
                            <i style="display:none">${ele.iconImg}</i>
                            <h3 style="display:none"> ${ele.sel}</h3>
                            <h5 style="display:none"> ${ele.act}</h5>
                            <h6 style="display:none">${ele.id}</h6>
                        </h4>
                   
                    </li>`;
                }).join("");
                return `    <div class="shops">
                <ul>${lidata}</ul></div>`
            }).join("");

            //监听鼠标划过tab



            return ` <div class="se6_box clearfix">
        <div class="se6_left">
                        <h2>${ele.title}</h2>
                        <div class="se6_img">
                            <div class="loop_border">    
                                    ${se_6img}                                                     
                            </div>
                        </div>
                        <div class="se6_context clearfix">
                            ${res}
                        </div>
                        <div class="se6_icon">
                          ${ress}
                        </div>
                    </div>
                  
                    <div class="se6_right">
                             <div class="tab clearfix">
                                <ul class="clearfix">
                                    ${tabs}
                                </ul>
                             </div>


                             <div class="shop_context">
                          ${lis}
                                
                        </div>

                             
                    </div>
                </div>
        
                </div>`;

        }).join("");
        $(".section6 .center").append(se6_s);

        var sec = $(".se6_right ").length;
        for (var i = 0; i < sec; i++) {

            $(".se6_right ").eq(i).find(".shops").eq(0).css("display", "block");
            $(".se6_right ").eq(i).find(".tab ul li").eq(0).css("background", "red")

        }

        $(".tab ul li").mouseenter(function () {

            $(this).css("background", "red").siblings().css("background", "none")
            // console.log($(this).parents(".tab").siblings().children().eq($(this).index()))
            $(this).parents(".tab").siblings().children().eq($(this).index()).css("display", "block").siblings().css("display", "none")
        })


        //做se_6的轮播图
        // var imgNum = $(".loop_border").eq(0).children().length;
        // var ins = 0;
        // setInterval(function () {
        //     $(".loop_border").css("left", `${ins}`)
        //     ins += -360;
        //     if (ins == imgNum * -360) {
        //         ins = 0;

        //     } 
        // }, 2000)


        var imgNum = $(".loop_border").eq(0).children().length;
        var ins = 0;
        var flag = true;
        setInterval(function () {
            // $(".loop_border").css("left", `${ins}`)
            $(".loop_border").css({ left: `${ins}`, transition: "all 1s" })
            if (flag) {
                ins += -360;
                if (ins == (imgNum - 1) * -360) {
                    flag = false;

                }
            } else {
                ins += 360;
                if (ins == 0) {
                    flag = true;
                }
            }

        }, 3000)



    }

    //商品事件
    shopEvent() {
        //点击商品对详情页发送数据
        $(".shops li").click(function () {
            // console.log($(this).children())
            //获取图片路径
            var imgAddress = $(this).children("img").attr("src");

            //获取商品信息
            var shopinformation = $(this).children("p").text();
            var prices = $.trim($(this).find("span").eq(0).text().slice(1));
            var prices2 = $.trim($(this).find("span").eq(1).text().slice(1));
            // var iconImgs = $(this).find("i").text().split(",");
            var iconImgs = $(this).find("i").text();
            var selcs = $(this).find("h3").text();
            var act = $(this).find("h5").text();
            var id = $(this).find("h6").text();
            // console.log(act)
            //拼接成查询字符串
            var str = `id=${id}&imgAddress=${imgAddress}&shopinformation=${shopinformation}&prices=${prices}&prices2=${prices2}&iconImg=${iconImgs}&selects=${selcs}&act=${act}`;

            // console.log(imgAddress, shopinformation, prices, prices2)
            window.open(`http://127.0.0.1/project/%e4%ba%8c%e9%98%b6%e6%ae%b5%e9%a1%b9%e7%9b%ae/%e5%95%86%e5%93%81%e8%af%a6%e6%83%85%e9%a1%b5/page.html?${str}`);
        })
    }





    init() {
        this.section2();
        this.section3();
        this.section4();
        this.section5();
        this.section6();
        this.shopEvent();


    }
}




//商品列表页   点击分类列表，获取对应的字段，传给第二个页面(由第二个页面发请求，再渲染)
$(function () {
    $(".se3_box .img_left ul").on("click", "li", function () {
        var className = $(this).text();
        var str = `className=${className}`;
        window.open(`http://127.0.0.1/project/%e4%ba%8c%e9%98%b6%e6%ae%b5%e9%a1%b9%e7%9b%ae/%e5%95%86%e5%93%81%e5%88%97%e8%a1%a8%e9%a1%b5/shopslist.html?${str}`);
    })

})




