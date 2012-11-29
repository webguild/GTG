$(document).ready(function(){
    var fadeSpeedFast = 200, fadeSpeedSlow =700, animateSpeed = 1000, block = 1;
    if($.browser.msie && $.browser.version !== 9){
        fadeSpeedFast = 0;
        fadeSpeedSlow =0;
        animateSpeed = 0;
    }
    var map = $('#mapGeographic'),
        mapControl = $('#map-control', map),
        mapUl = $('ul', map),
        mapGasPipe = $('#gas-pipe', map),
        mapGasCount = $('#gas-count', map),
        mapPartLeft = $('#map-part-left', map),
        mapPartRight = $('#map-part-right', map),
        mapGasField = $('#gas-field', map),
        mapTextGrad = $('.textGrad', map),
        mapH2 = $('h2', map);

    if(block){
        map.fadeIn(fadeSpeedSlow,function(){
            mapControl.fadeIn(fadeSpeedFast, function(){
                mapUl.fadeIn(fadeSpeedSlow, function(){
                    mapGasPipe.fadeIn(fadeSpeedSlow, function(){
                        mapGasCount.fadeIn(fadeSpeedSlow);
                        block = 0
                    });
                });
            });
        });
    }

    Cufon.replace( mapTextGrad, {
        color: '-linear-gradient(#c2c2c2, #383838, #000000)'
    });

    $('#map-control').on('click', 'a', function (){
        if(block){
            return;
        }else{
            showMapSlide(this);
            $(this).addClass('active').siblings('a').removeClass('active');
        }
        return false;
    });

    function showMapSlide( targetObj ){
        block = 1;

        if($( targetObj ).hasClass( 'mapCollapse' ) && !$( targetObj ).hasClass( 'active' ) ){
           mapUl.add( mapGasCount ).add( mapH2 ).add( mapGasPipe ).fadeOut(fadeSpeedSlow, function(){
                mapPartLeft.add( mapPartRight ).css( 'visibility', 'visible' );
                map.css('background', 'none');
                var mapLeftPosition = parseInt( mapPartLeft.css('left') );
                var mapRightPosition = parseInt( mapPartRight.css('left') );

                mapPartLeft.animate({left: mapLeftPosition-24}, animateSpeed);
                mapPartRight.animate({left: mapRightPosition+47}, animateSpeed, function(){
                    mapTextGrad.html('104 720 000 000').siblings('p').html('запасов кубометров газа');
                    Cufon.replace( mapTextGrad, {
                        color: '-linear-gradient(#c2c2c2, #383838, #000000)'
                    });
                    mapH2.html('Люди Ямала – мощная сила!').fadeIn(fadeSpeedSlow);
                    mapGasField.fadeIn(fadeSpeedSlow);
                    mapGasCount.fadeIn(fadeSpeedSlow);
                    block = 0;
                });
            });
        }else{

        }
    }

});
