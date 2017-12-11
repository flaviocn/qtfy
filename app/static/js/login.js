/**
 * Created by zhulingyun on 2017/12/11.
 */

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

$(function () {
    $("#login").submit(function(e){
        e.preventDefault();
        email = $("#l_email").val();
        password = $("#l_password").val();

        // 将表单的数据存放到对象data中
        var data = {
            email: email,
            password: password
        };
        // 将data转为json字符串
        var jsonData = JSON.stringify(data);
        $.ajax({
            url:"/api/v1_0/sessions",
            type:"post",
            data: jsonData,
            contentType: "application/json",
            dataType: "json",
            headers:{
                "X-CSRFToken":getCookie("csrf_token"),
            },
            success: function (data) {
                if (data.errno == 0) {
                    // 登录成功，跳转到主页
                    location.href = "/";
                    return;
                }
                else {
                    // 其他错误信息，在页面中展示
                    alert(data.errmsg)
                    return;
                }
            }
        });
    });
})
