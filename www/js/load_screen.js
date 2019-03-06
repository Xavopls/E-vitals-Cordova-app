var current_view;

// METHODS
var main_menu = $('#main_menu');
var load_screen = $('#load_screen');

function fadeOutTransition() {
    load_screen.delay(2000).fadeOut();
    setTimeout(function(){
        load_screen.hide();
        main_menu.show();
        }
        , 2600);

    current_view = 'main_menu';

}



// MAIN
fadeOutTransition();


