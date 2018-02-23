$(document).ready(function (){

   function GIF(rating, animation, still) {
       this.rating = rating,
       this.animation = animation,
       this.still = still
   };
   

var gifs = ["49ers", "Lakers", "Giants", "Eagles", "Taylor Swift", "Kittens", "Rick and Morty", "Dragon Ball Z", "Anakin", "Brunch"]


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
    
    //removes and GIFs currently in the GifBox div
    $('#gifBox').empty()
    var search = request.target.id
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=j3QaK4ow9CkKDewMbh0mUJTYeLwPsnmG&q=" + search + "&limit=10&offset=0&rating=G&lang=en"
   
    console.log(search)
    console.log(queryURL)
    //call GIFY api and get GIFS broh.
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (response) {
        var results = response.data
        results.forEach(element => {

            var rating = element.rating;
            var animated = element.images.original.mp4;
            var still = element.images.downsized;
            var info = [rating, animated, still];
            var gifData = new GIF(...info);
            dopeGifs(gifData)
        });
       


    })
}

//creates a pretty container for the returned gif data and pushes it to the page
function dopeGifs(gifData) {
    console.log(gifData)
    var newCard = $('<div><div>').attr("class", "gifBlock")
    newCard.append("<div class='card-divider'>Rating :" + gifData.rating + "</div>")
    newCard.append("<img src=' " + gifData.still.url + " '/> ")
    $('#gifBox').append(newCard)
    
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