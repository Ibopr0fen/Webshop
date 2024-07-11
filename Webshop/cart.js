//(ID,Produkt Name)
const productsAndNames = new Map();
productsAndNames.set(1,'Eleganter Elefant');
productsAndNames.set(2,'Tiny Tischchen');
productsAndNames.set(3,'Biologisches Bild');
productsAndNames.set(4,'Schöner Schrank');
productsAndNames.set(5,'Wonniger Wohnbereich');
productsAndNames.set(6,'Feinfühlige Fernsehkombi');
productsAndNames.set(7,'Schlichter Schreibtisch');
productsAndNames.set(8,'Derbe Deko');
productsAndNames.set(9,'Sesshafter Sessel')

//(ID,Preis)
const productsAndPrices = new Map();
productsAndPrices.set(1,15);                               //Elefant
productsAndPrices.set(2,35);                               //Tisch
productsAndPrices.set(3,12);                               //Bild
productsAndPrices.set(4,239);                              //Schrank
productsAndPrices.set(5,239);                              //Wohnbereich
productsAndPrices.set(6,499);                              //Fernsehkombi
productsAndPrices.set(7,69);                               //Schreibtisch
productsAndPrices.set(8,99);                               //Deko
productsAndPrices.set(9,119);                              //Sessel



function displayNamesAndPricetags(){

    for(let i = 1; i <= productsAndNames.size;i ++){
        document.getElementById("productName"+i.toString()).innerText = productsAndNames.get(i);
        document.getElementById("productPrice"+i.toString()).innerText = productsAndPrices.get(i) + "€";
    }
}



function addToCart(productID){
const quantities = [];                                                                          //wie viel von jedem Produkt, am index der ID eines Produktes wird Anzahl gespeichert                                                                    
    quantities[productID] = parseInt(document.getElementById(productID).value);

  if(isNaN(quantities[productID]) || quantities[productID] < 0){                            
        console.log("Keine (positive) Zahl");
        quantities[productID] = 0;
    } 
    sessionStorage.setItem("quantity" + productID.toString(), quantities[productID])

}

function calculatePrice(){

    //(ID, Anzahl)
    const productsAndQuantities = new Map();                   


    const outputNames = [];                                     //angezeigte Namen und Preise im Warenkorb
    const outputPrices = [];                                    //und Preise im Warenkorb

    //Mengen, Preise und Produkte anzeigen
    for(let i = 1; i <= productsAndNames.size; i++){
        if(sessionStorage.getItem("quantity" + i.toString()) > 0){
            productsAndQuantities.set(i,sessionStorage.getItem("quantity" + i.toString()))                                //siehe cart.js
            outputNames[i] =  document.getElementById("cartName"+ i.toString());                                        //siehe cart.html
            outputPrices[i] = document.getElementById("cartPrice"+ i.toString());                                       //siehe cart.html
            outputNames[i].innerText =productsAndQuantities.get(i) + "x " + productsAndNames.get(i);                    //output z.B. 5x Eleganter Elefant
            outputPrices[i].innerText = (productsAndQuantities.get(i) * productsAndPrices.get(i)).toString() + "€";     
        }
    }



    //Gesamtpreisberechnung
    var outputFinal = document.getElementById("totalPrice");
    var totalPrice = 0;
    
    for(const [key, value] of productsAndQuantities){
        totalPrice = totalPrice + value * productsAndPrices.get(key);
    }

    if(totalPrice == undefined){
        totalPrice = 0;
    }
    outputFinal.innerText = totalPrice.toString() + "€";

}


function clearCart(){
    sessionStorage.clear();
    window.location.reload();
}