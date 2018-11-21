/*Api-key: pHg8xak6GorPY6my2GSFOpLwbE6kvHiwflmjoF1S*/
var data;

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
	getMembers(data.results[0].members);
	getDuplicates();
	
})



function getMembers(myNewArray){ 
	
    var tbody = document.getElementById("tbody");tbody
	tbody.innerHTML =''; 
	
	for(i=0; i < myNewArray.length; i++){
		
	
		
		var myTr = document.createElement("tr");
		var myTd1 = document.createElement("td");
		var myTd2 = document.createElement("td");
		var myTd3 = document.createElement("td");
		var myTd4 = document.createElement("td");
		var myTd5 = document.createElement("td");
		
		var name = myNewArray[i].first_name;
	    var middleName = myNewArray[i].middle_name;
		
		if ( middleName == null){
			
			middleName = ""
		};
		
		var lastName = myNewArray[i].last_name;	
		var times = myNewArray[i].party;
		var mood = myNewArray[i].state;
		var yearsInOffice = myNewArray[i].seniority;
		var votesParty = myNewArray[i].votes_with_party_pct;
		

		var link = myNewArray[i].url;
	    var addLink = document.createElement("a");
		addLink.setAttribute("href", link);
		addLink.setAttribute("target", "_blank");
		
		
		
		addLink.append(name +" "+middleName +" "+lastName +" "); 
		myTd1.append(addLink);
		myTd2.append(times);
		myTd3.append(mood);
		myTd4.append(yearsInOffice);
		myTd5.append(votesParty);
		
		myTr.append(myTd1);
		myTr.append(myTd2);
		myTr.append(myTd3);
		myTr.append(myTd4);
		myTr.append(myTd5);
		
		tbody.append(myTr);
		
	   }
	
	
	}



function getDuplicates(){
   
    var repeatStates = [];
	
    var select = document.getElementById("states");
  
	for ( s = 0; s < data.results[0].members.length; s++){

		var stateName = data.results[0].members[s].state;
		
		repeatStates.push(stateName);
	
		var result = [];
		
		for ( p = 0; p < repeatStates.length; p++){
			
			for ( k = 0; k < repeatStates.length; k++){
				
				if ( repeatStates[p] == repeatStates[k] ){
					
					if (!result.includes(repeatStates[p])){
						result.push(repeatStates[p]);
					}
				}
			}
		}
		
	
	}
	
	for ( m = 0; m < result.length; m++){
		var option = document.createElement("option");
		option.append(result[m]);
		states.append(option);
	}
	console.log(repeatStates);
}




document.getElementById("Rep").addEventListener("click", check);
document.getElementById("Dem").addEventListener("click", check);
document.getElementById("Ind").addEventListener("click", check);

function check(){ 
	var aParty = [];
	var checked = 
	document.querySelectorAll('input[name=party]:checked');


	for( p = 0; p < checked.length; p++){
		aParty.push(checked[p].value);

	}
	filter(aParty);
}


document.getElementById("states").addEventListener("change", check);


function filter(selectParty){ 
	
	var takeValue = document.querySelector('#states').value;
	 console.log(takeValue);
	var arrayFilter = [];
  
	if (selectParty.length == 0 && takeValue == "All") {
		 arrayFilter = data.results[0].members;
	  } 
	
	else if(selectParty.lenght !== 0 && takeValue == "All"){
		
		for ( i = 0; i < data.results[0].members.length; i++){
		
			for ( n = 0; n < selectParty.length; n++){
			
				if( data.results[0].members[i].party == selectParty[n]){
				 
				arrayFilter.push(data.results[0].members[i]);
	   }
	  }
	 }
	}
		
	else if (selectParty.length == 0 && takeValue !== "All"){
		
	  for ( i = 0; i < data.results[0].members.length; i++){
		
		if( data.results[0].members[i].state == takeValue  ){
			
			arrayFilter.push(data.results[0].members[i]);
		
	 }
	}
   }
	else{ 
		
	
	 for ( i = 0; i < data.results[0].members.length; i++){
		
		for ( n = 0; n < selectParty.length; n++){
			
			
			if( data.results[0].members[i].state == takeValue && data.results[0].members[i].party == selectParty[n]){
				 
				arrayFilter.push(data.results[0].members[i]);
			
			}
  			
		}		
	  

	}
		

  }
	
 
getMembers(arrayFilter);
}