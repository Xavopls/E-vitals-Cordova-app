var heart_rate_values = [];
var breath_rate_values = [];
var counter_started = false;
function avgValue(array) {
    var sum = 0;
    for (var i = 0; i<array.length; i++){
        sum += array[i];
    }
    return Math.round(sum/array.length);
}
function generateRandomValues() {
    var breath_rate = Math.round(Math.random() * (18 - 13) + 13);
    var heart_rate = Math.round(Math.random() * (100 - 60) + 60);
    heart_rate_values.push(heart_rate);
    breath_rate_values.push(breath_rate);

    // console.log('heart rate', heart_rate);
    // console.log('breath rate', breath_rate);

    $('#current_heart_rate').text(heart_rate.toString());

    $('#min_heart_rate').text(Math.min(...heart_rate_values).toString());
    $('#avg_heart_rate').text(avgValue(heart_rate_values).toString());
    $('#max_heart_rate').text(Math.max(...heart_rate_values).toString());



    $('#current_lung_rate').text(breath_rate.toString());

    $('#min_lung_rate').text(Math.min(...breath_rate_values).toString());
    $('#avg_lung_rate').text(avgValue(breath_rate_values).toString());
    $('#max_lung_rate').text(Math.max(...breath_rate_values).toString());

}
var IntervalId;
$('#start_button').on("click", function() {

    if (counter_started){
        if (IntervalId){
            clearInterval(IntervalId);
        }
        counter_started = false;
        $('#start_button').text('Start');
    }

    else{
        counter_started = true;
        IntervalId = setInterval(generateRandomValues, 2000);
        $('#start_button').text('Stop');
        //
        // setTimeout(generateRandomValues, 1000);
        // setTimeout(generateRandomValues, 2000);
        // setTimeout(generateRandomValues, 3000);
        // setTimeout(generateRandomValues, 4000);
        // setTimeout(generateRandomValues, 5000);
        // setTimeout(generateRandomValues, 6000);
    }



});

function cleanLabels() {
    //  LOCAL RECORDING LABELS
    $('#current_heart_rate').text("0");
    $('#min_heart_rate').text("0");
    $('#avg_heart_rate').text("0");
    $('#max_heart_rate').text("0");
    $('#current_lung_rate').text("0");
    $('#min_lung_rate').text("0");
    $('#avg_lung_rate').text("0");
    $('#max_lung_rate').text("0");

    //S2V LABELS
    $('#player_1_heart_label').text("0");
    $('#player_1_lung_label').text("0");
    $('#player_2_heart_label').text("0");
    $('#player_2_lung_label').text("0");
    $('#player_3_heart_label').text("0");
    $('#player_3_lung_label').text("0");
    $('#player_4_heart_label').text("0");
    $('#player_4_lung_label').text("0");
    $('#player_5_heart_label').text("0");
    $('#player_5_lung_label').text("0");

}