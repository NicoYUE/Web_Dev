var rental = {
  "cars": [
    {
      "id": "p306",
      "vehicule": "peugeot 306",
      "pricePerDay": 20,
      "pricePerKm": 0.10
    },
    {
      "id": "rr-sport",
      "pricePerDay": 60,
      "pricePerKm": 0.30
    },
    {
      "id": "p-boxster",
      "pricePerDay": 100,
      "pricePerKm": 0.45
    }
  ],
  "rentals": [
    {
      "id": "1-pb-92",
      "driver": {
        "firstName": "Paul",
        "lastName": "Bismuth"
      },
      "carId": "p306",
      "pickupDate": "2015-09-12",
      "returnDate": "2015-09-14",
      "distance": 150,
      "options":{
        "deductibleReduction": false
      }
    },
    {
      "id": "2-rs-92",
      "driver": {
        "firstName": "Rebecca",
        "lastName": "Solanas"
      },
      "carId": "rr-sport",
      "pickupDate": "2015-09-09",
      "returnDate": "2015-09-13",
      "distance": 550,
      "options":{
        "deductibleReduction": true
      }
    },
    {
      "id": "3-sa-92",
      "driver": {
        "firstName": " Sami",
        "lastName": "Ameziane"
      },
      "carId": "p-boxster",
      "pickupDate": "2015-09-12",
      "returnDate": "2015-09-14",
      "distance": 100,
      "options":{
        "deductibleReduction": true
      }
    }
  ],
  "rentalModifications": [
    {
      "id": 1,
      "rentalId": "1-pb-92" ,
      "end_date": "2015-09-13",
      "distance": 150
    },
    {
      "id": 2,
      "rentalId": "3-sa-92",
      "pickupDate": "2015-09-01"
    }
  ]
};

var rentals = rental.rentals;
var cars = rental.cars;
var rentalMod = rental.rentalModifications;

function RentDays(pickdate, gbackday) {//renvoie le nombre de jour que dure la location
  //Date.Parse renvoie une date en millième de seconde
  return ((Date.parse(gbackday)-Date.parse(pickdate))/(1000*60*60*24))+ 1; // +1 autrement le jour où le véhicule est récupéré ne sera pas compté
};

function isBetween(x, xmin, xmax){ //useless
  return x > xmin && x <= xmax;
};

function Promo(duration){//exercice 2 pour les réductions
  if(duration > 1 && duration <= 4){
    return duration*0.9;
  }
  else if (duration > 4 && duration <= 10){
    return duration*0.7;
  }
  else if (duration > 10){
    return duration*0.5;
  }
};

function Price(car, rent){//calcul du prix, function promo appliqué dessus, function deductibleReduction appliqué
  var days = RentDays(rent.pickupDate, rent.returnDate); //function RentDays
  return car.pricePerKm*rent.distance + car.pricePerDay*Promo(days) + deduc(rent.options.deductibleReduction, days); // le prix en fonction du jour sera changé en fonction de la durée

};

function Comission(price){//exo3
  return price*0.3;
}

function Insurance(comission){//exo3
  return comission*0.5;
}

function Drivy(Insu, Assist){//exo3
  return Insu - Assist;
}

function deduc(option, days){//cette function est adapté pour l'exo4
  if(option ===true)
  {
   return days*4;
  }else{
   return 0;
  }
}

 function hOP(rMod, str){
   if(str in rMod){
     return rMod[str];
   }
 };

 function rentMod(id){
   for(var i = 0; i < rentalMod.length; i++){
     if(rentalMod[i].rentalId === id){

      var new_returnDate = hOP(rentalMod[i], "end_date");
      var new_pickupDate = hOP(rentalMod[i], "pickupDate");
      var new_distance = hOP(rentalMod[i], "distance");
    //  alert(new_returnDate);
      //alert(new_pickupDate);
      //alert(new_distance);
       return [new_returnDate, new_pickupDate, new_distance]; //on retourne un tableau de 3 variables

    }else{

    }
   }
 };

 function arrayToTab(array){ // à revoir, degueulasse.

   var table = document.createElement("TABLE");
   table.border='1';

   var tableBody = document.createElement("tableBody");
   table.appendChild(tableBody);
   var trh = document.createElement("tr"); // a row of th
   tableBody.appendChild(trh);

   var th1 = document.createElement("th");
   th1.appendChild(document.createTextNode("Client data"));
   th1.colSpan=2;
   tableBody.appendChild(th1);

   var th2 = document.createElement("th");
   th2.appendChild(document.createTextNode("Comission data"));
   th2.colSpan=2;
   tableBody.appendChild(th2);


   for (var i=0; i<array.length; i++){
      var tr = document.createElement("tr");
      tableBody.appendChild(tr);

      for (var j=0; j<4; j++){
          var td = document.createElement('TD');
          td.width='75';
          td.appendChild(document.createTextNode(array[i][j]));
          tr.appendChild(td);
      }
   }
   document.body.appendChild(table);
 }

//------------------------------------------Run
for( var i = 0; i < cars.length; i++){
  for(var j = 0; j < rentals.length; j ++){
    if(cars[i].id === rentals[j].carId){
      for(var k =0; k < rentalMod.length; k++){
        var rD = rentals[j].returnDate;
        var puD = rentals[j].pickupDate;
        var dist;
      //var dataMod = rentMod(rentals[j].id); // on nomme le tableau retourner par la fonction
        if(rentalMod[k].rentalId === rentals[j].id){

      if(typeof hOP(rentalMod[k], "end_date") !== 'undefined'){
        rD = hOP(rentalMod[k], "end_date")
        //alert(rD);
      }
      if(typeof hOP(rentalMod[k], "pickupDate") !== 'undefined'){
        puD = hOP(rentalMod[k], "pickupDate")
        //alert(puD);
      }
      if(typeof hOP(rentalMod[k], "distance") !== 'undefined'){
        //alert(dist);
      }
    }
    var clientname = rentals[j].driver.firstName +" "+ rentals[j].driver.lastName;
      var rentalPrice = Price(cars[i], rentals[j]);
      var numberOfDays = RentDays(puD, rD);
      //alert(numberOfDays);
      var comission = Comission(rentalPrice);
      var insurance = Insurance(comission);

      var RoadAssist = numberOfDays;
      var drivy = Drivy(insurance, RoadAssist);
      var deduction = deduc(rentals[j].options.deductibleReduction,numberOfDays);
      var distance = rentals[j].distance;

      }

      //faire deux array afin de rendre plus dynamique ?
      var ClientArray = [["Client :",clientname,"Total Comission :",comission],["Days of rentals :",numberOfDays,"Insurance fee :", insurance],["Distance :",distance,"Assistance fee :", RoadAssist],["Option price :",deduction,"Owner's part :", rentalPrice-comission],["Total Price :", rentalPrice,"Drivy's part :", drivy + deduction]];

      arrayToTab(ClientArray);

    }
  }
}
