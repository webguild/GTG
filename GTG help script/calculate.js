$(function (){

    var imgContainer = $('#img-container'),
        controls = $('#controls'),
        point = $('<span>', {class: 'point'});
    imgContainer.css({
        width: $('> img', imgContainer).width(),
        height: $('> img', imgContainer).height(),
        background: 'url(' + $('> img', imgContainer).attr('src') + ') no-repeat 0 0'
    });

    // create points 
    imgContainer.on('click', function (evt){
        var pointCopy = point.clone(),
            offsetLeft = parseInt( $(this).position().left ) || parseInt( $(this).css('margin-left') ); 

        $(this).append(pointCopy.css({
                top: evt.clientY + window.pageYOffset,
                left: evt.clientX - offsetLeft + window.pageXOffset
            })
        );

    });

    // remove point
    $('#remove', controls).on('click', function (evt){
        evt.preventDefault();
        $('.point:last', imgContainer).remove();
    });
    imgContainer.on('contextmenu', '.point', function (evt){
        evt.preventDefault();
        $(this).remove();
    });

    // calculate
    $('#calculate', controls).on('click', function (evt){
        evt.preventDefault();
        var points = $('.point', imgContainer),
            result = [],
            area = $('<area>', {
                shape: 'poly',
                href: '#',
                alt: 'area',
                id: 'regionName'
            });

        points.each(function (v){
            var x = parseInt( $(this).css('left') ),
                y = parseInt( $(this).css('top') );
            result.push(x, y);   
        });

        area[0].setAttribute('coords', result.join(','));
        $(this).siblings('p').text( area[0].outerHTML );
    });

    // p whole text selection
    $('p', controls).on('click', function (evt){
        var range = document.createRange();
        range.selectNode(this);

        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);     
    });

    // show/hide controls
    $('div', controls).toggle(function (){
        var self = this;      
        controls.animate({bottom: -controls.outerHeight()}, 300, 'linear', function(){
            $(self).addClass('show-controls').text('show');   
        });     
    }, function (){
        var self = this;
        controls.animate({bottom: 0}, 300, 'linear', function(){
            $(self).removeClass('show-controls').text('hide');
        });            
    });

});