# liribot

What the project does

The purpose of this project is to mimic the functionality of Iphone's SIRI. The project takes in user commands on CLI.
The valid commands are as below

 1. concert-this
 2. spotify-this-song
 3. movie-this
 4. do-what-it-says

What Each Command does is as below

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")
     
     ![alt text](https://raw.github.com/Pavani-Vithala/liribot/new/master/images/movieThis.JPEG)

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

     
4. `node liri.js do-what-it-says`

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     
* In addition to logging the data to your terminal/bash window, output of the commands is logged to a log file called `log.txt`.



Why the project is useful

The project is the basic bot functionality which can be extended to any no, of and kind of commands to get things done.
Based on the command, any functionality can be performed mimicing SIRI or google home mini for example.
How users can get started with the project

Where users can get help with your project

The users can get help for the project by emailing to pavani.vithala18@gmail.com


Who maintains and contributes to the project 

The project is owned by Pavani Vithala and will be maintained only by Pavani Vithala .
