// Deklaration als String. Bei Variante A: Zahl (0). 
let currentNum = "";
let previousNum = "";
let operator = ""; 

const currentDisplayNumber = document.querySelector(".currentNumber");
const previousNumberDisplayNumber = document.querySelector(".previousNumber");

// eventlistener für das registrieren von Keyboardeingaben. 
window.addEventListener("keydown", handleKeyPress)

const equal = document.querySelector(".equal");
// equal.addEventListener("click", calculate);
equal.addEventListener("click", () => {
    if(currentNum != "" && previousNum != ""){
        calculate();
    }
});

const deciaml = document.querySelector(".decimal");
deciaml.addEventListener("click", () => {
    addDecimal(); 
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator)

const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator"); 

//HANDLE NUMBER SECTION
/* Jeder Buttons erhält einen EventListener, 
welches eine weiter Funktion "handleNumber" erhählt. */
numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // VARIANTE B 1.0 
        // Inhalt vom e.target wird als STRING Argument weitergeiletet.
        handleNumber(e.target.textContent)
        // VARIANTE A 1.0
        // Wenn der textliche Inhalt direkt als Zahl konventiert werden sollte. 
            // const clickedNumber = Number(e.target.textContent); 
            // console.log("Clicked Number:", clickedNumber);
            // handleNumber(clickedNumber); // ALTERNATIVE  handleNumber(Number(e.target.textContent));
    });
});

// VARIANTE A 1.1
// function handleNumber(number){
    //Entfernen der if-condition, weil in dem Fall wo das Argument eine Zahl ist überprüft wird, ob die Zahl kleiner 11 ist.    
    // console.log("Clicked Number:", number);
    // currentNum += +number; // Die Zahlen werden direkt summiert, was kein Sinn macht. 
    // currentDisplayNumber.innerHTML = currentNum; 
    // Beim Setzen von .innerHTML wird der vorhandene Inhalt des Elements durch den neuen HTML-Inhalt ersetzt.
    // Die .innerHTML-Eigenschaft gibt den HTML-Inhalt eines Elements zurück oder setzt ihn.
    //};
// };

// VARIANTE B1.1
function handleNumber(number){
    if(previousNum !== "" && currentNum !== "" && operator === ""){
        previousNum = "";
        currentDisplayNumber.textContent = currentNum; 
    }
    if (currentNum.length <= 11){ //Solange die Zeichenkette kleiner, gleich 11 ist kann eine weitere Zahl eingegeben werden. 
    currentNum += number; // += setzt bei Strings die Chars. hintereinander. 
    currentDisplayNumber.textContent = currentNum; 

    /*
    Die .textContent-Eigenschaft gibt den Textinhalt eines Elements zurück oder setzt ihn.
    Wenn Sie .textContent verwenden, wird der Textinhalt des Elements als reiner Text behandelt, und HTML-Tags werden als Text betrachtet, nicht als Markup.
    Beim Setzen von .textContent wird der vorhandene Inhalt des Elements durch den neuen Textinhalt ersetzt.
    */ 
    };
};


//OPERATOR SECTION
operators.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    });
});



function handleOperator(op){

    if(previousNum === ""){
        previousNum = currentNum; 
        operatorCheck(op);
    } else if (currentNum === ""){
        operatorCheck(op);
    } else {
        // Nachtrag
        // Nach dem erhalt eines Ergebnis, möchte ich mit dieser weiter arbeiten 
        // Rechne bei Klick auf Operator alles zusammen und setzte die currentNum auf 0
        // Erneut Zahl auswählen und equal regelt den Rest. 
        calculate();
        operator = op; 
        currentDisplayNumber.textContent = "0";
        previousNumberDisplayNumber.textContent = previousNum + " " + operator; 
    }
}


function operatorCheck(text){
    operator = text; 
    previousNumberDisplayNumber.textContent = previousNum + " " + operator; 
    // Reset for new number
    currentDisplayNumber.textContent = "0";
    // Reset for new number 
    currentNum = ""; 
}


//CALCULATE SECTION
function calculate(){
    //Zeichenkette von String zu Nummer konventieren
    previousNum = Number(previousNum); 
    currentNum = Number(currentNum); 

    //Kalkulation durchführen
    if (operator === "+"){
        previousNum += currentNum; 
    } else if (operator === "-"){
        previousNum -= currentNum;
    } else if (operator === "x"){
        previousNum *= currentNum;
    } else if (operator === "/"){
        if (currentNum <= 0){
            previousNum = "Error";
            displayResults();
            return; //Wird sofort mit "return" beendet, Funktion wird sofort verlassen damit "Error" ausgegeben wird. 
        }
        previousNum /= currentNum;
    }
    previousNum = roundNumber(previousNum); 
    previousNum = previousNum.toString(); // Zeile wieder zurück als String formatieren 
    displayResults();
}

function roundNumber(num){
    return Math.round(num * 100000) / 100000;
}

//Anzeige von Ergebnis wird öfters benötigt, demnach als weitere Funktion definiert. 
// Weitere Kondition einbauen, um Result zu regulieren (z.B. Pi)
function displayResults(){
  
    if (previousNum.length <= 11){
        currentDisplayNumber.textContent = previousNum;     
    } else {
        currentDisplayNumber.textContent = previousNum.slice(0,11) + "..."; //Falls Ergebnis länger als 11 Zeichen ist.     
    }
      //Zeile reseten und Lösung anzeigen 
      previousNumberDisplayNumber.textContent = "";
      operator = ""; //Reset Operator
      currentNum =""; 
}

function clearCalculator(){
    currentNum = ""; 
    previousNum = ""; 
    operator = ""; 
    currentDisplayNumber.textContent = "0"; 
    previousNumberDisplayNumber = ""; 
}


function addDecimal() {
    // Wenn current number kein "," besitzt, führe die function aus. 
    if(!currentNum.includes('.')){
        currentNum += "."; 
        currentDisplayNumber.textContent = currentNum; 
    }
}



// Bug: Key-Operators do not react... enter and backspace, too. 
function handleKeyPress(e) {
    e.preventDefault()
    if(e.key >=0 && e.key <= 9){
        handleNumber(e.key);
    }
    if(
        e.key === "Enter" || 
        e.key === "=" && currentNum != "" && previousNum != ""){
        compute(); 
    }
    if(e.key === "+" || e.key === "-" || e.key === "/"){
        handleOperator(e.key); 
    }
    if(e.key === "*"){
        handleOperator(x); 
    }
    if(e.key === "."){
        addDecimal(); 
    }
    if(e.key === "Backspace"){
        handleDelte(); 
    }
}
    
function handleDelete(){
    if(currentNum !== ""){
        currentNum = currentNum.slice(0, -1); 
        currentDisplayNumber.textContent = currentNum; 
        if (ccurentNum === "") {
            currentDisplayNumber = "0"; 
        }
    }
    if (currentNum === "" && previousNum !== "" && operator === ""){
        previousNum = previousNum.slice(0, -1); 
        currentDisplayNumber.textContent = previousNum; 
    }
}
