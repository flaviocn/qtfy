/**
 * Created by zhulingyun on 2017/12/12.
 */

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
            $("#owl-demo .item").eq(index).find("p.film").html(element.year);
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

