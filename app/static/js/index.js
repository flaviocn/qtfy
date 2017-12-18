/**
 * Created by zhulingyun on 2017/12/13.
 */

$(function () {
    // 获取院线电影信息
    $.get("/api/v1_0/theatrical_film_list", function (resp) {
    if (resp.errno == 0) {
        //前端页面填充N个div
        var html = $("#owl-demo").html()
        for (i = 1; i < resp.films.length; i++) {
            $("#owl-demo").append(html)
        }
        $.each(resp.films, function (index, element) {
            $("#owl-demo .item").eq(index).find("a").attr("href", "theatrical_film.html?id=" + element.id);
            $("#owl-demo .item").eq(index).find("img.film").attr("src", element.default_image);
            $("#owl-demo .item").eq(index).find("a.film").html(element.name);
            $("#owl-demo .item").eq(index).find("p.film").html(element.premiere);
            //评分
            var $lis = $("#owl-demo .item").eq(index).find("ul.w3l-ratings li")
            if (element.score >= 10) {
                $lis.eq(0).find('i').attr("class", "fa fa-star")
                $lis.eq(1).find('i').attr("class", "fa fa-star")
                $lis.eq(2).find('i').attr("class", "fa fa-star")
                $lis.eq(3).find('i').attr("class", "fa fa-star")
                $lis.eq(4).find('i').attr("class", "fa fa-star")
            } else if (element.score >= 9) {
                $lis.eq(0).find('i').attr("class", "fa fa-star")
                $lis.eq(1).find('i').attr("class", "fa fa-star")
                $lis.eq(2).find('i').attr("class", "fa fa-star")
                $lis.eq(3).find('i').attr("class", "fa fa-star")
                $lis.eq(4).find('i').attr("class", "fa fa-star-half-o")
            } else if (element.score >= 8) {
                $lis.eq(0).find('i').attr("class", "fa fa-star")
                $lis.eq(1).find('i').attr("class", "fa fa-star")
                $lis.eq(2).find('i').attr("class", "fa fa-star")
                $lis.eq(3).find('i').attr("class", "fa fa-star")
                $lis.eq(4).find('i').attr("class", "fa fa-star-o")
            } else if (element.score >= 7) {
                $lis.eq(0).find('i').attr("class", "fa fa-star")
                $lis.eq(1).find('i').attr("class", "fa fa-star")
                $lis.eq(2).find('i').attr("class", "fa fa-star")
                $lis.eq(3).find('i').attr("class", "fa fa-star-half-o")
                $lis.eq(4).find('i').attr("class", "fa fa-star-o")
            } else if (element.score >= 6) {
                $lis.eq(0).find('i').attr("class", "fa fa-star")
                $lis.eq(1).find('i').attr("class", "fa fa-star")
                $lis.eq(2).find('i').attr("class", "fa fa-star")
                $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                $lis.eq(4).find('i').attr("class", "fa fa-star-o")
            } else if (element.score >= 5) {
                $lis.eq(0).find('i').attr("class", "fa fa-star")
                $lis.eq(1).find('i').attr("class", "fa fa-star")
                $lis.eq(2).find('i').attr("class", "fa fa-star-half-o")
                $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                $lis.eq(4).find('i').attr("class", "fa fa-star-o")
            } else if (element.score >= 4) {
                $lis.eq(0).find('i').attr("class", "fa fa-star")
                $lis.eq(1).find('i').attr("class", "fa fa-star")
                $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                $lis.eq(4).find('i').attr("class", "fa fa-star-o")
            } else if (element.score >= 3) {
                $lis.eq(0).find('i').attr("class", "fa fa-star")
                $lis.eq(1).find('i').attr("class", "fa fa-star-half-o")
                $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                $lis.eq(4).find('i').attr("class", "fa fa-star-o")
            } else if (element.score >= 2) {
                $lis.eq(0).find('i').attr("class", "fa fa-star")
                $lis.eq(1).find('i').attr("class", "fa fa-star-o")
                $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                $lis.eq(4).find('i').attr("class", "fa fa-star-o")
            } else if (element.score >= 1) {
                $lis.eq(0).find('i').attr("class", "fa fa-star-half-o")
                $lis.eq(1).find('i').attr("class", "fa fa-star-o")
                $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                $lis.eq(4).find('i').attr("class", "fa fa-star-o")
            } else {
                $lis.eq(0).find('i').attr("class", "fa fa-star-o")
                $lis.eq(1).find('i').attr("class", "fa fa-star-o")
                $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                $lis.eq(4).find('i').attr("class", "fa fa-star-o")
            }
        })
    } else {
        alert(resp.errmsg);
    }
})

    // 获取电视剧信息
    $.get("/api/v1_0/tvshow_list", function (resp) {
        if (resp.errno == 0) {
            var html = $(".tvshow").html()
            // 前端内容填充
            $(".tvshow").empty()
            for (i = 0; i < resp.tvs.length; i++) {
                $(".tvshow").append(html)
            }

            $.each(resp.tvs, function (index, element) {
                $(".tvshow .requested-movies").eq(index).find("a").attr("href", "tvshow.html?id=" + element.id)
                $(".tvshow .requested-movies").eq(index).find("img.tv").attr("src", element.default_image)
                $(".tvshow .requested-movies").eq(index).find("a.tv").html(element.name)
                $(".tvshow .requested-movies").eq(index).find("p.tv").html(element.premiere)

                //评分
                var $lis = $(".tvshow .w3l-ratings").eq(index).find("li")
                if (element.score >= 10) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star")
                    $lis.eq(3).find('i').attr("class", "fa fa-star")
                    $lis.eq(4).find('i').attr("class", "fa fa-star")
                } else if (element.score >= 9) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star")
                    $lis.eq(3).find('i').attr("class", "fa fa-star")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-half-o")
                } else if (element.score >= 8) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star")
                    $lis.eq(3).find('i').attr("class", "fa fa-star")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 7) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-half-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 6) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 5) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-half-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 4) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 3) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star-half-o")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 2) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 1) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star-half-o")
                    $lis.eq(1).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else {
                    $lis.eq(0).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(1).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                }
            })
        } else {
            alert(resp.errmsg);
        }
    })

    // 获取综艺信息
    $.get("/api/v1_0/variety_list", function (resp) {
        if (resp.errno == 0) {
            var html = $(".variety").html()
            // 前端内容填充
            $(".variety").empty()
            for (i = 0; i < resp.varietys.length; i++) {
                $(".variety").append(html)
            }

            $.each(resp.varietys, function (index, element) {
                $(".variety .requested-movies").eq(index).find("a").attr("href", "tvshow.html?id=" + element.id)
                $(".variety .requested-movies").eq(index).find("img.varietys").attr("src", element.default_image)
                $(".variety .requested-movies").eq(index).find("a.varietys").html(element.name)
                $(".variety .requested-movies").eq(index).find("p.varietys").html(element.premiere)

                //评分
                var $lis = $(".variety .w3l-ratings").eq(index).find("li")
                if (element.score >= 10) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star")
                    $lis.eq(3).find('i').attr("class", "fa fa-star")
                    $lis.eq(4).find('i').attr("class", "fa fa-star")
                } else if (element.score >= 9) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star")
                    $lis.eq(3).find('i').attr("class", "fa fa-star")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-half-o")
                } else if (element.score >= 8) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star")
                    $lis.eq(3).find('i').attr("class", "fa fa-star")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 7) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-half-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 6) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 5) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-half-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 4) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 3) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star-half-o")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 2) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star")
                    $lis.eq(1).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else if (element.score >= 1) {
                    $lis.eq(0).find('i').attr("class", "fa fa-star-half-o")
                    $lis.eq(1).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                } else {
                    $lis.eq(0).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(1).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(2).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(3).find('i').attr("class", "fa fa-star-o")
                    $lis.eq(4).find('i').attr("class", "fa fa-star-o")
                }
            })
        } else {
            alert(resp.errmsg);
        }
    })
})
