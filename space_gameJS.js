let myDiv = document.getElementById("myDiv");
let bullet_fly_value = 0
let backgroundPosition = 0;
let slow_boost_time_down = 6;
let snow_boost_time = 8000//действие замедляющего бонуса
let time_to_superPower = 10000 + 100
let time_use_superPower = 5000
let add_lifes = 15
let damage = 1

let slow_boost_use = false

const body = document.querySelector('body')
const Max_amplitude = window.innerWidth / 20//не используется
const Min_amplitude = Max_amplitude / 3
const shake_speed = 300

let value_all_bullets = 0
let score = 0

let need_bullet
let can_use_boost = false
let boosted = false

let screen_delete_bullet
let screen_speed = 50//скорости движения заднего фона

let XPos = 0
let YPos = 0
let min_cord = ship_speed = window.innerWidth / 40
// myDiv.style.transform = "rotate3d(1, 2, 0, 30deg)";

/////////////
let Ar_color_ships = ["spaceship-red.png", "spaceship-yellow.png", "spaceship-green.png"]
let Ar_color_meteors = ["meteor.png", "meteor-blue.png", "meteor-green.png"]

let number_players = 1

let need_players = parseInt(sessionStorage.getItem("players"))
for (let p = 0; p < need_players - 1; p++) {
    number_players++
    let copy_ship = myDiv.cloneNode(true)
    copy_ship.id = "myDiv" + number_players

    let ship_in = copy_ship.querySelector("#ship")
    ship_in.id = "ship" + number_players

    let bullet_in = copy_ship.querySelector("#bullet_cube")
    bullet_in.id = "bullet_cube" + number_players


    let need_img = copy_ship.querySelector('img')
    need_img.src = './public/' + Ar_color_ships[number_players - 2]

    allScreen.appendChild(copy_ship)

    let id_need = "myDiv" + number_players
}
Player_ship(37, 39, 38, 40, myDiv, 17)
if (need_players >= 2) {
    Player_ship(65, 68, 87, 83, myDiv2, 20)
    myDiv2.style.left = "10%"

}
if (need_players == 3) {
    Player_ship(66, 77, 72, 78, myDiv3, 86)
    myDiv3.style.left = "80%"
}

//////////

function Player_ship(leftB, rightB, topB, bottomB, needShip, atackB) {

    document.addEventListener("keydown", function (event) {


        let ship_speed
        let player_cords = needShip.getBoundingClientRect()
        if (player_cords.left + needShip.clientWidth >= window.innerWidth) {
            needShip.style.left = parseInt(needShip.style.left) - min_cord + "px"
        }
        else if (player_cords.left - needShip.clientWidth / 2 <= 0) {
            needShip.style.left = parseInt(needShip.style.left) + min_cord + "px"
        }
        else if (player_cords.top + needShip.clientHeight >= window.innerHeight) {
            needShip.style.top = parseInt(needShip.style.top) - min_cord + "px"
        }
        else if (player_cords.top - needShip.clientHeight / 2 <= 0) {
            needShip.style.top = parseInt(needShip.style.top) + min_cord + "px"
        }
        else {
            ship_speed = window.innerWidth / 20
        }

        if (event.keyCode === leftB) {
            needShip.style.left = needShip.getBoundingClientRect().left - ship_speed + "px";
            XPos += screen_speed
            allScreen.style.backgroundPositionX = XPos + "px";
        }
        else if (event.keyCode === rightB) {
            needShip.style.left = needShip.getBoundingClientRect().left + ship_speed + "px";
            XPos -= screen_speed
            allScreen.style.backgroundPositionX = XPos + "px";
        }
        ///////////////////////////////////
        else if (event.keyCode === topB) {
            needShip.style.top = needShip.getBoundingClientRect().top - ship_speed + "px";
            YPos += screen_speed
            allScreen.style.backgroundPositionY = YPos + "px";
        }
        else if (event.keyCode === bottomB) {
            needShip.style.top = needShip.getBoundingClientRect().top + ship_speed + "px";
            YPos -= screen_speed
            allScreen.style.backgroundPositionY = YPos + "px";
        }

        /////////////////

        else if (event.keyCode === atackB) {
            value_all_bullets++
            let bullet_need = document.getElementById("bullet_cube")
            need_bullet = bullet_need.cloneNode(true)
            need_bullet.id = "bullet_cube" + value_all_bullets
            need_bullet.style.position = "absolute"
            need_bullet.style.transform = ""
            need_bullet.style.left = needShip.getBoundingClientRect().left + needShip.clientWidth / 2 + "px"
            need_bullet.style.top = needShip.getBoundingClientRect().top + needShip.clientHeight / 3 + "px"
            need_bullet.style.width = "2%"

            allScreen.appendChild(need_bullet)
            bullet_fly_value++

            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setTimeout(() => {
                need_bullet.style.top = scrollTop - need_bullet.height * 2 + "px"
            }, 10);

            let bullet_delete = document.getElementById("bullet_cube" + value_all_bullets)
            screen_delete_bullet = setTimeout(() => {
                allScreen.removeChild(bullet_delete)
            }, 2000);
        }

    })
}
//лево, право, верх, низ , э-т,атака


function addXp() {
    for (let i = 0; i < add_lifes - 1; i++) {//сколько вы хотите жизней -1
        let clone_name = document.getElementById("xp")
        let clone = clone_name.cloneNode(true)
        console.log(add_lifes)
        xp_all.appendChild(clone)
    }
}
addXp()

let parent = document.getElementById("xp_all")
let childs = parent.childNodes
let last_elem = childs.length - 1

function Damage(damage) {
    for (let i = 0; i < damage; i++) {
        xp_all.childNodes[last_elem].style.backgroundColor = 'black'

        last_elem--
        if (last_elem <= -1) {
            saveInfo()
        }
    }
}

let number_meteors = 0
function add_meteors() {
    number_meteors++
    let meteor_need = document.getElementById("meteor")

    let clone_meteor = meteor_need.cloneNode()
    let rand_size = Math.floor(3 + Math.random() * (10 - 3))
    let rand_speed
    if (slow_boost_use == true) {
        rand_speed = 8000
    }
    else {
        rand_speed = Math.floor(2000 + Math.random() * (4000 - 2000))
    }
    let rand_numb = Math.floor(0 + Math.random() * (Ar_color_meteors.length - 0))
    clone_meteor.src = "./public/" + Ar_color_meteors[rand_numb]


    clone_meteor.id = "meteor" + number_meteors
    clone_meteor.style.visibility = "visible"
    clone_meteor.style.width = rand_size + "%"
    clone_meteor.style.transition = `all ${rand_speed}ms cubic-bezier(0.24, 0.03, 0.77, 0.49)`

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    clone_meteor.style.top = (scrollTop - clone_meteor.height) + "px"
    clone_meteor.style.left = (Math.floor(clone_meteor.clientWidth + Math.random() * (window.innerWidth - clone_meteor.clientWidth))) + "px"

    allScreen.appendChild(clone_meteor)
    setTimeout(() => {
        clone_meteor.style.top = window.innerHeight + "px"
    }, 150);


    function Check_collision(clone_meteor) {
        if (boosted === false) {
            let ships_cords = document.querySelectorAll(".css_ships")

            for (let k = 0; k < ships_cords.length; k++) {
                let ship_cords = ships_cords[k].getBoundingClientRect()

                let meteors_cords = clone_meteor.getBoundingClientRect()

                if (ship_cords.right >= meteors_cords.left &&
                    ship_cords.left <= meteors_cords.right &&
                    ship_cords.bottom >= meteors_cords.top &&
                    ship_cords.top <= meteors_cords.bottom) {

                    allScreen.removeChild(clone_meteor)
                    Damage(damage)
                }
            }
        }
    }
    setInterval(() => {
        Check_collision(clone_meteor)
    }, 10);

    function collision_To_bullet(clone_meteor) {
        let AllBullets = document.querySelectorAll('.css_bullets');
        for (let i = 0; i < AllBullets.length; i++) {
            let need_bullet_elem = AllBullets[i]

            let meteor_cords = clone_meteor.getBoundingClientRect();
            let bullet_cords = need_bullet_elem.getBoundingClientRect()

            if (bullet_cords.right >= meteor_cords.left &&
                bullet_cords.left <= meteor_cords.right &&
                bullet_cords.bottom >= meteor_cords.top &&
                bullet_cords.top <= meteor_cords.bottom) {

                allScreen.removeChild(delete_meteor)
                allScreen.removeChild(need_bullet_elem)
                clearTimeout(screen_delete)
                clearTimeout(screen_delete_bullet)
                score += 3
            }
        }
    }
    setInterval(() => {
        collision_To_bullet(clone_meteor)
    }, 10);
    let delete_meteor = document.getElementById("meteor" + number_meteors)
    let screen_delete = setTimeout(() => {
        allScreen.removeChild(delete_meteor)
        score++
    }, rand_speed + 300);
}


function boost() {
    accumulation_cube.style.transition = `all ${time_to_superPower}ms linear`
    setTimeout(() => {
        accumulation_cube.style.bottom = "0%"
    }, 100);

    setTimeout(() => {
        can_use_boost = true
        superPower.style.borderColor = "blue;"
    }, time_to_superPower);
}
boost()

document.addEventListener("keydown", function (event) {
    if (can_use_boost == true) {
        if (event.keyCode === 16) {
            boosted = true

            accumulation_cube.style.transition = `all ${time_use_superPower}ms linear`
            accumulation_cube.style.bottom = "-100%"

            setTimeout(() => {
                All_light.style.visibility = "visible"
                All_light.style.boxShadow = "0px 0px 250px 50px rgba(219, 6, 6, 1)"
            }, 100);

            can_use_boost = false
            setTimeout(() => {
                All_light.style.visibility = "hidden"
                boost()
                boosted = false
            }, time_use_superPower + 1000);

        }
    }

})

function boost_slow() {
    snowflake.style.transition = "0s"
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    snowflake.style.visibility = "visible"

    snowflake.style.top = (scrollTop - snowflake.height) + "px"
    snowflake.style.left = (Math.floor(snowflake.clientWidth + Math.random() * (window.innerWidth - snowflake.clientWidth))) + "px"
    snowflake.style.visibility = "visible"

    snowflake.style.transition = `all ${slow_boost_time_down}s linear`
    setTimeout(() => {
        snowflake.style.top = window.innerHeight + "px"
    }, 100);


}
let rand_timeout = Math.floor(10000 + Math.random() * (15000 - 10000))
setInterval(() => {
    boost_slow()
}, rand_timeout);



function checkCollision_slow_boost() {
    let Ar_ships = document.querySelectorAll(".css_ships")

    for (let f = 0; f < Ar_ships.length; f++) {
        let ship_cords = Ar_ships[f].getBoundingClientRect()
        let slowBoost_cords = snowflake.getBoundingClientRect()
        if (ship_cords.right >= slowBoost_cords.left &&
            ship_cords.left <= slowBoost_cords.right &&
            ship_cords.bottom >= slowBoost_cords.top &&
            ship_cords.top <= slowBoost_cords.bottom) {


            snowflake.style.transition = "0s"
            snowflake.style.top = "110%"


            All_light.style.boxShadow = "0px 0px 150px 30px rgba(255, 255, 255, 0.5)"
            All_light.style.visibility = "visible"

            slow_boost_use = true

            setTimeout(() => {
                slow_boost_use = false
                All_light.style.visibility = "hidden"
            }, snow_boost_time);
        }
    }
}

setInterval(() => {
    checkCollision_slow_boost()
}, 100);



exit.addEventListener("click", function () {
    saveInfo()
})

function saveInfo() {
    localStorage.setItem("score_space", score)
    sessionStorage.setItem("isKilled", true)
    window.location = "index.html"
}

setInterval(() => {
    add_meteors()
}, 500);

setInterval(() => {
    score_text.innerText = "Счет:" + score
}, 200);