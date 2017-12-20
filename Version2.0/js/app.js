var theRef = new Firebase('https://basedemo.firebaseio.com/products');

var prodData = {};


theRef.on('value', function(snap) {

    prodData = snap.val();
    
    $.each(prodData, function(index, value) {

        var prodPreview = '<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">';

        prodPreview += '<div class="my-list">';


        if (value.image == 'NONE') {
            prodPreview += '<img alt="No Pic">';
        } else {
            prodPreview += '<img src=' + value.image + '>';
        }
        prodPreview += '<h3>Name: ' + value.name + '</h3>';
        prodPreview += '<span>Prise: $' + value.price + '</span>';


        prodPreview += '<div class="offer">Description: ' + value.description + '</div>'; prodPreview += '</div>';

        prodPreview += '</div>';
        prodPreview += '</div>';
        prodPreview += '</div>';
        prodPreview += '</div>';

        
        $(prodPreview).appendTo('#main');

    
    });

}, function(errorObject) {
    
console.log('The read failed: ' + errorObject.code);  

});