const choices = document.querySelectorAll('.choice');
let user_score = 0;
let comp_score = 0;

choices.forEach(btn => {
    btn.addEventListener('click', selectChoice);
});

function selectChoice() {
    const options = ['rock', 'paper', 'scissors'];
    // Computer
    let x = Math.floor((Math.random() * 3));
    let comp = options[x];
    let comp_path = `<img src="Assets/${comp}.png">`;
    document.querySelector(".computer-selection").innerHTML = comp_path;

    // User
    let you = this.id;
    let you_path = `<img src="Assets/${you}.png">`;
    document.querySelector(".user-selection").innerHTML = you_path;

    // Game Conditions
    if (you == comp) {
        user_score += 1;
        comp_score += 1;
    }
    else {
        if (you === "rock") {
            if (comp === "paper") {
                comp_score += 1;
            }
            else if (comp === "scissors") {
                user_score += 1;
            }
        }
        else if (you === "paper") {
            if (comp === "rock") {
                user_score += 1;
            }
            else if (comp === "scissors") {
                comp_score += 1;
            }
        }
        else if (you === "scissors") {
            if (comp === "rock") {
                comp_score += 1;
            }
            else if (comp === "paper") {
                user_score += 1;
            }

        }
    }
    document.getElementById("user-score").innerText = user_score;
    document.getElementById("computer-score").innerText = comp_score;

}


