var theRef = new Firebase('https://basedemo.firebaseio.com/products');

var prodData = {};


theRef.on('value', function(snap) {

    prodData = snap.val();
    
    $.each(prodData, function(index, value) {

        var prodPreview = '<div class="well col-sm-6 col-md-3 col-lg-4">';


        prodPreview += '<div class="img-responsive img-thumbnail">';
        if (value.image == 'NONE') {
            prodPreview += '<img alt="No Pic">';
        } else {
            prodPreview += '<img src=' + value.image + '>';
        }
        prodPreview += '</div>';
        prodPreview += '<div class = "caption>"';
        prodPreview += '<div class = "row>"';
        prodPreview += '<div class="col-md-6 col-xs-6">';
        prodPreview += '<h3>' + value.name + '</h3>';
        prodPreview += '</div>';

        prodPreview += '<div class="col-md-6 col-xs-6 price">';
        prodPreview += '<h3><label>$' + value.price + '</label></h3>';
        prodPreview += '<p>Status: ' + value.description + '</p>'; prodPreview += '</div>';

        prodPreview += '</div>';
        prodPreview += '</div>';
        prodPreview += '</div>';

        
        $(prodPreview).appendTo('#main');

    
    });

}, function(errorObject) {
    
console.log('The read failed: ' + errorObject.code);  

});