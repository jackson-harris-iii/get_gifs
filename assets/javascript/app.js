$(document).ready(function (){

var gifs = ["49ers", "Lakers", "Giants", "Eagles", "Taylor Swift", "Kittens", "Rick and Morty", "Dragon Ball Z", "Anakin", "Brunch"]
var search = null;
var querlURL = "https://api.giphy.com/v1/gifs/search?api_key=j3QaK4ow9CkKDewMbh0mUJTYeLwPsnmG&q=" + search + "&limit=25&offset=0&rating=G&lang=en"

function renderButtons() {
    $("#gifsView").empty()
    gifs.forEach(element => {
        console.log(element)
        $("#gifsView").append('<a href="#0" class="button" id="' + element + '">'+  element + '</a>')
    });
}

renderButtons()
})