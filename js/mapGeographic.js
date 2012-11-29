$(document).ready(function(){
    Cufon.replace('.textGrad', {
        color: '-linear-gradient(#c2c2c2, #383838, #000000)'
    });

    var fadeSpeedFast = 200,
        fadeSpeedSlow =700,
        animateSpeed = 1000,
        map = $('#mapGeographic');

    $('#map-control').on('click', 'a', function (){
    	$(this).addClass('active').siblings('a').removeClass('active');
        if( !map.hasClass('collapsed') ){
            showMapSlide();   
        }        
        return false;
    });

    var speedFade = 0;

    if( $.browser.msie && $.browser.version !== 9 ) fadeSpeedSlow = 0;

    
        map.fadeIn(fadeSpeedSlow,function(){
            map.find('#map-control').fadeIn(fadeSpeedFast, function(){
                map.find('ul').fadeIn(fadeSpeedSlow, function(){
                    map.find('#gas-pipe').fadeIn(fadeSpeedSlow, function(){
                        map.find('#gas-count').fadeIn(fadeSpeedSlow);
                    });
                });
            });
        });    
    
    

    function showMapSlide(){
        if( $.browser.msie && ($.browser.version === '8.0' || $.browser.version === '7.0') ){
            map.find('#gas-count, #gas-pipe, ul, h2').fadeOut(fadeSpeedSlow, function(){
                map.find('#map-part-left, #map-part-right').css('visibility', 'visible');
                map.css('background', 'none');
                var mapLeftPosition = parseInt(map.find('#map-part-left').css('left'));
                var mapRightPosition = parseInt(map.find('#map-part-right').css('left'));

                map.find('#map-part-left').animate({left: mapLeftPosition-24}, animateSpeed);
                map.find('#map-part-right').animate({left: mapRightPosition+47}, animateSpeed, function(){
                    map.find('#gas-count .textGrad').html('104 720 000 000').siblings('p').html('запасов кубометров газа');
                    Cufon.replace('.textGrad', {
                        color: '-linear-gradient(#c2c2c2, #383838, #000000)'
                    });
                    map.find('h2').html('Люди Ямала – мощная сила!').fadeIn(fadeSpeedSlow);
                    $('#gas-field',this).fadeIn(fadeSpeedSlow);
                    map.find('#gas-count').fadeIn(fadeSpeedSlow);

                });
            });
        } else{
            map.addClass('collapsed');
            map.find('#gas-count, #gas-pipe, ul, h2').fadeOut(fadeSpeedSlow, function(){
                map.find('#map-part-left, #map-part-right').css('visibility', 'visible');
                map.css('background', 'none');
                var mapLeftPosition = parseInt(map.find('#map-part-left').css('left'));
                var mapRightPosition = parseInt(map.find('#map-part-right').css('left'));

                map.find('#map-part-left').animate({left: mapLeftPosition-24}, animateSpeed);
                map.find('#map-part-right').animate({left: mapRightPosition+47}, animateSpeed, function(){
                    map.find('#gas-count .textGrad').html('104 720 000 000').siblings('p').html('запасов кубометров газа');
                    Cufon.replace('.textGrad', {
                        color: '-linear-gradient(#c2c2c2, #383838, #000000)'
                    });
                    map.find('h2').html('Люди Ямала – мощная сила!').fadeIn(fadeSpeedSlow);
                    $('#gas-field',this).fadeIn(fadeSpeedSlow);
                    map.find('#gas-count').fadeIn(fadeSpeedSlow);

                });
            });
        }
    }

   /* setTimeout(function(){
        map.find('#map-part-left, #map-part-right').css('visibility', 'visible');
        map.css('background', 'none');
    },1000);*/

});
