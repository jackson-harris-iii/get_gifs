$(document).ready(function (){

var gifs = ["49ers", "Lakers", "Giants", "Eagles", "Taylor Swift", "Kittens", "Rick and Morty", "Dragon Ball Z", "Anakin", "Brunch"]
var search = null;


function renderButtons() {
    $("#gifsView").empty()
    gifs.forEach(element => {
        $("#gifsView").append('<button class="button radius bordered shadow primary gifButton" id="' + element + '">'+  element + '</button>')

    });
}

function newGif(addition) {
    
    event.preventDefault();
    
    var newAddition = $("#additionalGif").val().trim();
    console.log(addition)

    //adds button of new gif choice
    $('#gifsView').append('<button class="button radius bordered shadow primary gifButton" id="' + newAddition + '">' + newAddition + '</button>')
    gifs.push(newAddition)
}

function getGifs(request) {
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=j3QaK4ow9CkKDewMbh0mUJTYeLwPsnmG&q=" + search + "&limit=25&offset=0&rating=G&lang=en"
    search = request.target.id
    console.log(search)
    //call GIFY api and get GIFS broh.
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (response) {
        console.log(response)

    })
}

renderButtons();
$("body").on("click", ".gifButton", getGifs);
$("body").on("click", "#addGif", newGif);

})