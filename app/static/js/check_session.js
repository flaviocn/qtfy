/**
 * Created by zhulingyun on 2017/12/11.
 */

// 检查用户的登录状态
$.get("/api/v1_0/sessions", function(resp) {
    if (resp.errno == 0) {
        // 表示用户是登录
        $("#username").html('<i class="fa fa-user" aria-hidden="true"></i>' + resp.data.username)
        $("#email").html('<i class="fa fa-envelope" aria-hidden="true"></i>' + resp.data.email)
        $("#has_login").show()
        $("#not_login").hide()
    } else {
        // 表示用户未登录
        $("#not_login").show()
        $("#has_login").hide()
    }
}, "json");
