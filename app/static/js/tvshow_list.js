/**
 * Created by zhulingyun on 2017/12/12.
 */

// 解析提取url中的查询字符串参数
// function decodeQuery() {
//     var search = decodeURI(document.location.search);
//     return search.replace(/(^\?)/, '').split('&').reduce(function (result, item) {
//         values = item.split('=');
//         result[values[0]] = values[1];
//         return result;
//     }, {});
// }

var html = ""

function get_content(type) {
    // 获取电视剧信息
    $.get("/api/v1_0/tvshow_list",{"type":type} , function (resp) {
        if (resp.errno == 0) {
            // 前端内容填充
            $("#tv_demo").empty()
            for (i = 0; i < resp.tvs.length; i++) {
                $("#tv_demo").append(html)
            }

            $.each(resp.tvs, function (index, element) {
                $(".requested-movies").eq(index).find("img.tv").attr("src", element.default_image)
                $(".requested-movies").eq(index).find("a.tv").html(element.name)
                $(".requested-movies").eq(index).find("p.tv").html(element.premiere)

                //评分
                var $lis = $(".w3l-ratings").eq(index).find("li")
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
}

$(function () {
    html = $("#tv_demo").html()
    get_content(0);
})


