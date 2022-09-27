$(function () {

    // dropdown list
    $(document).mouseup(function (e) {
        if ($(e.target).parents(".dropdown_wrap").length == 0) {
            $(".dropdown_wrap .menu_list").hide();
            $(".dropdown_wrap #popSms").hide();
        }
    });
    $(".dropdown_wrap .dropdown > a").click(function () {
        var b = $(this).parent();
        b.children(".menu_list").toggle();
        b.children(".menu_list").is(":hidden") ? $("#popSms").hide() : null;
    });

    //수신 대상 선택하기
    $(".btn_sms").on("click", function (e) {
        console.log('a');
        e.preventDefault();
        $("#popSms").show();
    })
    
    // select box (dropdown)
    $(document).mouseup(function (e) {
        if ($(e.target).parent(".select_wrap").length == 0) {
            $(".option_list").hide();
            $(".select_box > a").removeClass("active");
        }
        if ($(e.target).next().find(".scroll_bar a").length > 3) {
            $(e.target).next().find(".scroll_bar").css({
                "width": "calc(100% - 15px)",
                "padding-right": "14px"
            });
        }
        $(".select_box > a").on("click", function (e) {
            e.preventDefault();
            $(this).next().toggle();
            $(this).toggleClass("active");
            if ($(this).parent(".select_box").hasClass("disabled") === true) {
                $(".disabled").find(".option_list").css("display", "none");
                $(this).removeClass("active");
            }
        });
    });    

    // 상단 게시물 검색 - 검색창 입력시 clear button 제어
    $(".search_wrap.board input").on("input", function () {
        if ($(".search_wrap input").val() == "") {
            $(".search_wrap .btn_clear").hide();
            $(".search_wrap .btn_find").removeClass("active");
        } else {
            $(".search_wrap .btn_clear").show();
            $(".search_wrap .btn_find").addClass("active");
        }
    })
    $(".search_wrap .btn_clear").on("click", function (e) {
        e.preventDefault();
        $(".search_wrap input").val("");
        $(".search_wrap .btn_find").removeClass("active");
        $(this).hide();
    });

    // input box 옆 filter icon
    $(".search_wrap .btn_filter").on("click", function (e) {
        e.preventDefault();
        $(".filter_pop").toggle();
        $(this).toggleClass("active");
    });

    // 학교 검색 - 검색창 입력시 검색결과 제어
    $(".search_wrap.school input").on("input", function () {
        if ($(".search_wrap.school input").val() == "") {
            $(".search_wrap.school .search_school_list").hide();
            $(".search_wrap.school .btn_find").removeClass("active");
        } else {
            $(".search_wrap.school .search_school_list").show();
            $(".search_wrap.school .btn_find").addClass("active");
            if ($(".search_school_list .scroll_bar a").length > 2) {
                $(".search_school_list .scroll_bar").css({
                    "width": "calc(100% - 15px)",
                    "padding-right": "14px"
                });
            }
        }
    });

    // pin_menu_box -> 고정해제
    $(".pin_menu_box .btn_pin").on("click", function (e) {
        e.preventDefault();
        $(this).parent().remove();
    })

    // scrap on/off
    $(".btn_scrap").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("on");
    })

    // 기본 검색
    $(".search_wrap.default input").on("input", function () {
        if ($(".search_wrap.default input").val() == '') {
            $(".search_wrap.default .btn_find").removeClass("active");
        } else {
            $(".search_wrap.default .btn_find").addClass("active");
        }
    })

    // 메인 클래스, 학교 검색
    $(".main_search_wrap input").on("input", function () {
        if ($(".main_search_wrap input").val() == "") {
            $(".main_search_wrap .btn_clear").hide();
            $(".main_search_wrap .btn_find").removeClass("active");
        } else {
            $(".main_search_wrap .btn_clear").show();
            $(".main_search_wrap .btn_find").addClass("active");
        }
    })
    $(".main_search_wrap .btn_clear").on("click", function (e) {
        e.preventDefault();
        $(".main_search_wrap input").val("");
        $(".main_search_wrap .btn_find").removeClass("active");
        $(this).hide();
    });

    // 댓글창 입력시 버튼 색상 active
    $(".reply_box textarea").on("input", function () {
        if ($(this).val() == 0) {
            $(this).next(".btn").addClass("disabled");
        } else {
            $(this).next(".btn").removeClass("disabled");
        }
        // 이모티콘 기능 있을 때 
        if ($(this).val() == 0 && $(this).parent().hasClass("stamp_comment_box")) {
            $(this).parent().next(".btn").addClass("disabled");
        } else {
            $(this).parent().next(".btn").removeClass("disabled");
        }
    });

    // 조사하기 버튼 클릭시 팝업 토글
    $(".btn_research").on("click", function(e){
        e.preventDefault();
        $(this).next(".class_checklist_pop").toggle();
    })

});