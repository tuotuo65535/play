(function(){
	$(document).ready(() => {
		clickBind();
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
})();