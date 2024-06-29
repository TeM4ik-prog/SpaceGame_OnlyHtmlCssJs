let XPos = 0
let YPos = 0
let plORmin_X = "minus"
let plORmin_Y = "minus"
let speed_screen = window.innerWidth / 20


let rand_time = Math.floor(3 + Math.random() * (5 - 3))


let background_fly_X = setInterval(() => {
    change_cordX(plORmin_X)
}, 500);


let background_fly_Y = setInterval(() => {
    change_cordY(plORmin_Y)
}, 500);




let X_run = setInterval(() => {

    let rand_nX = Math.round(0 + Math.random() * (1 - 0))

    if (rand_nX == 0) {
        let rand_speed = Math.floor(100 + Math.random() * (400 - 100))
        console.log("X:" + rand_nX)
        if (plORmin_X == "minus") {
            clearInterval(background_fly_X)
            plORmin_X = "plus"
            background_fly_X = setInterval(() => {
                change_cordX(plORmin_X)
            }, rand_speed);
        }
        else {
            clearInterval(background_fly_X)
            plORmin_X = "minus"
            background_fly_X = setInterval(() => {
                change_cordX(plORmin_X)
            }, rand_speed);
        }
    }

}, rand_time * 1000);

let Y_run = setInterval(() => {
    let rand_nY = Math.round(0 + Math.random() * (1 - 0))
    console.log("Y:" + rand_nY)
    if (rand_nY == 0) {
        let rand_speed = Math.floor(300 + Math.random() * (600 - 300))
        if (plORmin_Y == "minus") {
            clearInterval(background_fly_Y)
            plORmin_Y = "plus"
            background_fly_Y = setInterval(() => {
                change_cordY(plORmin_Y)
            }, rand_speed);
        }
        else {
            clearInterval(background_fly_Y)
            plORmin_Y = "minus"
            background_fly_Y = setInterval(() => {
                change_cordY(plORmin_Y)
            }, rand_speed);
        }
    }
}, rand_time * 1000);


function change_cordX(plORmin_X) {
    if (plORmin_X == "plus") {
        XPos -= speed_screen
    }
    else {
        XPos += speed_screen
    }
    all.style.backgroundPositionX = XPos + "px";
}

function change_cordY(plORmin_Y) {
    if (plORmin_Y == "plus") {
        YPos -= speed_screen
    }
    else {
        YPos += speed_screen
    }
    all.style.backgroundPositionY = YPos + "px";
}

///////////////////////////////////////////////////
function play_game() {
    window.location = "space_game.html"
    sessionStorage.clear()
}
new_game.addEventListener("click", function () {
    play_game()
    sessionStorage.setItem("players", 1)
})
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 32) {
        play_game()
    }
})

multiplayer.addEventListener("click", function () {
    statistic_screen.style.visibility = "visible"

    setTimeout(() => {
        all.addEventListener("click", function stat_hide() {
            let players_class = document.querySelectorAll(".player,.text_bytt_space_player")
            for (let i = 0; i < players_class.length; i++) {
                players_class[i].style.transition = "0s"
                setTimeout(() => {
                    players_class[i].style.transition = "0.5s"
                }, 500);

            }

            statistic_screen.style.visibility = "hidden"
            all.removeEventListener("click", stat_hide)
        })
    }, 0);

})
let play = document.querySelectorAll(".player")

play.forEach(but => {
    but.addEventListener("click", function (event) {

        if ((event.target).id == "2p" || "3p" ) {
            sessionStorage.setItem("players", parseInt(event.target.id))
            window.location = "space_game.html"
            console.log(sessionStorage)

        
        }
        if ((event.target).id == "4p") {
            window.location = "main space_game.html"
            alert("Недоступно")
        }
    })
})




if (sessionStorage.getItem("isKilled") == "true") {
    info.style.visibility = "visible"
    your_score.innerText = "ВАШ СЧЕТ:" + localStorage.getItem('score_space')
}