// SELECT ELEMENTS

const rollBtn = document.getElementById('roll');
const dice = document.getElementsByClassName("dice");


// EVENT LISTENERS

rollBtn.addEventListener('click', roll)

// FUNCTIONS

function roll(){
    console.log(Math.floor(Math.random() * (9861 - 9856 + 1) + 9856))
    for (side of dice){
    side.innerHTML = `&#${Math.floor(Math.random() * (9861 - 9856 + 1) + 9856)};`
    }
}
