
$(function () {

    

        var usernames = Cookie.getItem("username");
    
        $.ajax({
            type: "post",
            url: "./数据/111.php",
            data: `username=${usernames}`,
            dataType: "json",
            success: function (response) {
              if(response.status=="success"){
                window.location.href = "http://127.0.0.1/project/%E4%BA%8C%E9%98%B6%E6%AE%B5%E9%A1%B9%E7%9B%AE/%E9%A6%96%E9%A1%B5/";
                return;
              }
            }
        })
    


    var imgCode = 0;
    let captcha1 = new Captcha();
    captcha1.draw(document.querySelector('#captcha1'), r => {
        imgCode = r;

    });

    $(".codeTips span").click(function () {
        let captcha1 = new Captcha();
        captcha1.draw(document.querySelector('#captcha1'), r => {
            imgCode = r;
        });
    })

    //当点击登录时应该 发网络请求，核对账号和密码

    $(".but input").click(function () {
        var flag = $(".but input").is(":checked");
        if (flag == true) {
            console.log($(".but input").is(":checked"))
            var userName = $(".loginAct input").eq(0).val();
            var password = $(".loginAct input").eq(1).val();
            Cookie.setItem("username", `${userName}`, 1, '/');

            // Cookie.setItem("password",`${password}`,1,'/');
        }
    })



    $(".button").click(function () {


        var imgCodeText = $(".loginAct input").eq(2).val();

        if (imgCodeText.toLowerCase() == imgCode.toLowerCase()) {
            // var userName = $(".loginAct input").eq(0).val();
            // var password = $(".loginAct input").eq(1).val();
            var datas = $("form").eq(0).serialize();
            // console.log(datas)
            $.ajax({
                type: "post",
                url: "./数据/log.php",
                data: datas,
                dataType: "json",
                success: function (response) {
                    if (response.status == "error") {
                        alert(response.msg);
                    } else {
                        var flag = $(".but input").is(":checked");
                        if (flag == true) {
                            console.log($(".but input").is(":checked"))
                            var userName = $(".loginAct input").eq(0).val();
                            var password = $(".loginAct input").eq(1).val();
                            Cookie.setItem("username", `${userName}`, 1, '/');

                            Cookie.setItem("password", `${password}`, 1, '/');
                        }


                        alert(response.msg);
                        window.location.href = "http://127.0.0.1/project/%E4%BA%8C%E9%98%B6%E6%AE%B5%E9%A1%B9%E7%9B%AE/%E9%A6%96%E9%A1%B5/";
                    }
                }
            })

        } else {
            alert("验证码错误!");
            return;
        }

    })




})//页面监听