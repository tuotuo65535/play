(function(){
	$(document).ready(() => {
		clickBind();
		searchScroll();
	});

	let clickBind = () => {
		$('.button_container').click(function(){
			changeStatus($(this), 'active');
			changeStatus($('.overlay'), 'open');
		});
	}

	let changeStatus = (zdom, className) => {
		if(zdom.hasClass(className)) {
			zdom.removeClass(className);
		} else {
			zdom.addClass(className);
		}
	}

	//上滑隐藏显示搜素框
	let searchScroll = () => {
		let height = $('#intro-carousel').height();
		window.onscroll = function() {
			let top = document.body.scrollTop;
			let opacity = 0;
			if(top > height) {
				opacity = 0.85;
			} else {
				opacity = 0.85 * (top/height);
			}
			$('.navbar').css('background', 'rgba(0,0,0,' + opacity + ')');
		}
	}
})();