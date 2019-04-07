require("dotenv").config();
var moment = require("moment");
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require("node-spotify-api");
//Variable which captures user's choice
var command = process.argv[2];
//If parameter 3 exits, this command is to ignore the spaces in the words like a song and consider it as a single  parameter
var param = process.argv.slice(3).join(" ");
var text = command + " " + param + "\n";



switch (command) {
    case "concert-this":
        var artist = param;
        //If user's choice is to concert a song, call the function concertThis()
        concertThis(artist);

        break;
    case "spotify-this-song":
        //If user's choice is to get a song details from Spotify API, call the function spotifyThisSong()
        spotifyThisSong(param);


        break;
    case "movie-this":
        //If user do not provide a command, this is the default, display the details of Mr.Nobody movie by calling getMovieDetails function
        if (param == "") {
            param = "Mr.Nobody";
            getMovieDetails(param);
        } else {

            getMovieDetails(param);
        }

        break;
    case "do-what-it-says":
        //if the choice is do-what-it-says, read the command from a text file and execute
        console.log("Entered do-what-it-says function");
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            //get the string from text file and split by comma
            var dataArr = data.split(",");
            //store the split elements in an array called dataArr1
            var dataArr1 = dataArr[1].slice();
            console.log(dataArr1);
            //If the first value of dataArr is movie-this, call the function getMovieDetails and pass the dataArr1 as arguement
            if (dataArr[0] == "movie-this")
                getMovieDetails(dataArr1);
            //If the first value of dataArr is concert-this, call the function concertThis and pass the dataArr1 as arguement
            if (dataArr[0] == "concert-this")
                concertThis(dataArr1);
            //If the first value of dataArr is spotify-this-song, call the function spotifyThisSong and pass the dataArr1 as arguement
            if (dataArr[0] == "spotify-this-song")
                spotifyThisSong(dataArr1);
        });
        break;

}

//Function to display the movie details from the omDB api by passing the movie name as parameter
function getMovieDetails(moviename) {

    var queryURL = "http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=" + process.env.OMDB_APIKEY;
    //Axios call to omdb API to get details like title,year,imdbrating,Country,Language,Plot and Actors
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

//Function to display event details from bandsintown APi by passing artist name
function concertThis(artist) {

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + process.env.BANDSINTOWN_APIKEY;

    //Axios call to get details of the event like venue ,country,city
    axios.get(queryURL).then(
        function (response) {

            var result = response.data;

            for (var i = 0; i < result.length; i++) {
                var dateTime = result[i]["datetime"];
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

//Function to log all the results of the commands in a text file
function logText(result) {
    var logText = "\n" + text + " " + "\n";
    var objectText = JSON.stringify(result);
    var finalText = logText + "\n" + objectText;
    //appendFile to append the contents and avoid overwriting
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

//Function to display the details of a song from spotify API base don the song name
function spotifyThisSong(param) {
    var song = param;
    //create a Spotify API key from Spotify object in keys file
    var spotify = new Spotify(keys.spotify);
    //If no song name is passed, display details for The Sign song
    if (param == "") {
        song = "The Sign";
    }
    //Pass the song name and search the spotify DB
    spotify.search({ type: 'track', query: song })
        .then(function (response) {
            var result = response.tracks.items[0];

            var artist = result.artists[0].name;
            console.log("Name of the Artist(s):" + artist);
            console.log("Name of the song:" + song);
            var songLink = result.href;
            console.log("Link to the song: " + songLink);
            var album = result.album["name"];
            console.log("Album the song is from :" + album);
            //Log the results in the text file for logging
            logText(result);
        })
        .catch(function (err) {
            console.log(err);
        });


}