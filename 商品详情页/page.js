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

    section3() {
        //默认文本框为1
        $(".Num input").val(1);
        //给数量标签添加功能
        //加1功能
        $(".Num .but h4").eq(0).click(function () {
            var text = Number($(".Num input").val()) + 1;
            $(".Num input").val(text);
        });
        //减1功能
        $(".Num .but h4").eq(1).click(function () {
            var text = Number($(".Num input").val()) - 1;
            if (text == 0) {
                return;
            } else {
                $(".Num input").val(text);
            }
        })


        //设置套餐选择点击

        $(".select ul li").eq(0).css("box-shadow", "0px 0px 1px 3px blue inset")
        $(".select ul li").click(function () {
            $(this).css("box-shadow", "0px 0px 1px 3px blue inset").siblings().css("box-shadow", "none");

        })


        //为下图片添加事件
        $(".min_img li").mouseenter(function () {
            $(".min_img li").eq($(this).index()).css("border", "1px solid blue").siblings().css("border", "none");
        })
        //点击小图片更换上面大图片

        $(".min_img li").click(function () {
            var Imgaddress = $(".min_img li").eq($(this).index()).children().attr("src");//点击图片src地址
            $(".img_box img").attr("src", Imgaddress)//更换图片src
        })

    }

    //获取查询字符串
    datas() {
        var str = window.location.search.slice(1);
        str = decodeURIComponent(str);
        var arr = str.split("&");

        var obj = {};
        arr.forEach(ele => {
            var arr2 = ele.split("=");
            obj[arr2[0]] = arr2[1];
        })

        var act = obj.act;
        // console.log(act)
        //动态渲染套餐选择
        var ses = obj.selects.split(",");
        var sess = ses.map((ess, i) => {
            return ` <li>${ess}</li>`;
        }).join("");
        $(".select ul").append(sess);
        //取iconImg处理  动态生成小图片
        var iarr = obj.iconImg.split(",");

        var ics = iarr.map((es, i) => {
            return ` <li><img src="${es}" alt=""></li>`;
        }).join("");
        // console.log(icon)

        //通过obj对象渲染下面页面 (右边文字信息)
        var tis = `<p>${obj.shopinformation}</p>
            <h3>${act}</h3>
            <div class="prices">
                <span>金象价:</span>
                <span style="font-size:25px;font-weight:bold;color:red;">¥${obj.prices}</span>
                <span>市场价:</span>
                <span style="text-decoration: line-through">¥${obj.prices2}</span>
                <span>（为您节省¥${obj.prices2 - obj.prices}）</span>
                <span>折扣：${((obj.prices / obj.prices2) * 10).toFixed(1)}折</span>
            </div>`;

        $(".cent").prepend(tis);

        //通过obj对象渲染下面页面 (左边图片信息)
        var imgs = ` <div class="img_box">
                         <img src="${obj.imgAddress}" alt="">
                     </div>
                     <div class="min_img ">
                         <ul class="clearfix">
                            ${ics}
                         </ul>
                     </div>`;
        $(".left").prepend(imgs);

    }


    init() {
        this.section2();
        this.datas();
        this.section3();
    }
}