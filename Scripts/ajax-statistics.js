//quitar variables de members y poner members = myData.results[0].members en mis if y probar

var data;
if(window.location.pathname == ("/TGIF-/senate-attendance-starter-page.html")){
fetch("https://api.propublica.org/congress/v1/113/senate/members.json",{
	method: "GET",
	headers:{
	 "X-API-key":"pHg8xak6GorPY6my2GSFOpLwbE6kvHiwflmjoF1S"
	}
}).then(function(result){
	return result.json()
}).then(function(myData){
	console.log(myData);
	data = myData;
	
	calculate();
	getData();
	leastEngaged();
	mostEngaged();
	document.getElementById("loader").style.display = "none";
	document.getElementById("loader2").style.display = "none";
	document.getElementById("loader3").style.display = "none";
	
})
}
else if(window.location.pathname == ("/TGIF-/house-attendance-starter-page.html")){
	
	fetch("https://api.propublica.org/congress/v1/113/house/members.json",{
		method: "GET",
		headers: {
			"X-API-key":"pHg8xak6GorPY6my2GSFOpLwbE6kvHiwflmjoF1S"
		}
	}).then(function(result){
		return result.json()
	}).then(function(myData){
			data = myData;
			calculate();
			getData();
			leastEngaged();
			mostEngaged();
	document.getElementById("loader").style.display = "none";
	document.getElementById("loader2").style.display = "none";
	document.getElementById("loader3").style.display = "none";
	})
}
else if(window.location.pathname == ("/TGIF-/senate-party-loyalty-starter-page.html")){
	fetch("https://api.propublica.org/congress/v1/113/senate/members.json",{
		method: "GET",
		headers: {
			"X-API-key":"pHg8xak6GorPY6my2GSFOpLwbE6kvHiwflmjoF1S"
		}
	}).then(function(result){
		return result.json()
	}).then(function(myData){
		data = myData;
		
		calculate();
		getData();
		partyPercentBot();
		partyPercentTop();
	document.getElementById("loader").style.display = "none";
	document.getElementById("loader2").style.display = "none";
	document.getElementById("loader3").style.display = "none";
		
	})
}


else if(window.location.pathname == ("/TGIF-/house-party-loyalty-starter-page.html")){
	
	fetch("https://api.propublica.org/congress/v1/113/house/members.json",{
		method: "GET",
		headers: {
			"X-API-key":"pHg8xak6GorPY6my2GSFOpLwbE6kvHiwflmjoF1S"
		}
	}).then(function(result){
		return result.json()
	}).then(function(myData){
			data = myData;
			calculate();
			getData();
			partyPercentBot();
			partyPercentTop();
	document.getElementById("loader").style.display = "none";
	document.getElementById("loader2").style.display = "none";
	document.getElementById("loader3").style.display = "none";
	})
}



var statistics = {
	
	"Number_of_Republicans": 0,
	"Number_of_Democrats": 0,
	"Number_of_Indepedent": 0,
	"Num_Party_Votes_Republicans":0,
	"Num_Party_Votes_Democrats":0,
	"Num_Party_Votes_Independents":0,
	"Num_Missed_Votes_bottom":0,
	"Num_Missed_Votes_top":0,
	"Votes_by_Party_top":0,
	"Votes_by_Party_bot":0,
	"total_number":0,
	"total_prct_votes":0,
}

function calculate(){

var members = data.results[0].members;

var numRep = []
var numDem = []
var numInd = []

function numEachParty(){
	
	for (i=0; i< members.length; i++){
		if (members[i].party == 'R'){
			numRep.push(members[i]);
		}
		
	}

    for (i=0; i< members.length; i++){
		if(members[i].party == 'D'){
			numDem.push(members[i]);
		}
	}
	
	for (i=0; i< members.length; i++){
		if(members[i].party == 'I'){
			numInd.push(members[i]);
		}
	}
}
numEachParty();

statistics.Number_of_Republicans = numRep.length;
statistics.Number_of_Democrats = numDem.length;
statistics.Number_of_Indepedent = numInd.length;
statistics.total_number = parseInt(numRep.length) + parseInt(numDem.length) + parseInt(numInd.length);
console.log(statistics);


var demPercent = []
var repPercent = []
var indPercent = []

function numVotes(){ 
	
	for(i=0; i< members.length; i++){
		if(members[i].party == 'R'){
			repPercent.push(members[i].votes_with_party_pct);
		}
	}
	
	for(i=0; i< members.length; i++){
		if(members[i].party == 'D'){
			demPercent.push(members[i].votes_with_party_pct);
		}
	}
	
	for(i=0; i< members.length; i++){
		if(members[i].party == 'I'){
			indPercent.push(members[i].votes_with_party_pct)
		}
	}

 
}
	
	

		

numVotes();
	
	

	var x = 0
	var y = 0
	var z = 0 
	var l = 0
	
function getPercent(){ 
	
	
	
	for(f=0; f< repPercent.length; f++){
		x = repPercent[f] + x;
	}
	
	for(s=0; s< demPercent.length; s++){
		y = demPercent[s] + y;
	}
	
	for(n=0; n< indPercent.length; n++){
		z = indPercent[n] + z;
}
	for (r=0; r< members.length; r++){
		l = members[r].votes_with_party_pct + l;
	}
}
getPercent();

//function hola (){

var d = y / numDem.length;
var r = x / numRep.length;
var i = z / numInd.length;
var l = l / members.length;

statistics.Num_Party_Votes_Democrats = d.toFixed(2);
statistics.Num_Party_Votes_Republicans = r.toFixed(2);
statistics.Num_Party_Votes_Independents= i.toFixed(2);
statistics.total_prct_votes = l.toFixed(2);
	
	if( statistics.Number_of_Indepedent == 0){
	statistics.Num_Party_Votes_Independents = 0;
}


console.log(l);
console.log(d);
console.log(r);
console.log(i);


var percentVotes = data.results[0].members 

percentVotes.sort(function(obj1, obj2){
				  
	return obj1.missed_votes_pct - obj2.missed_votes_pct;
 });

console.log(percentVotes);

var tenPercent = percentVotes.length * 10 / 100 
console.log(tenPercent);


var topPercent = []
	
function topTen(){//funcion
	
    for(i=0; i< tenPercent; i++){
		 
		topPercent.push(percentVotes[i]);
	}
   console.log(topPercent);
}
 
topTen();

statistics.Num_Missed_Votes_top = topPercent


var bottomPercent = []
var reverse = percentVotes.reverse();

function bottomTen(){ //funcion para el bottom 10%
	
	
	for(i=0; i< tenPercent; i++){
		
		bottomPercent.push(reverse[i]);
	}
 console.log(bottomPercent);

}
bottomTen();

statistics.Num_Missed_Votes_bottom = bottomPercent;
	

var percentPartyTable = data.results[0].members 

percentPartyTable.sort(function(obj1, obj2){
				  
	return obj1.votes_with_party_pct - obj2.votes_with_party_pct;
 });

console.log(percentPartyTable);


var tenPercentLoyalty = percentPartyTable.length * 10 / 100


var percentPartyVotesTop = []

function topVotes (){ 
	
	for( i = 0; i< tenPercentLoyalty; i++ ){
		
		percentPartyVotesTop.push(percentPartyTable[i]);
	}
	
	console.log(percentPartyVotesTop);
}

topVotes();

statistics.Votes_by_Party_top = percentPartyVotesTop;


var percentPartyVotesBot = []
var reverse = percentPartyTable.reverse();


function bottomVotes (){
	
	for ( i = 0; i< tenPercentLoyalty; i++){
		percentPartyVotesBot.push(percentPartyTable[i]);
	}
  
   console.log(percentPartyVotesBot);
}

bottomVotes();

statistics.Votes_by_Party_bot = percentPartyVotesBot;	

}



function getData(){
	
	//REFACTOR
	
	var tbody = document.getElementById("SenateGlance");
	
	var tr = document.createElement("tr");
	var tr1 = document.createElement("tr");
	var tr2 = document.createElement("tr");
	var tr3 = document.createElement("tr");
	
	var td = document.createElement("td");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var td3 = document.createElement("td");
	var td4 = document.createElement("td");
	var td5 = document.createElement("td");
	var td6 = document.createElement("td");
	var td7 = document.createElement("td");
	var td8 = document.createElement("td");
	var td9 = document.createElement("td");
	var td10 = document.createElement("td");
	var td11 = document.createElement("td");
	
	/*var numind = 
	if(Num)*/
	
	td.append("Democrats");
	td1.append(statistics.Number_of_Democrats);
	td2.append(statistics.Num_Party_Votes_Democrats);
	td3.append("Republicans");
	td4.append(statistics.Number_of_Republicans);
	td5.append(statistics.Num_Party_Votes_Republicans);
	td6.append("Independents");
	td7.append(statistics.Number_of_Indepedent);
	td8.append(statistics.Num_Party_Votes_Independents);
	td9.append("Total");
	td10.append(statistics.total_number);
	td11.append(statistics.total_prct_votes);
	
	tr.append(td, td1, td2);
	tr1.append(td3, td4, td5);
	tr2.append(td6, td7, td8);
	tr3.append(td9, td10, td11);
	
	tbody.append(tr, tr1, tr2, tr3);
	
}




function leastEngaged() {

  var myTable = document.getElementById("LeastEngaged");

  var members = statistics.Num_Missed_Votes_bottom;

  myTable.innerHTML = "";

  for (var i = 0; i < members.length; i++) {

      
          var name = members[i].first_name;
		  var lastName = members[i].last_name;
		  var link = members[i].url;
		  var addlink = document.createElement("a");
		  var row = document.createElement("tr");
		
		  addlink.setAttribute("href", link);
		  addlink.setAttribute("target", "_blank");
		  addlink.append(name +" "+ lastName +" ");
         
	  	  row.insertCell().append(addlink);
          row.insertCell().innerHTML = members[i].missed_votes;
          row.insertCell().innerHTML = members[i].missed_votes_pct;
          myTable.append(row);
      
  }
}

function mostEngaged(){
	
	var secondTable = document.getElementById("MostEngaged");
	
	var members = statistics.Num_Missed_Votes_top;
	
	secondTable.innerHTML = "";
	
	
	
	for (var i = 0; i< members.length; i++){
		
		
		 var name = members[i].first_name;
		  var lastName = members[i].last_name;
		  var link = members[i].url;
		  var addlink = document.createElement("a");
		  var row = document.createElement("tr");
		
		  addlink.setAttribute("href", link);
		  addlink.setAttribute("target", "_blank");
		  addlink.append(name +" "+ lastName +" ");
		
		row.insertCell().append(addlink);
		row.insertCell().innerHTML = members[i].missed_votes;
		row.insertCell().innerHTML = members[i].missed_votes_pct;
		
		secondTable.append(row);
	}
}

function partyPercentBot(){
	
	var myTable = document.getElementById("loyalTop");
	
	var members = statistics.Votes_by_Party_bot;
	
	myTable.innerHTML = "";
	
	for (i = 0; i< members.length; i++){
		
		  var name = members[i].first_name;
		  var lastName = members[i].last_name;
		  var link = members[i].url;
		  var addlink = document.createElement("a");
		  var row = document.createElement("tr");
		
		  addlink.setAttribute("href", link);
		  addlink.setAttribute("target", "_blank");
		  addlink.append(name +" "+ lastName +" ");
		
		row.insertCell().append(addlink);
		row.insertCell().innerHTML = members[i].total_votes
		row.insertCell().innerHTML = members[i].votes_with_party_pct
		
		myTable.append(row);
	}
}



function partyPercentTop(){
	
	var secondTable = document.getElementById("loyalBottom");
	
	var members = statistics.Votes_by_Party_top;
	
	secondTable.innerHTML ="";
	
	for (i = 0; i< members.length; i++){
		
		  var name = members[i].first_name;
		  var lastName = members[i].last_name;
		  var link = members[i].url;
		  var addlink = document.createElement("a");
		  var row = document.createElement("tr");
		
		  addlink.setAttribute("href", link);
		  addlink.setAttribute("target", "_blank");
		  addlink.append(name +" "+ lastName +" ");
		
		row.insertCell().append(addlink);
		row.insertCell().innerHTML = members[i].total_votes;
		row.insertCell().innerHTML = members[i].votes_with_party_pct;
		
		secondTable.append(row);
		
	}
}

