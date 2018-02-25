$(document).ready(function (){

   function GIF(rating, animation, still) {
       this.rating = rating,
       this.animation = animation,
       this.still = still
   };
   

var gifs = ["49ers", "Lakers", "shade", "Drunk", "Taylor Swift", "Kanye", "Kittens", "Rick and Morty", "Dragon Ball Z", "Anakin", "Brunch", "EDM", "Samuel Jackson", "Drake", "Bruh"]


function renderButtons() {
    $("#gifsView").empty()
    gifs.forEach(element => {
        $("#gifsView").append('<button class="button radius bordered shadow primary gifButton margin-right-1" id="' + element + '">'+  element + '</button>')

    });
}

function newGif(addition) {
    
    event.preventDefault();
    
    var newAddition = $("#additionalGif").val().trim();

    //adds button of new gif choice
    if (newAddition.length > 1 && gifs.indexOf(newAddition) == -1 ){
    $('#gifsView').append('<button class="button radius bordered shadow primary gifButton" id="' + newAddition + '">' + newAddition + '</button>')
    gifs.push(newAddition)
    }

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
            // var stillLocation = element.keys(images)[0]
            // console.log(element)
            var rating = element.rating;
            var animated = element.images.downsized;
            var still = element.images["480w_still"].url;
            // console.log(stillLocation)
            var info = [rating, animated, still];
            var gifData = new GIF(...info);
            // console.log(still)
            dopeGifs(gifData)
        });
       


    })
}

//creates a pretty container for the returned gif data and pushes it to the page
function dopeGifs(gifData) {
    console.log(gifData.animation)
    var newCard = $('<div><div>').attr("class", "gifBlock")
    newCard.append("<div class='card-divider'>Rating :" + gifData.rating + "</div>")
    newCard.append("<img src='" +gifData.animation.url+ "'class='imageBlock' gif-state='animate' gif-alt='"+gifData.still+"' /> ")
    $('#gifBox').append(newCard)
    
}

//changes the gif animation state between animated and still
function stateChange(gifToChange) {
    
    
    var gifImage = gifToChange.target
    var state = $(this).attr("gif-state");
    console.log(state)

    if (state === "animate") {
        var temp = $(this).attr("src")
        console.log(temp)
        $(this).attr("src", $(this).attr("gif-alt"))
        $(this).attr("gif-state", "still")
        $(this).attr("gif-alt", temp)
    }
    else if (state === "still") {
        var temp = $(this).attr("src");
        $(this).attr("src", $(this).attr("gif-alt"))
        $(this).attr("gif-state", "animate")
        $(this).attr("gif-alt", temp);
    }
    
}

renderButtons();
$("body").on("click", ".gifButton", getGifs);
$("body").on("click", "#addGif", newGif);
$("body").on("click", ".imageBlock", stateChange);


})