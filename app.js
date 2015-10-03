$(document).ready(function(){

	var cache_data = []; 
	var width = 0; 

	//When submit is clicked
	$('#submit').click(function(event){
		
		//Prevent the default behavior of submit button
		event.preventDefault(); 
		
		//Get the value of the user-input, store in a variable
		var movie = $('#search-entry').val(); 
		
		//Clear previous searches
		$('#search-entry').val(''); 
		$('#search-results').html(''); 
		width = 0; 
		
		//Pass that var into a method that makes an AJAX call to OMDB API
		getResult(movie); 

	
//This function makes a getJSON request to OMBD
function getResult(searchTerm){
	//Create a var of an object with the calls parameters
		var param = {
			s: searchTerm, 
			r: 'json'
		}
	//Create a var holding the url
		var url = 'http://www.omdbapi.com/?'; 
	//Pass vars as arguments to the jQuery getJSON method
		$.getJSON(url, param, function(data){				
			$.each(data.Search, function(index, value){  
				getDetails(value.Title);				
			});
	}); 		
}


//Gets more details about movie, calls render() function to diplay content in DOM
function getDetails(title){	
	var param = {
		t: title, 
		type: 'movie', 
		plot: 'short', 
		r: 'json'
	}
	var url = 'http://www.omdbapi.com/?'; 
	$.getJSON(url, param, function(data){		
		console.log(data);
		render(data); 
		deleteBtn(); 
	}); 
}; 

//Builds a div that will be inserted in DOM (#search-results div)
function render(data) {
	var found = cache_data.filter(function(el){
		return (data.Title == el.Title && data.Year == el.Year); 
	})
	
	if(data.Response == "False" || found.length > 0 ){
			
			return false; 
	}  

	cache_data.push(data);

	//var Title = $('h2.result').val(); 
	var result = '<div class="result">'; 
		result += '<button class="result delete">X</button>'; 
		result += '<header class="result">'; 
		result += '<h2 class="result">' + data.Title + '</h2>'; 
		result += '<h3 class="result">' + data.Year + '</h3>';  				
		result += '</header>'; 
		result += '<section class="result">'; 
		if ( data.Poster == "N/A"){
			result += '<img src="images/noImage.gif" class="poster, result" />'; 
		} else {
			result += '<img src="'+ data.Poster +'" class="poster, result" />'; 
		}; 		
		result += '<h4 class="result">' + data.Actors +'</h4>'; 
		result += '<p class="result plot">' + data.Plot + '</p>'; 
		result += '</section>'; 
		result += '</div>'; 
	$('#search-results').width( width+=650 ).append(result); 	
	
}

//makes delete button operational
function deleteBtn(){
	$('div.result').on("click", "button.delete", function(event){
		event.preventDefault(); 
		$(this).parent().remove(); 		
		$('#search-results').width( width-=650 ).append(result); 	 
	}); 
}

	}); 	

}); 



/*

TO-DO: 
1. Make a "No-image available" icon when no poster is present
	1-b. Re-Style plot elements? (may be fixed when no-poster icon added)
2. Add a delete button to each div.result in upper-right corner

*/