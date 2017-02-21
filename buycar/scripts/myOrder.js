$(document).ready(function(){

	function stock(that){
		var $stock = parseInt(that.parent(".item-amount").siblings('.stock').text());
		var thisNum = that.parent().find("input").val();
		var thisOutNum = that.parent().siblings('.outNum');
		var thisStockNum = thisOutNum.find('.stockNum');
		if(parseInt(thisNum) > $stock){
			thisOutNum.show("fast");
		}else{
			thisOutNum.hide("fast");
		}
		thisStockNum.text($stock);
	}

	//我的淘宝-二级菜单
	$(".nav_myTao").hover(function(){
		$(this).css({
			"background-color":"#fff"
		}).find('.nav-myTao-nav').show();
	}, function(){
		$(this).css({"background-color":"#f5f5f5"}).find('.nav-myTao-nav').hide();
	});

	$(".nav_collection").hover(function(){
		$(this).css({
			"background-color":"#fff"
		}).find('.nav-myTao-nav').show();
	}, function(){
		$(this).css({"background-color":"#f5f5f5"}).find('.nav-myTao-nav').hide();
	});

	$(".nav_sellCenter").hover(function(){
		$(this).css({
			"background-color":"#fff"
		}).find(".nav-myTao-nav").show();
	}, function(){
		$(this).css({"background-color":"#f5f5f5"}).find('.nav-myTao-nav').hide();
	});

	$(".nav_contact").hover(function(){
		$(this).css({
			"background-color":"#fff"
		}).find(".nav-myTao-nav").show();
	}, function(){
		$(this).css({"background-color":"#f5f5f5"}).find('.nav-myTao-nav').hide();
	});

	$(".btn-switch-cart").mouseenter(function(event){
		$(".btn-switch-cart").removeClass("selectColumn");
		$(this).addClass("selectColumn");
	}).mouseleave(function(event){
		$(".btn-switch-cart").removeClass("selectColumn");
		$(".switch-cart-0").addClass("selectColumn");
	});

	$(".promotion").bind("mouseenter mouseleave",function(e){
		if(e.type == 'mouseenter'){
			$(this).siblings(".proSlidedown").stop().show('fast');
		}else{
			$(this).siblings(".proSlidedown").stop().hide('fast');
		}
	});

	$(".item-amount input").bind("keypress keyup blur", function(e){
		if(e.type === "keypress"){
			var thisParent = $(this).parents("td-amount");
			var thisInput = $(this).parent(".item-amount");

		}else if(e.type == "keyup"){
			stock($(this));
		}else{
			stock($(this));
			var $stock = parseInt($(this).parent(".item-amount").siblings(".stock").text());
			var thisParent = $(this).parents(".td-amount");
			var thisInput = $(this).parent(".item-amount");
			var $text = thisParent.siblings(".td-price").find("span");
			var num = parseInt($(this).val()) || 0;
			if(num > $stock){
				num = $stock;
			}else if(num < 1){
				num = 1;
			}
			$(this).val(num);
		}
	});

	//删除商品
	var thisInfo,previous,next;
	$(".delete").bind("click",function(e){
		var $this = $(e.target);
		thisInfo = $this.parents(".mainCommodity");
		previous = thisInfo.prev();
		next = thisInfo.next();
		var itemBasisInfo = thisInfo.find(".item-basis-info a").text().trim();
		console.log($(".mainCommodity").last());
		var html = template("delete");
		if(next[0]){
			next.before(html);
		}else if(previous[0]){
			previous.after(html);
		}else{
			$(".commodityConataner").append(html);
		}
		thisInfo.detach();
		return false;
	});

	//恢复商品
	$(document).on("click",".turnBack",function(){
		if(previous[0]){
			previous.after(thisInfo);
		}else if(next[0]){
			next.before(thisInfo);
		}else{
			$(".commodityConataner").append(thisInfo);
		}
		$(".undo-wrapper").hide();
		return false;
	});

});