/**
 * Created by zhulingyun on 2018/1/5.
 */

function getCookie(name) {
    // 根据name提取对应的cookie值
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

// 解析提取url中的查询字符串参数
function decodeQuery() {
    var search = decodeURI(document.location.search);
    return search.replace(/(^\?)/, '').split('&').reduce(function (result, item) {
        values = item.split('=');
        result[values[0]] = values[1];
        return result;
    }, {});
}

$(function () {
    // 获取详情页面要展示的电影id
    var queryData = decodeQuery();
    var id = queryData["id"];

    $.get("/api/v1_0/new", {"id": id}, function (resp) {
        if (resp.errno == 0) {
            // 前端内容填充
            $(".img-responsive").attr('src', resp.new.default_image)
            $(".w3l-inner-h-title").html(resp.new.title)
            $(".video_agile_player").find('p').html(resp.new.content)
        }
        else {
            alert(resp.errmsg);
        }
    })
})
