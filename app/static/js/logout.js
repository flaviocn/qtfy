/**
 * Created by zhulingyun on 2017/12/11.
 */

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

$(function () {
    $("#logout").click(function () {
        $.ajax({
            url: "/api/v1_0/sessions",
            type: "delete",
            headers: {
                "X-CSRFToken": getCookie("csrf_token")
            },
            dataType: "json",
            success: function (resp) {
                if (resp.errno == 0) {
                    location.href = "/";
                }
            }
        });
    })
})
