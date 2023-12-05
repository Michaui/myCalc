
// Überall dort wo ein leerzeichen ist, werden die Strings in ein Array gesetzt. 
// Jedes dieser Styles (cls) wird als ClassList-Element an das calcbody (bdy) angehangen. 
const calcBodyClass= "max-w-lg rounded overflow-hidden bg-gray-200 bg-gradient-to-tr from-gray-100 flex";
const calcBody = document.querySelector(".calcbody");
calcBodyClass.split(" ").forEach((cls) => calcBody.classList.add(cls));

const outputClass = "flex flex-col w-3/4 h-12 justify-center items-end m-1 bg-gray-300 text-gray-900 font-semibold px-2 border border-black hover:border-gray-500 rounded";
const outputBody = document.querySelector(".output");
outputClass.split(" ").forEach((cls) => outputBody.classList.add(cls));

const previousNumberClass = "flex max-w-lg h-1/3 pb-5 pt-1 text-gray-600 text-xs";
const previousNumberBody = document.querySelector(".previousNumber");
previousNumberClass.split(" ").forEach((cls) => previousNumberBody.classList.add(cls));

const currentNumberClass = "flex max-w-lg h-2/3 pb-2 text-xl";
const currentNumberBody = document.querySelector(".currentNumber");
currentNumberClass.split(" ").forEach((cls) => currentNumberBody.classList.add(cls));

// Jeder Button erhält eine Funktion: addClasses 
const buttons = document.querySelectorAll("button");
// Jeder Button wird aus dem Array weiter als Argument an die Funktion weitergegeben. 
buttons.forEach((btn) => {addClasses(btn);});

// Funktion: Pro Button wird überprüft welche Klassen das DIV bzw. Button hat, dann wird die passende Variable mit den richtigen Styles angehangen. 
function addClasses(button) {
    const btnNumberClass = "hover:bg-gray-300 border-gray-300";
    const btnClearClass = "hover:bg-orange-500 border-orange-500 text-orange-500 hover:text-white";
    const btnOpClass = "hover:bg-blue-500 border-blue-500 text-blue-500 hover:text-white";
    const btnEqClass = "hover:bg-gray-300 border-gray-300";
    const btnDecClass = "hover:bg-gray-300 border-gray-300";

    // VARIANTE A - Zuerst das Spezeifische 
    // Funktioniert nur in der Reihenfolge, weil vorher nur mit ".value" und "===" 2 Werte miteinander überprüft werden können. 
    // if(button.classList.value === "number"){
    //     btnNumberClass.split(" ").forEach((cls) => button.classList.add(cls));
    // }else if (button.classList.value === "operator"){
    //     btnOpClass.split(" ").forEach((cls) => button.classList.add(cls)); 
    // }else if (button.classList.value === "clear"){
    //     btnClearClass.split(" ").forEach((cls) => button.classList.add(cls)); 
    // }
    
    // const baseClass ="flex w-12 h-12 justify-center items-center m-1 font-bold py-2 px-2 border rounded border-2 text-2xl"; 
    // baseClass.split(" ").forEach((cls) => button.classList.add(cls));

    // -------------------------------------------

    // VARIANTE B - Zuerst die Basis  
    const baseClass ="flex w-12 h-12 justify-center items-center m-1 font-bold py-2 px-2 border rounded border-2 text-2xl"; 
    baseClass.split(" ").forEach((cls) => button.classList.add(cls));

    // Aus dem  === "number" wird contains("number"), weil value nur einen Wert überprüft. 
    // .contains === "number" funktioniert nicht, weil "===" nur 2 Werte überprüft. (Vergleichsoperator)
    // Aus dem Grund wird contains als Mehtode genutzt, um zu überpüfen ob in den gesetzten Klassen "number" vorhanden ist. 
    // Gegebenenfalls nicht die attraktivere Variante, weil erst gesucht werden muss, ob Klasse in Zeile vorhanden ist. 
    if(button.classList.contains("number")){
        btnNumberClass.split(" ").forEach((cls) => button.classList.add(cls));
    }else if (button.classList.contains("operator")){
        btnOpClass.split(" ").forEach((cls) => button.classList.add(cls)); 
    }else if (button.classList.contains("clear")){
        btnClearClass.split(" ").forEach((cls) => button.classList.add(cls)); 
    }else if (button.classList.contains("equal")){
        btnEqClass.split(" ").forEach((cls) => button.classList.add(cls)); 
    }else if (button.classList.contains("decimal")){
        btnDecClass.split(" ").forEach((cls) => button.classList.add(cls)); 
    }
};