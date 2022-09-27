if (typeof $.fn.modal !== 'function') {
	(function ($) {
		$.fn.modal = function (options) {
			var defaults = {
				show: false,
				overlayDrop: true
			}
			var options = $.extend(defaults, options);
			var $btnOpen = $('[data-target="modal"]');
			var modal = this;
			if (options.overlayDrop == true) {
				if ($('body').find('.modal_backdrop').length == 0) {
					$('body').prepend('<div class="modal_backdrop"></div>');
				}
				var overlay = $('.modal_backdrop');
			}
			function modalShow() {
				$('body').addClass('ovh');
				modal.show();
				overlay.show();
				var windowH = $(window).height();
				var modalDialog = modal.find('.modal_content');
				var modalDialogH = modalDialog.height();
				var modalDialogHfix = windowH / 2 - modalDialogH/2 - 40;
				if (modalDialogHfix < 0) {
					modalDialogHfix = 30;
				}        
				modalDialog.css('margin-top', modalDialogHfix);
				$(window).resize(function () {
					var windowH = $(window).height();
					var modalDialog = modal.find('.modal_content');
					var modalDialogH = modalDialog.height();
					var modalDialogHfix = windowH / 2 - modalDialogH /2 - 40;
					if (modalDialogHfix < 0) {
						modalDialogHfix = 30;
					}
					modalDialog.css('margin-top', modalDialogHfix);
				});
			}
			if (options.show == true) {
				modalShow();
			}
		}
	})(jQuery);
	$(function () {
		$('[data-target]').click(function () {
			var target = $(this).attr('data-target');
			$('.modal_backdrop').show();
			$("#" + target).modal({ show: true });
			return false;
		});
		$('[data-dismiss="modal"]').click(function () {
			$('body').removeClass('ovh');
			$('.modal_backdrop').hide();
			$('.modal').hide();
			return false;
		});		
		$('.modal_content').click(function (event) {
			event.stopPropagation();
		});
		$('.survey_top').click(function (event) {
			event.stopPropagation();
		});
        $('.modal').each(function(){
            if(!$(this).hasClass("click_dimm_none")) {
                $(this).click(function () {
                    if ($(this).attr('aria-hidden') != 'false') {
                        $('body').removeClass('ovh');
                        $('.modal_backdrop').hide();
                        $('.modal').hide();
                    }
                    return false;
                });
            } else {
                $('.modal').click(function (event) {
                    event.stopPropagation();
                });
            }
        })
	});
}