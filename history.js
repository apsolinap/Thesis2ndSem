var searchQueryHistory = "";
function history() {
	clearInterval(accountabilityloading);
	loadHistory();
	//historyloading = setInterval(loadHistory, 3000);
	//show and active history
	document.getElementById("history").classList.add("active");
	document.getElementById("history_div").style.display="block";
	//inactive other tabs
	document.getElementById("accountability").classList.remove("active");
	document.getElementById("request").classList.remove("active");
	document.getElementById("inventory").classList.remove("active");
	//hide away other divs
	document.getElementById("inventory-div").style.display="none";
	document.getElementById("request_div").style.display="none";
	document.getElementById("accountability_div").style.display="none";
}

/*

$( document ).ready(function() {
	loadJSONdataHistory();
});
*/




$( "#searchHistory").click(function() {
	searchQueryHistory = $("#searchQueryHistory").val();
	console.log(searchQueryHistory);
	loadHistory()
	//loadItems();
});

searching = document.getElementById("searchQueryHistory");
searching.oninput = func;
function func() {
  loadHistory();
}

function filteringHistory(element) {
	var regex = new RegExp(searchQueryHistory, 'gi' );
    return (element['user'].match(regex) || element['type'].match(regex) || element['content'].match(regex));
}

function loadHistory(){
	document.getElementById("history-loader").style.display = "block"; 

   	document.getElementById("historytablediv").style.display = "none";	
	searchQueryHistory = $("#searchQueryHistory").val();
	console.log("loading history" + searchQueryHistory)
	
	var history = "";

	history += "<table id='historytable'><tr> <th>User</th><th>Type</th><th>Content</th><th>Date</th><th>Time</th></tr>"
	
	var historyDataRef = firebase.database().ref("7/systemlog");
	historyDataRef.orderByKey().once("value").then(function(snapshot) {
	
	var data = snapshotToArray(snapshot);
	data = data.filter(filteringHistory);
	console.log(data)
    data.sort(function(a, b){
	        	if(a.date < b.date) { return -1; }
			    if(a.date > b.date) { return 1; }
			    return 0;
	        });

	if (data.length == 0){
		history += "<tr> <td colspan=5>No records found. </tr> </td>"
	}
	data.forEach(function(item){
    	history += "<tr> <td>" + item.user + " </td> <td>"+item.type+ "</td><td>" +item.content+ "</td><td>" + item.date + "</td><td>"+ item.time +"</td> </tr>";
	});
	
	
    

	var container = document.getElementById("historytablediv");
	container.innerHTML = history;

	document.getElementById("history-loader").style.display = "none"; 	
   	document.getElementById("historytablediv").style.display = "block";
	console.log("vge");
	});
}

/*
	searchQueryHistory = $("#searchQueryHistory").val();
	console.log("loadinggggggggggggg")

   	document.getElementById("items-loader").style.display = "block"; 	
   	document.getElementById("items-div").style.display = "none"; 	
   	var historyfile = "https://firebasestorage.googleapis.com/v0/b/liarsproject.appspot.com/o/liarsproject-systemlog-export.json?alt=media&token=e5388ccc-bbae-4d26-896d-15d1b242882a";
	
readTextFile(historyfile, function(text){
    var data = JSON.parse(text);
   
    var history = "";

	history += "<table id='historytable'><tr> <th>User</th><th>Type</th><th>Content</th><th>Date</th><th>Time</th></tr>"
	console.log(searchQueryHistory);
	var data = data.filter(filteringHistory);

    data.sort(function(a, b){
	        	if(a.date < b.date) { return -1; }
			    if(a.date > b.date) { return 1; }
			    return 0;
	        });

	if (data.length == 0){
		itemsCard = "No records."
	}
    for (property in data) {
    	history += "<tr> <td>" + `${data[property]['user']}` + " </td> <td>"+`${data[property]['type']}`+ "</td><td>" +`${data[property]['content']}`+ "</td><td>" +`${data[property]['date']}`+ "</td><td>"+`${data[property]['time']}` +"</td> </tr>";
	}
    

	var container = document.getElementById("historytablediv");
	container.innerHTML = history;
});*/
