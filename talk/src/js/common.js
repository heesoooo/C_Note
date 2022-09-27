var pc_talk = pc_talk || {};
pc_talk = {
	init: function() {
		//this.loadTimeOut = function() {};
		//this.fileRegist = 0;
		// pc_talk.navTab();
		// pc_talk.searchBox();
		// pc_talk.selectClass();
		// pc_talk.opponentList();
		// pc_talk.inputFocus();
		// pc_talk.modalRightChat();
		// pc_talk.chatPartnersList();
		// pc_talk.chatBtnBottom();
	},
	// left nav
	navTab: function(){
		var className = {
			navItem: $(".tab_nav_wrap .top li > a"),
			navContItem: $(".tab_cont_wrap .tab_cont_item"),
		}
		className.navContItem.eq(0).show();
		className.navItem.on("click", function(e){
			e.preventDefault();
			$(this).parent().addClass("on").siblings().removeClass("on");
			var target = $(this).attr("href");
			className.navContItem.hide();
			$("#" + target).show();
			var title = $(this).find("span").text();
			$(".tab_title h2").text(title);
		});
	},
	// 이름 검색 - 검색창 입력시 clear button 제어
	searchBox: function() {
		var className = {
			schInput: $(".search_name_box input"),
			btnSchClear: $(".search_name_box .btn_clear"),
		}
		$("input[type=text]").each(function(){
			if (!$(this).val() == "") {
				$(this).parent().addClass("active");
				$(this).siblings(".btn_clear").show();
				$(this).siblings(".btn_search").addClass("active");
			} 
			className.schInput.on("input", function () {
				if ($(this).val() == "") {
					$(this).parent().removeClass("active");
					$(this).siblings(".btn_clear").hide();
					$(this).siblings(".btn_search").removeClass("active");
				} else {
					$(this).parent().addClass("active");
					$(this).siblings(".btn_clear").show();
					$(this).siblings(".btn_search").addClass("active");
				}
			})
		});
		className.btnSchClear.on("click", function(e) {
			e.preventDefault();
			$(this).hide();
			$(this).siblings("input").val("");
			$(this).parent().removeClass("active");
			$(this).siblings(".btn_search").removeClass("active");
		});
	},
	// 클래스 선택
	selectClass: function() {
		var className = {
			selectClassWrap: $(".class_info .select_class"),
			selectActive: $(".class_info .select_class dt"),
			selectList: $(".class_info .select_class dd"),
		}
		className.selectActive.on("click", function() {
			$('body').prepend('<div class="class_dimm"></div>');
			$('body').addClass("ovh");
			$(".class_dimm").show();
			className.selectList.show();
			return false;
		});
		$("body").on("click",function(){
			closeClassList()
		})
		className.selectList.on("click", function(e) {
			e.stopPropagation();
		});
		function closeClassList() {
			$("body").removeClass("ovh");
			className.selectList.hide();
			$(".class_dimm").remove();
			return false;
		}
	},
	// 대화 상대 목록 리스트 그룹 slideToggle
	opponentList: function() {
		var className = {
			opponentListItem: $(".conversate_list_wrap .list_item"),
			opponentListTitle: $(".conversate_list_wrap .list_item .list_title"),
			opponentListCont: $(".conversate_list_wrap .list_item .list_cont"),
		}
		className.opponentListTitle.on("click", function(e) {
			e.preventDefault();
			$(this).next().slideToggle(100);
			$(this).toggleClass("close");
		});
	},
	// input on - > btn  on
	inputFocus: function() {
		var className = {
			inputArea: $(".input_area"),
		}
		className.inputArea.on("input", function(e) {
			e.preventDefault();
			if (className.inputArea.val() == "") {
				$(this).next().find(".btn_send").removeClass("on");
			} else {
				$(this).next().find(".btn_send").addClass("on");
			}
		});
	},
	// selectbox custom
	selectBox: function() {
		$(document).mouseup(function (e) {
			$(".select_box > a").on("click", function (e) {
				e.preventDefault();
				$(this).next().toggle();
			});
			if ($(e.target).parent(".select_wrap").length == 0) {
				$(".option_list").hide();
			}
            if ($(e.target).next().find(".scroll_bar a").length > 3) {
                $(e.target).next().find(".scroll_bar").css({
                    "width": "calc(100% - 15px)",
                    "padding-right": "14px"
                });
            }
		});
	},    
	// 채팅창 검색, 설정 팝업
	modalRightChat: function() {
		var className = {
			chatRight: $(".modal_chat_right"),
			modalClose: $(".modal_chat_right .modal_close"),
		}
		$('[data-toggle]').click(function () {
			var target = $(this).attr('data-toggle');
			$('body').prepend('<div class="class_dimm"></div>');
			$(".class_dimm").show();
			$("body").addClass("ovh");
			$("#" + target).show();
			return false;
		});
		$("body").on("click", function(){
			closeModalRight();
		});
		className.modalClose.on("click", function(){
			closeModalRight();
		});
		className.chatRight.on("click", function(e){
			e.stopPropagation();
		});
		function closeModalRight() {
			$(".modal_chat_right").hide();
			$("body").removeClass("ovh");
			$(".class_dimm").remove();
			return false;
		}
	},
	// 대화상대 리스트 확인
	chatPartnersList: function(){
		var className = {
			chatInfoList: $(".chat_info_list"),
			listItem: $(".chat_info_list .partners > a"),
		}
		className.listItem.on("click", function(e){
			e.preventDefault();
			$(this).next(".scroll").slideToggle(200);
			$(this).toggleClass("fold");
		})
	},
	// 채팅창 btn bottom
	chatBtnBottom: function(){
		var className = {
			btnBottom : $(".btn_bottom"),
			chatContWrap : $('.chatting_cont_wrap'),
			chatListWrap : $('.chatting_list_wrap'),
			chatHeight: $(".chatting_list_wrap").height(),
			newAlertBar: $(".new_alert_bar")
		}
		$(".btn_bottom, .new_alert_bar").click(function(){
			className.chatContWrap.animate({
				scrollTop: className.chatHeight,
			}, 1000);
		});
		className.chatContWrap.on("scroll", function(){
			var scrollTop = className.chatContWrap.scrollTop() +  className.chatHeight / 2;
			if(scrollTop > className.chatHeight) {
				className.btnBottom.css("display", "none");
				className.newAlertBar.css("display", "none");
			} else {
				className.btnBottom.css("display", "block");
			}
		})		
	}
};

jQuery(function($) {
	pc_talk.init();
});







