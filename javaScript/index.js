var timeControl = 0;
var level = 1;
var moves;
var movesPlayed = 0;
var generatedPattern = [];
var userPattern = [];

var buttonSize = 160;
var gap = 60;
var margin = 50;
var margin2 = 50;

var w = $(window).width();
var y = $(window).height();

if (w < 500) {
    buttonSize = 150;
    gap = 20;
    $(".base-container").css("padding", "20px");
    $(".main-heading h1").text("Press it");
    $(".main-heading h1").css("font-size", "4rem");

}

var initialLengthTop = (y / 2) - (buttonSize / 2) + margin;
var initialLengthLeft = (w / 2) - (buttonSize / 2);

var topLength1 = (y / 2) - ((2 * buttonSize + gap) / 2) + margin2;
var topLength2 = (y / 2) + (gap / 2) + margin2;
var leftLength1 = (w / 2) - ((2 * buttonSize + gap) / 2);
var leftLength2 = (w / 2) + (gap / 2);



$(".play-buttons div").css("width", buttonSize + "px");
$(".play-buttons div").css("height", buttonSize + "px");
$(".play-buttons div").css("top", initialLengthTop + "px");
$(".play-buttons div").css("left", initialLengthLeft + "px");

assignInitialEventListeners();



function gameLoop() {
    loadLevelName(level);
    generateSequence(level);
    animateSequence();
}

function resetVariables() {
    timeControl = 0;
    moves = 0;
    movesPlayed = 0;
    generatedPattern = [];
    userPattern = [];
}

function displayScore(score) {
    $(".main-heading h1").fadeOut();
    setTimeout(function () {
        $(".main-heading h1").text("You Scored " + score + " Points");
        $(".main-heading h1").fadeIn();
    }, 600);
    var audio = new Audio("sounds/end.mp3");
    audio.play();
    $(".button-one-pos").addClass("glow-red");
    $(".button-two-pos").addClass("glow-green");
    $(".button-three-pos").addClass("glow-yellow");
    $(".button-four-pos").addClass("glow-blue");
}

function checkAnswer() {
    for (var k = 0; k < moves; ++k) {
        if (generatedPattern[k] !== userPattern[k]) {
            return 0;
        }
    }
    return 1;
}

function assignGameEventListeners() {
    var eventDecideDown;
    var eventDecideUp;
    if(w<500){
        eventDecideDown="touchstart";
        eventDecideUp="touchend";
    }
    else{
        eventDecideDown="mousedown";
        eventDecideUp="mouseup";
    }
    $(".button-one-pos").on(eventDecideDown, function () {
        $(".button-one-pos").addClass("glow-red");
        var audio = new Audio("sounds/red.mp3");
        audio.play();
    });

    $(".button-one-pos").on(eventDecideUp, function () {
        $(".button-one-pos").removeClass("glow-red");
        userPattern.push(1);
        ++movesPlayed;
        if (movesPlayed === moves) {
            removeGameEventListeners();
            if (checkAnswer() === 0) {
                displayScore((level - 1) * 10);
                level = 0;
                resetVariables();
            }
            else {
                resetVariables();
                ++level;
                gameLoop();
            }
        }
    });

    $(".button-two-pos").on(eventDecideDown, function () {
        $(".button-two-pos").addClass("glow-green");
        var audio = new Audio("sounds/green.mp3");
        audio.play();
    });

    $(".button-two-pos").on(eventDecideUp, function () {
        $(".button-two-pos").removeClass("glow-green");
        userPattern.push(2);
        ++movesPlayed;
        if (movesPlayed === moves) {
            removeGameEventListeners();
            if (checkAnswer() === 0) {
                displayScore((level - 1) * 10);
                level = 0;
                resetVariables();
            }
            else {
                resetVariables();
                ++level;
                gameLoop();
            }
        }
    });

    $(".button-three-pos").on(eventDecideDown, function () {
        $(".button-three-pos").addClass("glow-yellow");
        var audio = new Audio("sounds/yellow.mp3");
        audio.play();
    });

    $(".button-three-pos").on(eventDecideUp, function () {
        $(".button-three-pos").removeClass("glow-yellow");
        userPattern.push(3);
        ++movesPlayed;
        if (movesPlayed === moves) {
            removeGameEventListeners();
            if (checkAnswer() === 0) {
                displayScore((level - 1) * 10);
                level = 0;
                resetVariables();
            }
            else {
                resetVariables();
                ++level;
                gameLoop();
            }
        }
    });

    $(".button-four-pos").on(eventDecideDown, function () {
        $(".button-four-pos").addClass("glow-blue");
        var audio = new Audio("sounds/blue.mp3");
        audio.play();
    });

    $(".button-four-pos").on(eventDecideUp, function () {
        $(".button-four-pos").removeClass("glow-blue");
        userPattern.push(4);
        ++movesPlayed;
        if (movesPlayed === moves) {
            removeGameEventListeners();
            if (checkAnswer() === 0) {
                displayScore((level - 1) * 10);
                level = 0;
                resetVariables();
            }
            else {
                resetVariables();
                ++level;
                gameLoop();
            }
        }
    });
}

function animateSequence() {
    setTimeout(function () {
        timeControl = 0;
        for (var k = 0; k < moves; ++k) {
            glowButton(generatedPattern[k]);
        }
        setTimeout(function () {
            timeControl = 0;
            updateLevelName(level);
        }, timeControl + 200);
    }, timeControl + 1500);
}

function updateLevelName(num) {
    $(".main-heading h1").fadeOut();
    setTimeout(function () {
        $(".main-heading h1").text("Level " + num + " : Now Repeat");
        $(".main-heading h1").fadeIn();
        assignGameEventListeners();
    }, timeControl + 600);
    timeControl += 600;
}

function glowButton(num) {
    setTimeout(function () {
        switch (num) {
            case 1: $(".button-one-pos").addClass("glow-red");
                var audio = new Audio("sounds/red.mp3");
                audio.play();
                setTimeout(function () {
                    $(".button-one-pos").removeClass("glow-red");
                }, 500);
                break;

            case 2: $(".button-two-pos").addClass("glow-green");
                var audio = new Audio("sounds/green.mp3");
                audio.play();
                setTimeout(function () {
                    $(".button-two-pos").removeClass("glow-green");
                }, 500);
                break;

            case 3: $(".button-three-pos").addClass("glow-yellow");
                var audio = new Audio("sounds/yellow.mp3");
                audio.play();
                setTimeout(function () {
                    $(".button-three-pos").removeClass("glow-yellow");
                }, 500);
                break;

            case 4: $(".button-four-pos").addClass("glow-blue");
                var audio = new Audio("sounds/blue.mp3");
                audio.play();
                setTimeout(function () {
                    $(".button-four-pos").removeClass("glow-blue");
                }, 500);
                break;

            default: alert("Error - glowButton - Switch statement");
        }
    }, timeControl);
    timeControl += 1000;
}

function assignInitialEventListeners() {
    $(".play-buttons div").on("touchend", function () {
        startingAnimation("Get Ready");
        $(document).off();
        removeGameEventListeners();
        setTimeout(function () {
            timeControl = 0;
            gameLoop();
        }, timeControl + 1500);
    });

    $(".play-buttons div").on("click", function () {
        startingAnimation("Get Ready");
        $(document).off();
        removeGameEventListeners();
        setTimeout(function () {
            timeControl = 0;
            gameLoop();
        }, timeControl + 1500);
    });

    $(document).on("keypress", function (event) {
        if (event.key === "a" || event.key === "A") {
            startingAnimation("Get Ready");
            $(document).off();
            removeGameEventListeners();
            setTimeout(function () {
                timeControl = 0;
                gameLoop();
            }, timeControl + 1500);
        }
    });
}

function removeGameEventListeners() {
    $(".play-buttons div").off();
}

function generateSequence(x) {
    moves = x;
    var buttonNumber;
    for (var i = 1; i <= moves; ++i) {
        buttonNumber = Math.floor(Math.random() * 4 + 1);
        generatedPattern.push(buttonNumber);
    }
}

function loadLevelName(num) {
    $(".main-heading h1").fadeOut();
    setTimeout(function () {
        $(".main-heading h1").text("Level " + num);
        $(".main-heading h1").fadeIn();
    }, timeControl + 600);
    timeControl += 600;
}

function startingAnimation(headstr) {

    $(".base").animate({ padding: "20px" });
    if (w < 500) {
        $(".main-heading h1").animate({ fontSize: "3rem" });
    }
    else {
        $(".main-heading h1").animate({ fontSize: "3.2rem" });
    }
    $(".main-heading h1").fadeOut();
    $(".play-buttons div").addClass("neumorphicity-convex");

    $(".button-one-pos").animate({
        top: topLength1,
        left: leftLength1
    });
    $(".button-two-pos").animate({
        top: topLength1,
        left: leftLength2
    });
    $(".button-three-pos").animate({
        top: topLength2,
        left: leftLength1
    });
    $(".button-four-pos").animate({
        top: topLength2,
        left: leftLength2
    });

    colorAnimation();

    setTimeout(function () {
        timeControl = -600;

        colorAnimation();

        setTimeout(function () {
            $(".button-two-pos").addClass("glow-green");
        }, (timeControl + 100));

        timeControl += 100;

        setTimeout(function () {
            $(".button-two-pos").removeClass("glow-green");
        }, timeControl + 100);
        timeControl += 100;
    }, timeControl + 100);

    timeControl += 100;

    setTimeout(function () {
        $(".main-heading h1").text(headstr);
        $(".main-heading h1").fadeIn();

    }, timeControl + 500);

    timeControl += 500;
}

function colorAnimation() {

    var initialDelay = timeControl + 600;
    var differenceDelay = 100;

    setTimeout(function () {
        $(".button-two-pos").addClass("glow-green");
    }, initialDelay);

    timeControl = 0;
    timeControl += initialDelay;

    setTimeout(function () {
        $(".button-two-pos").removeClass("glow-green");
    }, timeControl + differenceDelay);

    setTimeout(function () {
        $(".button-one-pos").addClass("glow-red");
    }, timeControl + differenceDelay);

    timeControl += differenceDelay;

    setTimeout(function () {
        $(".button-one-pos").removeClass("glow-red");
    }, timeControl + differenceDelay);

    setTimeout(function () {
        $(".button-three-pos").addClass("glow-yellow");
    }, timeControl + differenceDelay);

    timeControl += differenceDelay;

    setTimeout(function () {
        $(".button-three-pos").removeClass("glow-yellow");
    }, timeControl + differenceDelay);

    setTimeout(function () {
        $(".button-four-pos").addClass("glow-blue");
    }, timeControl + differenceDelay);

    timeControl += differenceDelay;

    setTimeout(function () {
        $(".button-four-pos").removeClass("glow-blue");
    }, timeControl + differenceDelay);
}
