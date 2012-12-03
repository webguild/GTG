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

    // cufon 
    Cufon.replace( mapTextGrad, {
        color: '-linear-gradient( #c2c2c2, #383838, #000000 )'
    });

    // map control buttons
    $( '#map-control' ).on( 'click', 'a', function(event){
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
                map.css('backgroundImage', 'none');
                mapPartLeft.animate( {left: mapLeftPosition - mapStepLeft}, animateSpeed);
                mapPartRight.animate( {left: mapRightPosition + mapStepRight}, animateSpeed, function(){
                    mapTextGrad.html( '104 720 000 000' ).siblings( 'p' ).html( 'запасов кубометров газа' );
                    Cufon.replace( mapTextGrad, {
                        color: '-linear-gradient( #c2c2c2, #383838, #000000 )'
                    });
                    mapH2.html('Люди Ямала – мощная сила!').fadeIn( fadeSpeedSlow );
                    mapGasField.fadeIn(fadeSpeedSlow);
                    mapGasCount.fadeIn( fadeSpeedSlow, function(){block = 0;} );
                });
            });
        }else if($( targetObj ).hasClass( 'mapRecovery' ) && !$( targetObj).hasClass( 'active' )){
            mapGasField.fadeOut( fadeSpeedSlow );
            mapGasCount.fadeOut( fadeSpeedSlow );
            mapH2.fadeOut( fadeSpeedSlow, function(){
                $( this ).html('Наш газ — для людей!');
                mapPartLeft.animate( {left: mapLeftPosition + mapStepLeft}, animateSpeed );
                mapPartRight.animate( {left: mapRightPosition - mapStepRight}, animateSpeed, function(){
                    map.css('backgroundImage', '');
                    mapPartLeft.add( mapPartRight ).css( 'visibility', 'hidden' );
                    mapTextGrad.html( '185 000 000').siblings( 'p').html( 'кубометров газа доставлено адресатам' );
                    Cufon.replace( mapTextGrad, {
                        color: '-linear-gradient( #c2c2c2, #383838, #000000 )'
                    });
                    mapUl.fadeIn( fadeSpeedSlow, function(){
                        mapGasPipe.fadeIn( fadeSpeedSlow, function(){
                            mapGasCount.fadeIn(fadeSpeedSlow);
                            mapH2.fadeIn( fadeSpeedSlow, function(){block = 0;} );
                        });
                    });
                });
            });
        }else{block = 0;}
    }
});
