
document.addEventListener("backbutton", returnLastView, false);

$('#team_button').on("click", function() {
    main_menu.hide();
    $('#team_select').show();
    current_view = 'team_select';
});

$('#you_button').on("click", function() {
    main_menu.hide();
    $('#local_recording').show();
    current_view = 'local_recording';
});



function hideAll(){
    $('#main_menu').hide();
    $('#local_recording').hide();
    $('#player_list').hide();
    $('#team_select').hide();
}

function returnLastView() {
    hideAll();
    switch (current_view) {
        case 'main_menu':
            main_menu.show();
            break;

        case 'local_recording':
            main_menu.show();
            heart_rate_values.length = 0;
            breath_rate_values.length = 0;
            counter_started = false;
            cleanLabels();
            current_view = 'main_menu';
            break;

        case 'team_select':
            main_menu.show();
            current_view = 'main_menu';
            break;

        case 'player_list':
            $('#team_select').show();
            current_view = 'team_select';
            break;
    }


}


