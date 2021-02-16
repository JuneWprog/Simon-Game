var count=0; 
var numToColor={0:"green",1:"red",2:"yellow",3:"blue"};
var gameOrder=[];
var userOrder=[];
var started=false;



//press any key to start game
$(document).on("keypress",function(){
    if (!started){
    $("#level-title").text("Level "+count);
    nextSequence();
    started=true;
    }
});


$(".btn").click(function(e){
    // button click effect (sound/animation)
    clickedBtn=e.target.id;
    makeSound(clickedBtn);
    animation(clickedBtn);
    userOrder.push(clickedBtn);
    checkAnswer(userOrder.length-1,clickedBtn);

});




function checkAnswer(currentLevel,clickedBtn){
    if(gameOrder[currentLevel]===userOrder[currentLevel]){
        if (userOrder.length===gameOrder.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        
        makeSound("wrong");
        makeSound(clickedBtn);
        animation(clickedBtn);
        //change background color

    $("body").addClass("wrong");
    $("#level-title").html("Game Over, Press Any Key to Restart")
    setTimeout(function(){
     $("body").removeClass("wrong");
    },200);

    startOver();
    }
}


function nextSequence(){
    count++;
    userOrder=[];
    $("#level-title").text("Level "+count);
    //generate a random number, find the color value in dictionary
        selectedBtn=numToColor[randomFactory()]
       //save  color button to array 
        gameOrder.push(selectedBtn);
        console.log(gameOrder);
    //button animation to remind user the selected button
    $("#" + selectedBtn).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(selectedBtn);
      
}





//decide which is the next random button
function randomFactory(){
    return Math.floor(Math.random()*4);
}

//add sound effect to buttons
function makeSound(buttonClicked){
    audio=new Audio("sounds/"+buttonClicked+".mp3");
    audio.play();
}
//add animation effect to buttons
function animation(buttonClicked){
    $("#"+buttonClicked).addClass("pressed");
    setTimeout(function(){$("#"+buttonClicked).removeClass("pressed")},100);
}

function startOver(){
    count=0;
    gameOrder=[]; 
    started=false;
}

