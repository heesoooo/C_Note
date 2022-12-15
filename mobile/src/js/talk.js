var mo_talk = mo_talk || {};
mo_talk = {
	init: function() {
		//this.loadTimeOut = function() {};
		//this.fileRegist = 0;
		mo_talk.wrapPadding();
		// mo_talk.navTab();
		// mo_talk.selectClass();
		mo_talk.opponentList();
		mo_talk.inputFocus();
		mo_talk.chatContHeight();
		mo_talk.chatBubbleGroup();
		mo_talk.consultTimeBar();
		mo_talk.sideChatSettings();
	},
	// .talk_wrap padding값 조절
	wrapPadding: function() {
		var className = {
			talkWrap: $(".talk_wrap"),
		}
		var mainTabH = $(".main_tab_bar").outerHeight();
		className.talkWrap.children(".main_tab_bar") ? className.talkWrap.css("padding-bottom", mainTabH) : className.talkWrap.css("padding-bottom", 0);
	},
	// left nav
	navTab: function(){
		var className = {
			navItem: $(".talk_nav_tab li"),
			navContItem: $(".tab_cont_wrap .tab_cont_item"),
		}
		className.navContItem.eq(0).show();
		className.navItem.on("click", function(e){
			e.preventDefault();
			$(this).addClass("on").siblings().removeClass("on");
			var target = $(this).attr("rel");
			className.navContItem.hide();
			$("#" + target).fadeIn(200);
		});
	},    
    // 클래스 선택
    selectClass: function() {
		var className = {
			btnSelClass: $(".talk_wrap .sub_header .btn_sel_class"),
		}
		className.btnSelClass.on("click", function(e) {
			e.stopPropagation();
            dimmOpen();
            $(this).parent().next(".sub_expand_tab").addClass("active");
			if ($(this).parent().next(".sub_expand_tab").outerHeight() > 320) {
				$(this).parent().next(".sub_expand_tab").addClass("ov_scroll")
			}
		});
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
			if ($(this).val() == "") {
				$(this).next().find(".btn_send").removeClass("on");
			} else {
				$(this).next().find(".btn_send").addClass("on");
			}
		});
	},
	// 채팅창 대화영역 높이 조절
	chatContHeight: function(){
		var className = {
			chatCont : $(".chatting_wrap .chatting_cont"),
			sumHeaderInp : $(".sub_header").outerHeight() + $(".chatting_input").outerHeight() + 5
		}
		className.chatCont.css("height", "calc(var(--vh, 1vh) * 100 - " + className.sumHeaderInp + "px)");
	},
	// 채팅 그룹 시간체크해서 영역주기
	chatBubbleGroup: function(){
		var className = {
			chattingMe: $(".chatting_list_wrap .chatting_me .etc"),
			chattingYou: $(".chatting_list_wrap .chatting_you .etc")
		}
		$.each(className.chattingMe, function(){
			if ($(this).find("span").hasClass("time")) {
				$(this).parent().css("margin-bottom", "1.5rem");
			} else {
				$(this).parent().css("margin-bottom", ".6rem");
			}
		});
		$.each(className.chattingYou, function(){
			if ($(this).find("span").hasClass("time")) {
				$(this).parent().css("margin-bottom", "1.5rem");
			} else {
				$(this).parent().css("margin-bottom", ".6rem");
			}
		});
	},
	// 상당가능 시간 BAR
	consultTimeBar : function(){
		var className = {
			timeBar : $($(".consulting_time_bar"))
		}
		className.timeBar.on("click", function(e){
			e.preventDefault();
			if(!$(this).find("dl").hasClass("no_time")){
				if (!$(this).hasClass("open")) {
					$(this).addClass("open");
				} else {
					$(this).removeClass("open")
				}
			}
		})
	},
	// 채팅창 설정 팝업
	sideChatSettings: function() {
		var className = {
			talkWrap: $(".talk_wrap"),
			btnChatInfo: $(".sub_header .btn_chat_info"),
			chatRight: $(".side_chat_settings"),
		}
		className.btnChatInfo.on("touchstart touchstart click", function(e) {
			e.stopPropagation();
			className.chatRight.toggleClass("open");
			className.talkWrap.toggleClass("side_chat_dimm");
		});
		className.talkWrap.on("click", function(){
			closeModalRight();
		});
		className.chatRight.on("touchend click", function(e){
			e.stopPropagation();
		});
		function closeModalRight() {
			className.chatRight.removeClass("open");
			className.talkWrap.removeClass("side_chat_dimm");
			return false;
		}
	}
};

jQuery(function($) {
	mo_talk.init();
});







