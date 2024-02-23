# Race Highlights Mobile

A mobile aspect page which tracks events in a race series which can be added and saved.

[Live Site](https://amesocker.github.io/Race-Highlights-Mobile/)

This site was created for a desire to keep track of all the highlight videos from different motor sports series in one place. 

There is no installation necessary. At the moment there is no delete function for individual events. To do so one would have to enter developer tools on the web browser and delete the info from local storage.

## Usage

Currently each event needs to be added manually. This is done by clicking on the plus symbol in the top right of the screen.
Select the series, date, event/location, and session. Then click the add button.

Once the event is added they are saved to local storage. Upon re-load of the page all of the data is still present on the page including the watched checkmark.

## Change Log

-5/23/23 Added menu toggle function.

## Challenges

I had thought of this concept a while ago when I saw a race calendar app. I originally wanted to import an ics formatted calendar data and go from there. I came back to the project and started to develop the project from the html side. This way I could manually add races and track them before I can figure out how to import and parse the ics data.

The most challenging part of the project was saving the data. At first I did not remember JSON stringify and parse. So I was manipulating the data in cumbersome was to save and load the data. Writing the code again to use JSON and not break it was the most challenging aspect so far. 


## Future Development

- A delete function for individual entries.
- Sort entries by series and date.
- A separate view for watched and not watched entries.
- An ics format import to populate table.