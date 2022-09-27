$(function(){
    // container padding top 넣어주기
    var subHeaderH = $(".sub_header, .search_header").outerHeight(),
        subTabH = $(".sub_tab").outerHeight();
    $(".container").css("padding-top", subHeaderH);
    if($(".wrapper").children(".sub_tab")) {
        $(".container").css("padding-top", subHeaderH+subTabH);
    }

    // select box (dropdown)
    $(document).mouseup(function (e) {
        if ($(e.target).parent(".select_wrap").length == 0) {
            $(".option_list").hide();
            $(".select_box > a").removeClass("active");
        }
        if ($(e.target).next().find(".scroll_bar a").length > 7) {
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
    
    // 게시판 카테고리 열기
    $(".sub_tab .expand_menu").on('click', function(event) {
        event.stopPropagation();
        dimmOpen();
        $(this).parent().next(".sub_expand_tab").addClass("active");
    })

    // 글쓰기 버튼 클릭시
    $(".btn_write_page").on('click', function(event) {
        event.stopPropagation();
        dimmOpen();
        $(this).next(".list_write_menu").addClass("active");
    })

    // 게시판 더보기 버튼 클릭시
    $(".btn_more_opt").on('click', function(event) {
        event.stopPropagation();
        dimmOpen();
        $(".list_more_opt").addClass("active");
    })
    // 모달안에서 팝업띄울때
    $(".modal .btn_more_opt").on('click', function(event) {
        event.stopPropagation();
        $(".dimm").css("z-index", 9998);
        $(".list_more_opt").css("z-index", 9998);
    })
    
    // 조사표 추가 버튼 클릭시
    $(".btn_select_research").on('click', function(event) {
        event.stopPropagation();
        dimmOpen();
        $(".select_research").addClass("active");
    })

	$("body").on("click", function() {
        $("body").removeClass('ovh');
		$(".dimm").remove();
        $(".sub_expand_tab, .list_more_opt").removeClass("active");
	});

	$(".sub_expand_tab, .list_more_opt ul").on("click", function(event) {
		event.stopPropagation();
	});
    
    // 상단 공지 리스트 고정리스트 swiper
    var pinMenuSwiper = new Swiper(".pin_menu_wrap", {
        slidesPerView: 1.3,
        spaceBetween: 15,
    });

    // scrap on/off
    $(".btn_scrap").on("click", function(e){
        e.preventDefault();
        $(this).toggleClass("on");
    });

    // 헤더 검색영역
    $(".search_header input").on("input", function () {
        if ($(this).val() == 0) {
            $(this).siblings('.btn_clear').hide();
            $(this).parent().next(".btn_search").removeClass("active");
        } else {
            $(this).siblings('.btn_clear').show();
            $(this).parent().next(".btn_search").addClass("active");
        }
    })
    $(".search_header .btn_clear").on("click", function (e) {
        e.preventDefault();
        $(this).hide().siblings('input').val("");
        $(this).parent().next(".btn_search").removeClass("active");
    });

    // .inp_clear 입력시 btn_clear 버튼 생성
    $("input.inp_clear").on("input", function () {
        if ($(this).val() == 0) {
            $(this).blur().siblings('.btn_clear').hide();
            $(this).parent().next(".btn_search").removeClass("active");
        } else {
            $(this).focus().siblings('.btn_clear').show();
            $(this).parent().next(".btn_search").addClass("active");
        }
    })
    $('.inp_clear + .btn_clear').on("click", function (e) {
        e.preventDefault();
        $(this).hide().siblings('input').val("");
        $(this).parent().removeClass("active");
    });

    // 댓글창 입력시 
    $(".reply_box .btn_comment").on("click", function (e) {
        e.preventDefault();
        $(this).hide();
        $(this).next(".real_comment_box").show().find('textarea').focus();
    });
    $(".real_comment_box .btn_wrap .close").on("click", function (e) {
        e.preventDefault();
        $(this).parent().parent().hide().siblings('.btn_comment').show();
    });
});

// dimm open
function dimmOpen() {
    $("body").addClass("ovh");
    $("body").prepend('<div class="dimm"></div>');
    $(".dimm").show();
}

// 모바일 height값 대응
function setScreenSize() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();
window.addEventListener('resize', setScreenSize);