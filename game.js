var ButtonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

//create pattern array
var userClickedPattern = [];


var Level = 0;
function nextSequence(){
    userClickedPattern = [];
    Level++;
    $("#level-title").text("Level " + Level);

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);

    //extract the color
    var randomChosenColour = ButtonColors[randomNumber];

    //push the choosen color into new array gamePattern
    gamePattern.push(randomChosenColour);

    //animate flash
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    //play audio
    makeSound(randomChosenColour);
}

$(".btn").click(function(){

    //extract id
    var userChosenColor = $(this).attr("id");
    //store pattern on click
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);

    //make sound
    makeSound(userChosenColor);
    animate(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function makeSound(onClickColor){
    var audio = new Audio("https://github.com/hrithikgarg/simon-game/blob/main/"+onClickColor + ".mp3");
    audio.play();   
}

function animate(color){
    var button = $("#" + color);
    button.addClass("pressed");
    setTimeout(function(){
        button.removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel] !== gamePattern[currentLevel]){

       makeSound("wrong");
       
       $("body").addClass("game-over");
       setTimeout(function(){
            $("body").removeClass("game-over");
        },'200');
        $("#level-title").text("Game Over, Press Any Key to Restart");

        isCalled = true;
        Level = 0;
        gamePattern = [];
   }
   else if(gamePattern.length === userClickedPattern.length){
      setTimeout(() => {nextSequence();
    }, 1000);
   }

}
//call the function when user press any key
var isCalled = true;
$("body").keypress(function(){
    if(isCalled){
        nextSequence();
        isCalled = false;
    }
});

