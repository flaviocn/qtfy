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

    $.get("/api/v1_0/theatrical_film", {"id": id}, function (resp) {
        if (resp.errno == 0) {
            // 前端内容填充
            // $(".w3l-inner-h-title").html(resp.film.name)
            // $(".w3ls_head_para").html(resp.film.name)
            $(".fexi_header").html(resp.film.name)
            $("#profile").html(resp.film.profile)
            $("#premiere").html(resp.film.premiere)
            $("#actor").html(resp.film.actor)

            // 评分
            var $i = $(".fexi_header_para1").find("i")
            if (resp.film.score >= 10) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star")
                $i.eq(3).attr("class", "fa fa-star")
                $i.eq(4).attr("class", "fa fa-star")
            } else if (resp.film.score >= 9) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star")
                $i.eq(3).attr("class", "fa fa-star")
                $i.eq(4).attr("class", "fa fa-star-half-o")
            } else if (resp.film.score >= 8) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star")
                $i.eq(3).attr("class", "fa fa-star")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.film.score >= 7) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star")
                $i.eq(3).attr("class", "fa fa-star-half-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.film.score >= 6) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.film.score >= 5) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star-half-o")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.film.score >= 4) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star")
                $i.eq(2).attr("class", "fa fa-star-o")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.film.score >= 3) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star-half-o")
                $i.eq(2).attr("class", "fa fa-star-o")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.film.score >= 2) {
                $i.eq(0).attr("class", "fa fa-star")
                $i.eq(1).attr("class", "fa fa-star-o")
                $i.eq(2).attr("class", "fa fa-star-o")
                $i.eq(3).attr("class", "fa fa-star-o")
                $i.eq(4).attr("class", "fa fa-star-o")
            } else if (resp.film.score >= 1) {
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

    $.get("/api/v1_0/theatrical_film_list", function (resp) {
        if (resp.errno == 0) {
            //前端页面填充N个div
            var html = $(".w3ls-recent-grids").html()
            for (i = 1; i < resp.films.length; i++) {
                $(".w3ls-recent-grids").append(html)
            }
            $.each(resp.films, function (index, element) {
                $(".w3l-recent-grid").eq(index).find("a").attr("href", "theatrical_film.html?id=" + element.id);
                $(".w3l-recent-grid").eq(index).find("img.film").attr("src", element.default_image);
                $(".w3l-recent-grid").eq(index).find("a.film").html(element.name);
                $(".w3l-recent-grid").eq(index).find("p.film").html(element.profile);
                $(".w3l-recent-grid").eq(index).find("li.film").html(element.premiere);
            })
        } else {
            alert(resp.errmsg);
        }
    })
})

