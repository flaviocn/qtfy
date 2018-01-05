/**
 * Created by zhulingyun on 2018/1/5.
 */

function getCookie(name) {
    // 根据name提取对应的cookie值
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

$(function () {

    // 获取留言
    $.get("/api/v1_0/message", function (resp) {
        if (resp.errno == 0) {
            //前端页面填充N个div
            var html = $("#comments").html()
            for (i = 1; i < resp.comments.length; i++) {
                $("#comments").append(html)
            }

            // 前端内容填充
            $.each(resp.comments, function (index, element) {
                $(".response-info").eq(index).find("h6").html(element.user_name)
                $(".response-info").eq(index).find("p").html(element.comment)
                $(".response-info").eq(index).find("li").html(element.date_time)
            })
        } else {
            alert(resp.errmsg)
        }
    })

    // 提交留言
    $("#resp").submit(function (e) {
        // 阻止表单的默认行为
        e.preventDefault();

        var comment = $("#comment").val()

        // 向后端发送请求，提交用户的注册信息
        var req_data = {
            comment: comment
        };
        $.ajax({
            url: "/api/v1_0/message", // 请求路径url
            type: "post", // 请求方式
            data: req_data, // 发送的请求体数据
            dataType: "json", // 指明从后端收到的数据是json格式的
            headers: {
                "X-CSRFToken": getCookie("csrf_token")
            },  // 自定义的请求头
            success: function (resp) {
                if (resp.errno == 0) {
                    location.reload()
                } else {
                    alert(resp.errmsg)
                }
            }
        })
    })
})
