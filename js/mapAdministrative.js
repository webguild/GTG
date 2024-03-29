(function(){
$(function(){

	$('map').on('mouseenter', 'area', function(event){
        var li = $('#' + this.id + 'Info');
        	
		if($(this).hasClass('active')){
            $('div', li).css('display', 'block');
            $(this).on('mouseleave', function(event){
                $('div', li).css('display', 'none');
            });
            return;
        } 
        
		var left = li.attr('data-left');
		var top = li.attr('data-top');


		$('img.active', li).hide();

		li.css({
			'display':'block',
			'top': top + 'px',
			'left': left  + 'px'
		});        

        // pop-up position
        var img = li.find('img:first'),
            popUpLeft = parseInt(img.width())/2 - $('div', li).outerWidth() / 2,
            popUpTop = img.height();
            popUpTop = popUpTop - (popUpTop/5);

		$('div', li).css({
			'display': 'block', 
			'top': popUpTop,
			'left': popUpLeft
		});

		$(this).on('mouseleave', function(event){
			li.css('display', 'none');
		});

		$(this).on('click', function(event){
			$('#mapAdministrative ul li').hide();
			li.show();
			$('.active', li).show();
            $('.mapContent li').hide();
            $('.mapContent .' + li.attr('id')).show();
			$(this).addClass('active').siblings().removeClass('active');
            $(this).off();
            $(this).on('mouseleave', function(event){
                $('div', li).css('display', 'none');
            });
		});		
	});

});
}());