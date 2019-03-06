function showPlayerList(){
    $('#team_select').hide();
    $('#player_list').show();
}
$('#s2v_team').on("click", function() {
    showPlayerList();
    current_view = 'player_list'
});