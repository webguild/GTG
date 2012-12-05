$(window).on('load', function (event){
    // fade time
    var fadeSpeedFast = 200, fadeSpeedSlow =700, animateSpeed = 1000, block = 1;

    // for IE 7-8
    if($.browser.msie && $.browser.version !== 9){
        fadeSpeedFast = 0;
        fadeSpeedSlow =0;
        animateSpeed = 0;
    }


    // map elements
    var map = $( '#mapGeographic' ),
        mapContainer = $( '#map-container', map ),
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
    map.find('#map-preloader').hide();
    
    // map animation on page load
    if(block){
        var mapLeftPosition = parseInt( mapPartLeft.css( 'left' ) );
        var mapRightPosition = parseInt( mapPartRight.css( 'left' ) );
        var mapStepLeft = 24;
        var mapStepRight = 47;
        if($('.mapRecovery', mapControl).hasClass('active')){
            mapContainer.fadeIn( fadeSpeedSlow,function(){
                mapControl.fadeIn( fadeSpeedFast, function(){
                    mapUl.fadeIn( fadeSpeedSlow, function(){
                        mapGasPipe.fadeIn( fadeSpeedSlow, function(){
                            mapGasCount.fadeIn( fadeSpeedSlow, function(){block = 0;} );
                        });
                    });
                });
            });
        }else{
            mapH2.css('display', 'none');
            mapContainer.css('display', 'block');
            mapPartLeft.add( mapPartRight ).css( 'visibility', 'visible' );
            mapContainer.css('backgroundImage', 'none');
            mapPartLeft.animate( {left: mapLeftPosition - mapStepLeft}, animateSpeed);
            mapPartRight.animate( {left: mapRightPosition + mapStepRight}, animateSpeed, function(){
                $('strong.active', mapGasCount).removeClass('active').siblings('strong').addClass('active');
                $('p.active', mapGasCount).removeClass('active').siblings('p').addClass('active');

                $('h2.active', map).removeClass('active').siblings('h2').addClass('active').fadeIn( fadeSpeedSlow );
                mapGasField.fadeIn(fadeSpeedSlow);
                mapGasCount.fadeIn( fadeSpeedSlow, function(){
                    mapControl.fadeIn(fadeSpeedSlow);
                    block = 0;
                });
            });
        }

    }

    // cufon 
    Cufon.replace( mapTextGrad, {
        color: '-linear-gradient( #c2c2c2, #383838, #000000 )'
    });

    // map control buttons
    mapControl.on( 'click', 'a', function(event){
        event.preventDefault();
        if( block ) return;

        $(this).siblings('.active').find('> span').fadeOut(400);
        $(this).find('> span').fadeIn(400);
       
        showMapSlide(this);
        $( this ).addClass( 'active' ).siblings( 'a' ).removeClass( 'active' );

    });

    // map collapse and recovery
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
                mapContainer.css('backgroundImage', 'none');
                mapPartLeft.animate( {left: mapLeftPosition - mapStepLeft}, animateSpeed);
                mapPartRight.animate( {left: mapRightPosition + mapStepRight}, animateSpeed, function(){
                    $('strong.active', mapGasCount).removeClass('active').siblings('strong').addClass('active');
                    $('p.active', mapGasCount).removeClass('active').siblings('p').addClass('active');

                    $('h2.active', map).removeClass('active').siblings('h2').addClass('active').fadeIn( fadeSpeedSlow );
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
                    mapContainer.css('backgroundImage', '');
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
