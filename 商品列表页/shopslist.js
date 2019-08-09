

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

    //根据数据库内容渲染页面
    //(首页点击列表，传个类别过来，再发网络请求)
    section3() {
        //取传过来的类别
        var str = window.location.search.slice(1);
        str = decodeURIComponent(str);
        // console.log(str);//className=成人用品 

        $.ajax({
            type: "post",
            url: "./数据/indexClass.php",
            dataType: "json",
            data: `${str}&page=0`,
            success: function (response) {
                var s_li = response.map(ele => {
                    // console.log(ele)
                    return `<li data-goodsid=${ele.goodsId}>
                                        <div class="imgBox" >
                                            <img src="${ele.img}" alt="">
    
                                        </div>
                                        <p>¥${ele.prices}</p>
                                        <div class="font_box">${ele.shopname}</div>
                                        <div class="li_floorBox clearfix">
                                            <span>-</span>
                                            <input type="text" value="1">
                                            <span>+</span>
                                            <a>加入购物车</a>
                                        </div>
                                </li>`;
                }).join("");
                $(".s_box ul").append(s_li);


            }

        })

        //设发网络请求查该类别数据，渲染页数

        $.ajax({
            type: "post",
            url: "./数据/pageBox.php",
            data: str,
            dataType: "json",
            success: function (respon) {
                var pageBox = Math.ceil(respon.length / 8);//取应该渲染页数
                var res = ``;
                for (var i = 0; i < pageBox; i++) {
                    res += ` <li>${i + 1}</li>`
                }
                $(".pageBox ul").append(res);
                $(".pageBox ul li").eq(0).css("border", "1px solid blue");
            }
        })

    }




    init() {
        this.section2();
        this.section3();

    }
}



$(function () {


    //升降序功能
    $(".shops .topTab ul").on("click", "li", function () {
        var ind = $(this).index();
        //获取商品类别
        var str = window.location.search.slice(1);
        str = decodeURIComponent(str);

        if (ind == 2) {
            $.ajax({
                type: "post",
                url: "./数据/dataUp.php",
                data: str,
                dataType: "json",
                success: function (response1) {
                    label(response1);
                }
            })
        } else if (ind == 1) {
            $.ajax({
                type: "post",
                url: "./数据/dataLow.php",
                data: str,
                dataType: "json",
                success: function (response1) {
                    label(response1);
                }
            })
        } else {
            $.ajax({
                type: "post",
                url: "./数据/indexClass.php",
                data: `${str}&page=0`,
                dataType: "json",
                success: function (response1) {
                    label(response1);
                }
            })
        }
    })

    //页面切换功能
    $(".pageBox ul").on("click", "li", function () {
        console.log($(this).index());
        $(this).css("border", "1px solid blue").siblings().css("border", "1px solid black");
        var str = window.location.search.slice(1);
        str = decodeURIComponent(str);
        $.ajax({
            type: "post",
            url: "./数据/indexClass.php",
            data: `${str}&page=${$(this).index()}`,
            dataType: "json",
            success: function (response) {
                label(response);
            }

        })
    })

    //跳转购物车页面
    // console.log($(this).parents("li").data("goodsid")) 大坑，页面的属性只能用小写，设置时要注意，否则坑死你
    $(".s_box ").on("click", "a", function () {
        console.log($(this).parents("li").data("goodsid"));//拿goodid去数据库查，然后插入到购物车的数据表
    })




    //定义渲染方法
    function label(o) {
        var s_li = o.map(ele => {
            // console.log(ele)
            return `<li>
                                <div class="imgBox">
                                    <img src="${ele.img}" alt="">

                                </div>
                                <p>¥${ele.prices}</p>
                                <div class="font_box">${ele.shopname}</div>
                                <div class="li_floorBox clearfix">
                                    <span>-</span>
                                    <input type="text" value=1>
                                    <span>+</span>
                                    <a>加入购物车</a>
                                </div>
                        </li>`;
        }).join("");
        $(".s_box ul").html(s_li);
    }

})




