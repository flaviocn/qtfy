/**
 * Created by zhulingyun on 2018/1/5.
 */

$(function () {

    var html = $("#news").html()

    // 新闻列表信息
    $.get("/api/v1_0/news_list", function (resp) {
        if (resp.errno == 0) {
            // 前端内容填充
            $("#news").empty()

            for (i = 0; i < resp.news.length; i++) {
                $("#news").append(html)
                $("#news").append('<br>')
            }

            $.each(resp.news, function (index, element) {
                $(".w3-agileits-news-one").eq(index).find("img").attr("src", element.default_image);
                $(".w3-agileits-news-one").eq(index).find("h5 a").html(element.title);
                $(".w3-agileits-news-one").eq(index).find("p").html(element.profile);
                $(".w3-agileits-news-one").eq(index).find("a").attr("href", 'new.html?id=' + element.id);
            })

        } else {
            alert(resp.errmsg);
        }
    })
})
