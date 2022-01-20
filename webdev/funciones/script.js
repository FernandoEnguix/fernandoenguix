var dice = {
        sides: 6,
        roll: function() {
            var randomNumber = Math.floor(Math.random() * this.sides) + 1;
            return randomNumber
        }
    }
    //prints dice roll to the page

function printNumber(number) {
    var placeholder = document.getElementById('placeholder');
    var randomDeg = Math.floor(Math.random() * -45) + 1;
    placeholder.innerHTML = number;
    // if (number = 6) { placeholder.style.color = "red" };
    placeholder.style.transform = "rotate(" + randomDeg + "deg)"
}


var button = document.getElementById('button');

button.onclick = function() {
    var result = dice.roll();
    printNumber(result);
};