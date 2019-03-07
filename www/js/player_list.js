

function generateDataPlayerList(){
        generateHeartAndBreath($('#player_1_heart_label'), $('#player_1_lung_label'));
        generateHeartAndBreath($('#player_2_heart_label'), $('#player_2_lung_label'));
        generateHeartAndBreath($('#player_3_heart_label'), $('#player_3_lung_label'));
        generateHeartAndBreath($('#player_4_heart_label'), $('#player_4_lung_label'));
        generateHeartAndBreath($('#player_5_heart_label'), $('#player_5_lung_label'));
}


function generateHeartAndBreath(label_heart, label_breath) {
    var breath_rate = Math.round(Math.random() * (18 - 13) + 13);
    var heart_rate = Math.round(Math.random() * (100 - 60) + 60);
    heart_rate_values.push(heart_rate);
    breath_rate_values.push(breath_rate);

    label_heart.text(heart_rate.toString());
    label_breath.text(breath_rate.toString());
}

