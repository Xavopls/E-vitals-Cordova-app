// METHODS

function fadeOutTransition() {
    var load_screen = $('#load_screen');
    load_screen.delay(2000).fadeOut();
    setTimeout(function(){
        load_screen.hide();
        $('#main_menu').show(); }
        , 2600);

}



// MAIN
fadeOutTransition();


