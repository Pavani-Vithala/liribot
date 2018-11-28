require("dotenv").config();
var keys = require("./keys");
console.log(keys);
var axios = require("axios");


var command = process.argv[2];
var param = process.argv.slice(3).join(" ");
console.log(param);


switch (command) {
    case "concert-this":
        console.log("Entered concert-this function");
        var artist = param;
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + process.env.BANDSINTOWN_APIKEY;
        console.log(queryURL);
        axios.get(queryURL).then(
            function (response) {
                
                var result = response;
                var nameOfVenue = result["venue"];
                console.log(result);
            });
        //Name of the venue

        //* Venue location
   
        //* Date of the Event (use moment to format this as "MM/DD/YYYY")
        break;
    case "spotify-this-song":
        console.log("Entered spotify-this-song function");
        var spotify = keys.spotify.id;
        console.log("The spotify id is" + spotify);
        spotifyURL = "https://api.spotify.com/search/results/" + param + "&type=track&key=" + spotify;
        // http://ws.spotify.com/search/1/track?q=Tori+Amos+Precious+Things
        console.log(spotifyURL);
        break;
    case "movie-this":

        if (param == "") {
            param = "Mr.Nobody";
            getMovieDetails(param);
        } else {

            getMovieDetails(param);
        }


        break;
    case "do-what-it-says":
        console.log("Entered do-what-it-says function");
        break;

}

function getMovieDetails(moviename) {

    var queryURL = "http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=" + process.env.OMDB_APIKEY;
    console.log(queryURL);
    axios.get(queryURL).then(
        function (response) {
            // console.log(response);
            var result = response.data;
            console.log(result);
            console.log("Title : " + result.Title);
            console.log("Year the movie came out: " + result.Year);
            console.log("IMDB Rating: " + result.imdbRating);
            console.log("Rotten Tomatoes Rating: " + result["Ratings"][1]["Value"]);
            console.log("Country where the movie was produced: " + result.Country);
            console.log("Language: " + result.Language);
            console.log("Plot: " + result.Plot);
            console.log("Actors: " + result.Actors);
        });

}
