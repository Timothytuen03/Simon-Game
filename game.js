var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var inGame = false;
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    level++;
    $("h1").text("Level " + level);

    playSound(randomChosenColor);
    $("." + randomChosenColor).animate({opacity: 0.5});
    $("." + randomChosenColor).animate({opacity: 1});
    userClickedPattern = [];
}

$(".btn").on("click", function(event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
    switch (name) {
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        default:
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            break;
    }
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");
        if(currentLevel === level-1) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    inGame = false;
}

$(document).on("keydown", function() {
    if(!inGame) {
        inGame = true;
        $("h1").text("Level 0");
        nextSequence();
    }
})
