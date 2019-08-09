$(function () {




    $("input").focus(function () {
        $(this).css("boxShadow", "0px 0px 1px 1px blue inset")

    });

    $("input").blur(function () {
        $(this).css("boxShadow", "none");

    });


    var flag1 = flag2 = flag3 = flag4 = flag5 = flag6 = false;


    //第一个输入框
    $(".username input").focus(function () {
        $(".username input").siblings("div").text("4-20位字符、支持汉字、字母、数字及“-”“_”组合")
        // $(".username input").siblings("div").css("display", "block")
        $(".username input").siblings("div").css({ display: "block", color: "blue", border: "1px solid blue" })
    })



    var nameReg = /^[a-zA-Z0-9]{4,12}$/
    $(".username input").blur(function () {
        var name = $(this).val();
        $(this).siblings("div").css({ display: "none", color: "red", border: "1px solid red" })

        if (name.length == 0) {
            $(".username input").siblings("div").text("用户名不能为空")
            $(".username input").siblings("div").css("display", "block")
            $(this).css("boxShadow", "0px 0px 1px 1px red inset")
            flag1 = false;
        } else if (nameReg.test(name) == false) {
            $(".username input").siblings("div").text("长度不能小于4位数！")
            $(".username input").siblings("div").css("display", "block")
            $(this).css("boxShadow", "0px 0px 1px 1px red inset")
            flag1 = false;
        } else {
            flag1 = true;
            $(".username input").siblings("div").css("display", "none")
            $(this).css("boxShadow", "none")

        }

    })




    //第二个密码框
    $(".psw input").focus(function () {
        $(".psw input").siblings("div").text("6-20位字符，必须由字母、数字、和符号两种以上组合")
        $(".psw input").siblings("div").css({ display: "block", color: "blue", border: "1px solid blue" })
    })


    var pswReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[\w-+&%]{6,20}$/    //(?![0-9]+$)(?![a-zA-Z]+$)匹配后面是否全为数字或字母  
    $(".psw input").blur(function () {
        var password = $(this).val();
        $(this).siblings("div").css({ display: "none", color: "red", border: "1px solid red" })

        if (password.length == 0) {
            $(this).siblings("div").text("密码不能为空")
            $(this).siblings("div").css("display", "block")
            $(this).css("boxShadow", "0px 0px 1px 1px red inset")
            flag2 = false;
        } else if (pswReg.test(password) == false) {
            $(this).siblings("div").text("密码格式不正确！")

            $(this).siblings("div").css("display", "block");
            $(this).css("boxShadow", "0px 0px 1px 1px red inset")
            flag2 = false;
        } else {
            flag2 = true;
            $(this).siblings("div").css("display", "none")
            $(this).css("boxShadow", "none")

        }
    })


    //判断两个密码是否相同

    $(".psw2 input").focus(function () {
        $(this).siblings("div").text("再次验证输入的密码")
        $(this).siblings("div").css({ display: "block", color: "blue", border: "1px solid blue" })
    })


    $(".psw2 input").blur(function () {
        var password2 = $(this).val();
        if (password2.length == 0) {
            console.log("等于0")
            $(this).siblings("div").text("密码不能为空")
            $(this).css("boxShadow", "0px 0px 1px 1px red inset");
            $(this).siblings("div").css({ display: "block", color: "red", border: "1px solid red" })
            flag3 = false;
        } else if (password2 != $(".psw input").val()) {
            $(this).siblings("div").text("密码不匹配！")
            flag3 = false;
            $(this).siblings("div").css({ display: "block", color: "red", border: "1px solid red" })

            $(this).css("boxShadow", "0px 0px 1px 1px red inset")
        } else {
            flag3 = true;
            $(this).siblings("div").css("display", "none")
            $(this).css("boxShadow", "none")
        }
    })


    //验证手机号
    $(".phone input").focus(function () {
        $(this).siblings("div").text("请输入手机号")
        $(this).siblings("div").css({ display: "block", color: "blue", border: "1px solid blue" })
    })


    var phoneReg = /^1[3-9][0-9]{9}$/;

    $(".phone input").blur(function () {
        var phoneNum = $(this).val();
        $(this).siblings("div").css({ display: "none", color: "red", border: "1px solid red" })

        if (phoneNum.length == 0) {
            $(this).siblings("div").text("手机号不能为空")
            $(this).siblings("div").css("display", "block")
            $(this).css("boxShadow", "0px 0px 1px 1px red inset")
            flag4 = false;
        } else if (phoneReg.test(phoneNum) == false) {
            $(this).siblings("div").text("手机号输入有误！")

            $(this).siblings("div").css("display", "block");
            $(this).css("boxShadow", "0px 0px 1px 1px red inset")
            flag4 = false;

        } else {
            flag4 = true;
            $(this).siblings("div").css("display", "none")
            $(this).css("boxShadow", "none")

        }
    })


    // 图形验证码
    var imgCode = 0;

    cod();
    $(".codeBox a").click(function () {
        cod();

    })
    function cod() {
        let captcha1 = new Captcha();
        captcha1.draw(document.querySelector('#captcha1'), r => {
            imgCode = r;
            // console.log(r, '验证码1');
            $(".codeBox input").trigger("blur");
        });
    };



    $(".codeBox input").focus(function () {
        $(this).siblings(".tips").text("请输入验证码(不区分大小写)")
        $(this).siblings(".tips").css({ display: "block", color: "blue", border: "1px solid blue" })
    })

    $(".codeBox input").blur(function () {
        var imgCodeText = $(this).val();
        if (imgCodeText.length == 0) {
            $(this).siblings(".tips").text("验证码不能为空")
            $(this).css("boxShadow", "0px 0px 1px 1px red inset");
            $(this).siblings(".tips").css({ display: "block", color: "red", border: "1px solid red" })
            flag5 = false;
        } else if (imgCodeText.toLowerCase() != imgCode.toLowerCase()) {
            $(this).siblings(".tips").text("验证码输入有误！")

            $(this).siblings(".tips").css({ display: "block", color: "red", border: "1px solid red" })

            $(this).css("boxShadow", "0px 0px 1px 1px red inset")
            flag5 = false;
        } else {
            flag5 = true;
            $(this).siblings(".tips").css("display", "none")
            $(this).css("boxShadow", "none")
        }
    })


    //手机验证码  (暂时未作发短信功能)
    $(".phoneCode .getButton").click(function () {
        var count = 5;
        var timer = setInterval(() => {
            count--;

            $(this).text(`${count}`)
            if (count == 0) {
                $(this).text("获取验证码")
                clearInterval(timer);
            }
        }, 1000)
    });


    //监听"立即注册"按钮
    $(".regButton").click(function () {
        //首先判断是否勾选复选框
        var c_flag = $(".check input").is(":checked");
        if (c_flag == true) {
            if (flag1 == true && flag2 == true && flag3 == true && flag4 == true && flag5 == true) {

                var datas = $("form").eq(0).serialize();

                $.ajax({
                    type: "post",
                    url: "./数据/reg.php",
                    data: datas,
                    dataType: "json",
                    success: function (response) {
                        if (response.status == "success") {
                            confirm("注册成功!返回登录界面");
                            window.location.href = "http://127.0.0.1/project/%E4%BA%8C%E9%98%B6%E6%AE%B5%E9%A1%B9%E7%9B%AE/login/log.html";
                            // confirm() 
                        } else {
                            alert("用户名已被注册!");
                        }
                    }

                })

            } else {
                alert("页面内容输入有误!")
                console.log("格式有误")
            }

        } else {
            alert("请阅读协议，并同意");
        }


        // console.log(flag1, flag2, flag3, flag4, flag5)
    })

    // var data = new FormData($(".box")[0]);


})//这个括号是监听页面加载的