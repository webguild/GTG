$(document).ready(function(){
    Cufon.replace('.textGrad', {
        color: '-linear-gradient(#c2c2c2, #383838, #000000)'
    });

    $('#map-control').on('click', 'a', function (evt){
    	$(this).addClass('active').siblings('a').removeClass('active');
    });

    var map = $('#mapGeographic');
    $('> *', map).css('display', 'none');

    map.find('#map-part-left, #map-part-right').fadeIn(1000, function (){
    	map.find('#map-control').fadeIn(200);
    });
});
