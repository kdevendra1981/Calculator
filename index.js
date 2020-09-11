
//get the display screen element
let screen = document.querySelector("input");
let calcString = ''
let clrScreen = undefined
let myArray = []
let result = 0
let operator = document.getElementById("operator")

screen.addEventListener("input", () => {
    //if length of digits reaches 12 it will be blocked for editing so no more number are entered
    if (screen.value.length > 12) {
        screen.readOnly = true;
        console.log(screen.readOnly);
    }
})
//get all the buttons from calculator
let btns = document.getElementsByTagName("button")

//
let refresh = undefined //it will be true if you press "=", so that next value will come in new screen and will clear the calculation strint(calcString) and add only result to it
for (btn of btns) { //loop through all the buttons
    btn.addEventListener("click", (e) => {  //event will be fired if any button is pressed
        if (refresh) {
            screen.value = ''
            setTimeout(() => {
                myArray = [];
            }, 0);
            calcString = ''
            refresh = false;

        }
        if (clrScreen) {
            screen.value = ''
            clrScreen = false
        }
        btnText = e.target.innerText;  //this gets the inner text of the button which is pressed
        if (btnText == '.') {
            calcString = calcString.concat(".") //concatnate the "." to the digits to calcString
            screen.value += "."; //concatnate the "." to the digits to screen 
        }
        else if (btnText == 'C') {
            screen.value = '';
            calcString = ''
            operator.innerText = '';
            myArray = []
        }

        else if (btnText == '+') { clickOperators("+") }
        else if (btnText == '-') { clickOperators("-") }
        else if (btnText == 'x') { clickOperators("*") }
        else if (btnText == '÷') { clickOperators("/") }


        else if (btnText == '%' && calcString != "") {
            myArray.push(screen.value)
            screen.value = validateForScreen(eval(calcString) / 100)
            myArray.push("%")
            operator.innerText = "%"
            myArray.push(screen.value)
            calcString = eval(calcString) / 100
            recheckOb = recheck(myArray)
            refresh = true;
        }
        else if (btnText == '=') {
            myArray.push(screen.value)
            if (ifCalculatable(calcString)) { screen.value = Calculation(calcString) }
            myArray.push("=")
            myArray.push(screen.value)
            result = screen.value;
            operator.innerText = "="
            recheckOb = recheck(myArray)
            calcString = (screen.value == Infinity) ? "" : screen.value
            refresh = true;
        }
        else if (btnText == '') {
            if (screen.value != "") {
                calcString = calcString.slice(0, -1);
                screen.value = screen.value.slice(0, -1);

            }
        }
        else if (btnText == "Check") {
            operator.innerText = ''
            console.log('btnText :>> ', btnText);
            val = recheckOb.next().value;
            if (val != undefined) {
                screen.value = val
            }

        }
        else if (btnText != '%') {
            // if ((parseInt(btnText) >= 0) && (parseInt(btnText)< 10)){
            screen.value += btnText;
            calcString = calcString.concat(btnText)
            operator.innerText = '';
        }
        console.log('myArray :>> ', myArray);
        console.log('calcString :>> ', calcString);

    })
}

//checking if last charactor of calcString is an +,-,*,/, operator or not 
function checkIfLastCharSymbol(mystr) {
    if (Number.isInteger(parseInt(mystr.slice(-1))) || (mystr.slice(-1) == ".")) { return true }
    else { return false }
}

//calculation the result and also checking if the result fits is 12digit or not 
function Calculation(calString) {
    if (eval(calString) > 999999999999) {
        return eval(calString).toPrecision(2);
    } else if (eval(calString).toString().length > 12) {
        myString = eval(calString).toString();
        l = myString.length;
        pos = myString.indexOf(".");
        if (pos >= 12) {
            return eval(calString).toPrecision(2);
        }
        else if (pos > 0) {
            placesAfterDot = 12 - pos;
            return eval(calString).toFixed(placesAfterDot - 1);
        }
    }
    else {
        return eval(calString)
    }

}
//validating for % button if the result fits in 12 digits or not
function validateForScreen(calString) {
    if (eval(calString) > 999999999999) {
        return calString.toPrecision(2);
    } else if (calString.toString().length > 12) {
        myString = calString.toString();
        l = myString.length;
        pos = myString.indexOf(".");
        if (pos >= 12) {
            return calString.toPrecision(2);
        }
        else if (pos > 0) {
            placesAfterDot = 12 - pos;
            return calString.toFixed(placesAfterDot - 1);
        }
    }
    else {
        return calString
    }

}
function* recheck(myA) {
    console.log("Entered in function", myA)
    for (i = 0; i < myA.length; i++) {
        yield myA[i]
        if (i == myA.length - 1) { i = -1 }
    }
}

function ifCalculatable(str) {
    let re = /\d*.?\d*[+\-*/]{1}\d*.?\d*/;
    if (str.search(re) >= 0) {
        console.log("true")
        return true
    } else {
        console.log("false")
        return false
    }

}

function clickOperators(opr) {
    if (opr == '*') { symbol = "X" }
    else if (opr == "/") { symbol = "÷" }
    else (symbol = opr)
    if (calcString == "") {
        calcString = result
    }
    if (checkIfLastCharSymbol(calcString) && calcString != "") {
        if (ifCalculatable(calcString)) {
            myArray.push(screen.value)
            myArray.push("=")
            screen.value = Calculation(calcString);
            calcString = screen.value;
        }
        calcString = calcString.concat(opr)
        myArray.push(screen.value)
        myArray.push(symbol)
        operator.innerText = symbol;
        clrScreen = true;
    }
    else if (calcString != "") {
        calcString = calcString.slice(0, -1)
        if (ifCalculatable(calcString)) {
            // myArray.push("=")
            myArray.push(screen.value)
            screen.value = Calculation(calcString);
            calcString = screen.value;
        }
        calcString = calcString.concat(opr)
        myArray.push(screen.value)
        myArray.push(symbol)
        operator.innerText = symbol;
        clrScreen = true;
    }
}
console.log("Calculator")