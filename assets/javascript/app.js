$(document).ready(function (){

   function GIF(rating, animation, still) {
       this.rating = rating,
       this.animation = animation,
       this.still = still



   }; 

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
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=j3QaK4ow9CkKDewMbh0mUJTYeLwPsnmG&q=" + search + "&limit=10&offset=0&rating=G&lang=en"
    search = request.target.id
    console.log(search)
    //call GIFY api and get GIFS broh.
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (response) {
        var results = response.data
        results.forEach(element => {
            console.log(element)

        });
       


    })
}

//creates a pretty container for the returned gif data
function dopeGifs(gifData) {
    
    
}

//changes the gif animation state between animated and still
function stateChange(gifToChange) {
    
    console.log(gifToChange)
    
    var gifImage = gifToChange.imageBlock
    var state = gifToChange.attr('state')

    if (state === "animate") {
        $(this).attr("src", $(this).attr("gif-still"))
        $(this).attr("gif-state", "still")
    }
    else if (state === "still") {
        $(this).attr("src", $(this).attr("gif-animate"))
        $(this).attr("gif-state", "animate")
    }
    
}

renderButtons();
$("body").on("click", ".gifButton", getGifs);
$("body").on("click", "#addGif", newGif);
$("body").on("click", "#gifBlock", stateChange);


})