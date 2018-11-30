require("dotenv").config();
var moment = require("moment");
var keys = require("./keys.js");
//console.log(keys);
var axios = require("axios");
var fs = require("fs");
var Spotify = require("node-spotify-api");

var command = process.argv[2];
var param = process.argv.slice(3).join(" ");
var text = command + " " + param + "\n";
//console.log(param);


switch (command) {
    case "concert-this":
        var artist = param;
        concertThis(artist);

        break;
    case "spotify-this-song":

        spotifyThisSong(param);

        
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
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            var dataArr = data.split(",");
            var dataArr1 = dataArr[1].slice();//.join(" ");
            console.log(dataArr1);
            if (dataArr[0] == "movie-this")
                getMovieDetails(dataArr1);
            if (dataArr[0] == "concert-this")
                concertThis(dataArr1);
            if(dataArr[0] == "spotify-this-song")
            spotifyThisSong(dataArr1);
        });
        break;

}

function getMovieDetails(moviename) {

    var queryURL = "http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=" + process.env.OMDB_APIKEY;

    axios.get(queryURL).then(
        function (response) {
            // console.log(response);
            var result = response.data;
            logText(result);
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
function concertThis() {

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + process.env.BANDSINTOWN_APIKEY;
    //console.log(queryURL);
    axios.get(queryURL).then(
        function (response) {

            var result = response.data;

            for (var i = 0; i < result.length; i++) {
                var dateTime = result[i]["datetime"];
                // console.log("datetime from object is " + dateTime);
                //console.log("Name of the artist:" + artist);
                var concertDate = moment(dateTime).format('L');
                var venueDetails = result[i]["venue"];
                var nameOfVenue = venueDetails["name"];
                var country = venueDetails["country"];
                var location = venueDetails["city"];
                console.log("Venue Details:" + "  " + nameOfVenue + " " + location + " " + country + " " + "on" + " " + concertDate);
                logText(result);
            }

        });


}
function logText(result) {
    var logText = "\n" + text + " " + "\n";
    var objectText = JSON.stringify(result);
    var finalText = logText + "\n" + objectText;
    fs.appendFile("log.txt", finalText, function (err) {

        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {

            console.log("Content Added!");
        }

    });
}
function spotifyThisSong(param)
{
    var song = param;
    var spotify = new Spotify(keys.spotify);
    //console.log(spotify);
    if(param == "")
    {
        song = "The Sign";
    }
    spotify.search({ type: 'track', query: song })
        .then(function (response) {
            var result = response.tracks.items[0];
            //console.log(result);
            var artist = result.artists[0].name;
            console.log("Name of the Artist(s):" + artist);
            console.log("Name of the song:" + song);
            var songLink = result.href;
            console.log("Link to the song: " + songLink);
            var album = result.album["name"];
            console.log("Album the song is from :" + album);
            logText(result);
        })
        .catch(function (err) {
            console.log(err);
        });


}