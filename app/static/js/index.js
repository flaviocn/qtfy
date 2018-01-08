/**
 * Created by zhulingyun on 2017/12/13.
 */

$(function () {

    // 获取电影
    $.get("/api/v1_0/movie_list", function (resp) {
        if (resp.errno == 0) {
            //前端推荐填充
            $.each(resp.movie_recommend, function (index, element) {

                if (index == 0) {
                    $('.tab1').find('.video_agile_player').find("a").attr("href", "movie.html?id=" + element.id);
                    $('.tab1').find('.video_agile_player').find("img").attr("src", element.default_image);
                    $('.tab1').find('.video_agile_player').find("p.fexi_header").html(element.name);
                    $('.tab1').find(".fexi_header").html(element.name)
                    $('.tab1').find(".profile").html(element.profile)
                    $('.tab1').find(".premiere").html(element.premiere)
                    $('.tab1').find(".actor").html(element.actor)

                    // 评分
                    var $i = $('.tab1').find(".fexi_header_para1").find("i")
                    if (element.score >= 10) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star")
                        $i.eq(4).attr("class", "fa fa-star")
                    } else if (element.score >= 9) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star")
                        $i.eq(4).attr("class", "fa fa-star-half-o")
                    } else if (element.score >= 8) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 7) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star-half-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 6) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 5) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star-half-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 4) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 3) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star-half-o")
                        $i.eq(2).attr("class", "fa fa-star-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 2) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star-o")
                        $i.eq(2).attr("class", "fa fa-star-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 1) {
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
                    return;
                }

                $('.tab1 .w3l-movie-gride-agile').eq(index-1).find("a").attr("href", "movie.html?id=" + element.id);

                $('.tab1 .w3l-movie-gride-agile').eq(index-1).find("img.movie").attr("src", element.default_image);
                $('.tab1 .w3l-movie-gride-agile').eq(index-1).find("a.movie").html(element.name);
                $('.tab1 .w3l-movie-gride-agile').eq(index-1).find("p.movie").html(element.year);

                //评分
                var $lis = $('.tab1 .w3l-movie-gride-agile').eq(index-1).find("ul.w3l-ratings li")
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

            //前端最新填充
            $.each(resp.movie_new, function (index, element) {

                if (index == 0) {
                    $('.tab2').find('.video_agile_player').find("a").attr("href", "movie.html?id=" + element.id);
                    $('.tab2').find('.video_agile_player').find("img").attr("src", element.default_image);
                    $('.tab2').find('.video_agile_player').find("p.fexi_header").html(element.name);
                    $('.tab2').find(".fexi_header").html(element.name)
                    $('.tab2').find(".profile").html(element.profile)
                    $('.tab2').find(".premiere").html(element.premiere)
                    $('.tab2').find(".actor").html(element.actor)

                    // 评分
                    var $i = $('.tab2').find(".fexi_header_para1").find("i")
                    if (element.score >= 10) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star")
                        $i.eq(4).attr("class", "fa fa-star")
                    } else if (element.score >= 9) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star")
                        $i.eq(4).attr("class", "fa fa-star-half-o")
                    } else if (element.score >= 8) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 7) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star-half-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 6) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 5) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star-half-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 4) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 3) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star-half-o")
                        $i.eq(2).attr("class", "fa fa-star-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 2) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star-o")
                        $i.eq(2).attr("class", "fa fa-star-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 1) {
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
                    return;
                }

                $('.tab2 .w3l-movie-gride-agile').eq(index-1).find("a").attr("href", "movie.html?id=" + element.id);

                $('.tab2 .w3l-movie-gride-agile').eq(index-1).find("img.movie").attr("src", element.default_image);
                $('.tab2 .w3l-movie-gride-agile').eq(index-1).find("a.movie").html(element.name);
                $('.tab2 .w3l-movie-gride-agile').eq(index-1).find("p.movie").html(element.year);

                //评分
                var $lis = $('.tab2 .w3l-movie-gride-agile').eq(index-1).find("ul.w3l-ratings li")
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

            //前端评分填充
            $.each(resp.movie_score, function (index, element) {

                if (index == 0) {
                    $('.tab3').find('.video_agile_player').find("a").attr("href", "movie.html?id=" + element.id);
                    $('.tab3').find('.video_agile_player').find("img").attr("src", element.default_image);
                    $('.tab3').find('.video_agile_player').find("p.fexi_header").html(element.name);
                    $('.tab3').find(".fexi_header").html(element.name)
                    $('.tab3').find(".profile").html(element.profile)
                    $('.tab3').find(".premiere").html(element.premiere)
                    $('.tab3').find(".actor").html(element.actor)

                    // 评分
                    var $i = $('.tab3').find(".fexi_header_para1").find("i")
                    if (element.score >= 10) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star")
                        $i.eq(4).attr("class", "fa fa-star")
                    } else if (element.score >= 9) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star")
                        $i.eq(4).attr("class", "fa fa-star-half-o")
                    } else if (element.score >= 8) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 7) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star-half-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 6) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 5) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star-half-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 4) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star")
                        $i.eq(2).attr("class", "fa fa-star-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 3) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star-half-o")
                        $i.eq(2).attr("class", "fa fa-star-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 2) {
                        $i.eq(0).attr("class", "fa fa-star")
                        $i.eq(1).attr("class", "fa fa-star-o")
                        $i.eq(2).attr("class", "fa fa-star-o")
                        $i.eq(3).attr("class", "fa fa-star-o")
                        $i.eq(4).attr("class", "fa fa-star-o")
                    } else if (element.score >= 1) {
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
                    return;
                }

                $('.tab3 .w3l-movie-gride-agile').eq(index-1).find("a").attr("href", "movie.html?id=" + element.id);

                $('.tab3 .w3l-movie-gride-agile').eq(index-1).find("img.movie").attr("src", element.default_image);
                $('.tab3 .w3l-movie-gride-agile').eq(index-1).find("a.movie").html(element.name);
                $('.tab3 .w3l-movie-gride-agile').eq(index-1).find("p.movie").html(element.year);

                //评分
                var $lis = $('.tab3 .w3l-movie-gride-agile').eq(index-1).find("ul.w3l-ratings li")
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
                $(".variety .requested-movies").eq(index).find("a").attr("href", "variety.html?id=" + element.id)
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
