(function(){
$(function(){

	$('map').on('mouseenter', 'area', function(event){
		if($(this).hasClass('active'))return;
		var li = $('#' + this.id + '1');
		var left = li.attr('data-left');
		var top = li.attr('data-top');
		
		$('img.active', li).hide();

		li.css({
			'display':'block',
			'top': top + 'px',
			'left': left  + 'px'
			});

		$(this).on('mouseleave', function(event){
			li.css('display', 'none');
		});

		$(this).on('click', function(event){
			$('ul li').hide();
			li.show();
			$('.active', li).show();
			$(this).addClass('active').siblings().removeClass('active');
			$(this).off();
		});		
	});

	



});
}());