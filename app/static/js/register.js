/**
 * Created by zhulingyun on 2017/12/11.
 */

function getCookie(name) {
    // 根据name提取对应的cookie值
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

$(document).ready(function() {

    $("#r_username").blur(function () {
        var username = $("#r_username").val();
        $.get("/api/v1_0/users",{"username":username} , function (resp) {
            if (resp.errno != 0) {
                alert(resp.errmsg);
            }
        })
    })

    // 给表单添加自定义的提交行为
    $("#register").submit(function(e){
        // 阻止表单的默认行为
        e.preventDefault();

        username = $("#r_username").val();
        email = $("#r_email").val();
        password = $("#r_password").val();
        password2 = $("#r_password2").val();

        if (password != password2) {
            alert("两次密码不一致!")
            return;
        }
        if (!$('#agree').is(':checked')) {
            // do something
            alert("请同意 使用条款 和 隐私政策")
        }

        // 向后端发送请求，提交用户的注册信息
        var req_data = {
            username: username,
            email: email,
            password: password
        };
        // 将js对象转换为json字符串
        req_json = JSON.stringify(req_data);
        $.ajax({
            url: "/api/v1_0/users", // 请求路径url
            type: "post", // 请求方式
            data: req_json, // 发送的请求体数据
            contentType: "application/json",  // 指明向后端发送的是json格式数据
            dataType: "json", // 指明从后端收到的数据是json格式的
            headers: {
                "X-CSRFToken": getCookie("csrf_token")
            },  // 自定义的请求头
            success: function (resp) {
                if (resp.errno == 0) {
                    // 注册成功, 引导到主页页面
                    alert("注册成功，请前往邮箱激活账号");
                    location.href = "/";
                }else{
                    alert(resp.errmsg);
                }
            }
        })
    });
})
