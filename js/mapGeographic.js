$(document).ready(function(){
    var fadeSpeedFast = 200, fadeSpeedSlow =700, animateSpeed = 1000, block = 1;
    if($.browser.msie && $.browser.version !== 9){
        fadeSpeedFast = 0;
        fadeSpeedSlow =0;
        animateSpeed = 0;
    }
    var map = $( '#mapGeographic' ),
        mapControl = $( '#map-control', map ),
        mapUl = $( 'ul', map ),
        mapGasPipe = $( '#gas-pipe', map ),
        mapGasCount = $( '#gas-count', map ),
        mapPartLeft = $( '#map-part-left', map ),
        mapPartRight = $( '#map-part-right', map ),
        mapGasField = $( '#gas-field', map ),
        mapTextGrad = $( '.textGrad', map ),
        mapH2 = $( 'h2', map );

    mapControl.find('a').not('.active').children('span').hide();
    
    if(block){ 
           
        map.fadeIn( fadeSpeedSlow,function(){
            mapControl.fadeIn( fadeSpeedFast, function(){
                mapUl.fadeIn( fadeSpeedSlow, function(){
                    mapGasPipe.fadeIn( fadeSpeedSlow, function(){
                        mapGasCount.fadeIn( fadeSpeedSlow, function(){block = 0;} );
                    });
                });
            });
        });
    }

    Cufon.replace( mapTextGrad, {
        color: '-linear-gradient( #c2c2c2, #383838, #000000 )'
    });

    $( '#map-control' ).on( 'click', 'a', function(event){
        event.preventDefault();
        if( block ) return;

        $(this).siblings('.active').find('> span').fadeOut(400);
        $(this).find('> span').fadeIn(400);
       
        showMapSlide(this);
        $( this ).addClass( 'active' ).siblings( 'a' ).removeClass( 'active' );

    });

    
    function showMapSlide( targetObj ){
        block = 1;
        var mapLeftPosition = parseInt( mapPartLeft.css( 'left' ) );
        var mapRightPosition = parseInt( mapPartRight.css( 'left' ) );
        var mapStepLeft = 24;
        var mapStepRight = 47;

        if($( targetObj ).hasClass( 'mapCollapse' ) && !$( targetObj).hasClass( 'active' )){
           mapUl.fadeOut(fadeSpeedSlow);
           mapGasCount.fadeOut(fadeSpeedSlow);
           mapH2.fadeOut(fadeSpeedSlow);
           mapGasPipe.fadeOut(fadeSpeedSlow, function(){
                mapPartLeft.add( mapPartRight ).css( 'visibility', 'visible' );
                map.css('backgroundImage', 'none');
                mapPartLeft.animate( {left: mapLeftPosition - mapStepLeft}, animateSpeed);
                mapPartRight.animate( {left: mapRightPosition + mapStepRight}, animateSpeed, function(){
                    $('strong.active', mapGasCount).removeClass('active').siblings('strong').addClass('active');
                    $('p.active', mapGasCount).removeClass('active').siblings('p').addClass('active');
                    $('h2.active', map).removeClass('active').siblings('h2').addClass('active').fadeIn(fadeSpeedSlow);
//                    mapH2.fadeIn( fadeSpeedSlow );
                    mapGasField.fadeIn(fadeSpeedSlow);
                    mapGasCount.fadeIn( fadeSpeedSlow, function(){block = 0;} );
                });
            });
        }else if($( targetObj ).hasClass( 'mapRecovery' ) && !$( targetObj).hasClass( 'active' )){
            mapGasField.fadeOut( fadeSpeedSlow );
            mapGasCount.fadeOut( fadeSpeedSlow );
            $('h2.active', map).removeClass('active').siblings('h2').addClass('active').fadeOut( fadeSpeedSlow, function(){
                mapPartLeft.animate( {left: mapLeftPosition + mapStepLeft}, animateSpeed );
                mapPartRight.animate( {left: mapRightPosition - mapStepRight}, animateSpeed, function(){
                    map.css('backgroundImage', '');
                    mapPartLeft.add( mapPartRight ).css( 'visibility', 'hidden' );
                    $('strong.active', mapGasCount).removeClass('active').siblings('strong').addClass('active');
                    $('p.active', mapGasCount).removeClass('active').siblings('p').addClass('active');
                    mapUl.fadeIn( fadeSpeedSlow, function(){
                        mapGasPipe.fadeIn( fadeSpeedSlow, function(){
                            mapGasCount.fadeIn(fadeSpeedSlow);
                            $('h2.active', map).fadeIn( fadeSpeedSlow, function(){block = 0;} );
                        });
                    });
                });
            });
        }else{block = 0;}
    }

});
