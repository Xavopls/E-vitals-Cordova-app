var s2vinterval;

function showPlayerList(){
    $('#team_select').hide();
    $('#player_list').show();
}
$('#s2v_team').on("click", function() {
    cleanLabels();
    showPlayerList();
    current_view = 'player_list';
    if(!s2vinterval){
        setInterval(generateDataPlayerList, 2000);
    }

});

