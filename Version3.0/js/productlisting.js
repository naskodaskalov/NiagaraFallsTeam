var theRef = new Firebase('https://basedemo.firebaseio.com/products');

function logOff() {
    theRef.unauth();
    location.assign('index.html');
}


var authData = theRef.getAuth();

if (authData) {
    console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
    var loggedIn = '<li><p class="navbar-text navbar-right">' + authData.password.email + ' logged in </p></li> ';
    loggedIn += '<li><button type="button" class="btn btn-warning navbar-btn" id="logoutButton">Logout</button></li>';
    
    $(loggedIn).appendTo('.nav');
    $('#logoutButton').click(logOff);
} else {
  console.log('User not logged in');
  location.assign('login.html');
}





function editProd(id) { 
    window.name = id;
    location.assign('editProduct.html');

}

function onComplete(error) {
    if (error){
        alert('Delete Failed!');
    } else {
        //alert('Deleted product!');
        location.reload(true);
    }
}

function deleteProd(id) {
    if (confirm('Are you sure you want to delete!?') == true) {
       theRef.child(id).remove(onComplete);
    } 
}


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
        prodPreview += '<div class="col-md-3">';
        prodPreview += '<button type="button" class="btn btn-warning" onclick="editProd(\'' + index + '\')">EDIT PRODUCT</button>';
        prodPreview += '</div>';

        prodPreview += '<div class="col-md-9">';
        prodPreview += '<button type="button" class="btn btn-danger" onclick="deleteProd(\'' + index + '\')">DELETE PRODUCT</button>';
        prodPreview += '</div>';
        prodPreview += '</div>';



        prodPreview += '<div class="row">';
        

        
        prodPreview += '</div>';

        
        $(prodPreview).appendTo('#main');

    
    });

}, function(errorObject) {
    
console.log('The read failed: ' + errorObject.code);  

});