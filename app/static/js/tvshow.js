/**
 * Created by zhulingyun on 2017/12/12.
 */

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
    var num = queryData["num"];

    // 获取电视剧信息
    $.get("/api/v1_0/tvshow", {"id": id, "num":num}, function (resp) {
        if (resp.errno == 0) {
            // 前端内容填充
            $("video").attr("src", resp.tv_url)
            $(".fexi_header").html(resp.tv.name)
            $("#profile").html(resp.tv.profile)
            $("#premiere").html(resp.tv.premiere)
            $("#actor").html(resp.tv.actor)

            // 电视剧集数列表
            var html = $(".blog-pagenat-wthree ul").html()
            var cur_html = $('<li><a style="color: #02cba9" href="#">1</a></li>')
            $(".blog-pagenat-wthree ul").empty()
            for (var i = 1;i <= resp.tv_nums.length; i++){
                if (i == resp.tv_num){
                    $(".blog-pagenat-wthree ul").append(cur_html)
                } else{
                    $(".blog-pagenat-wthree ul").append(html)
                }
            }

            $lis = $(".blog-pagenat-wthree ul li")
            $.each(resp.tv_nums, function (index, element) {
                $lis.eq(index).find("a").html(element)
                $lis.eq(index).find("a").attr("href", "tvshow.html?id="+id+"&num="+element)
            })

            // 评分
            var $i = $(".fexi_header_para1").find("i")
            if (resp.tv.score >= 10) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star")
                $i.eq(3).attr("class", "fa fa-star")
                $i.eq(4).attr("class", "fa fa-star")
            } else if (resp.tv.score >= 9) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star")
                $i.eq(3).attr("class", "fa fa-star")
                $i.eq(4).attr("class", "fa fa-star-half-o")
            } else if (resp.tv.score >= 8) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star")
                $i.eq(3).attr("class", "fa fa-star")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.tv.score >= 7) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star")
                $i.eq(3).attr("class", "fa fa-star-half-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.tv.score >= 6) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.tv.score >= 5) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star-half-o")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.tv.score >= 4) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star-o")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.tv.score >= 3) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star-half-o")
                $i.eq(2).attr("class", "fa fa-star-o")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.tv.score >= 2) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star-o")
                $i.eq(2).attr("class", "fa fa-star-o")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.tv.score >= 1) {
                $i.eq(0).attr("class", "fa fa-star-half-o")
                $i.eq(1).attr("class", "fa fa-star-o")
                $i.eq(2).attr("class", "fa fa-star-o")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else {
                $i.eq(0).attr("class", "fa fa-star-o")
                $i.eq(1).attr("class", "fa fa-star-o")
                $i.eq(2).attr("class", "fa fa-star-o")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            }
        }
        else {
            alert(resp.errmsg);
        }
    })

    // 获取院线电影列表信息
    // $.get("/api/v1_0/theatrical_film_list", function (resp) {
    //     if (resp.errno == 0) {
    //         //前端页面填充N个div
    //         var html = $(".w3ls-recent-grids").html()
    //         for (i = 1; i < resp.films.length; i++) {
    //             $(".w3ls-recent-grids").append(html)
    //         }
    //         $.each(resp.films, function (index, element) {
    //             $(".w3l-recent-grid").eq(index).find("a").attr("href", "theatrical_film.html?id=" + element.id);
    //             $(".w3l-recent-grid").eq(index).find("img.film").attr("src", element.default_image);
    //             $(".w3l-recent-grid").eq(index).find("a.film").html(element.name);
    //             $(".w3l-recent-grid").eq(index).find("p.film").html(element.profile);
    //             $(".w3l-recent-grid").eq(index).find("li.film").html(element.premiere);
    //         })
    //     } else {
    //         alert(resp.errmsg);
    //     }
    // })

    // 获取电视剧评论信息
    // $.get("/api/v1_0/theatrical_film_comments", {"id": id}, function (resp) {
    //     if (resp.errno == 0) {
    //         //前端页面填充N个div
    //         var html = $("#comments").html()
    //         for (i = 1; i < resp.comments.length; i++) {
    //             $("#comments").append(html)
    //         }
    //
    //         // 前端内容填充
    //         $.each(resp.comments, function (index, element) {
    //             $(".response-info").eq(index).find("h6").html(element.user_name)
    //             $(".response-info").eq(index).find("p").html(element.comment)
    //             $(".response-info").eq(index).find("li").html(element.date_time)
    //         })
    //     } else {
    //         alert(resp.errmsg)
    //     }
    // })

    // 提交评论
    // $("#resp").submit(function (e) {
    //     // 阻止表单的默认行为
    //     e.preventDefault();
    //
    //     var comment = $("#comment").val()
    //     $.post("/api/v1_0/theatrical_film_comments", {"id": id, "comment": comment}, function (resp) {
    //         if (resp.errno == 0) {
    //             location.reload()
    //         } else {
    //             alert(resp.errmsg)
    //         }
    //     })
    // })
})

