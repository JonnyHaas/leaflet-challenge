# leaflet-challenge
Module 15 Challenge

Earthquake Visualization Project
Description
I choose to use the past month versus a week or day.  I also choose to select all earthquake data to see earthquakes around the world.  Per the instructions it uses data provided by the United States Geological Survey (USGS). The visualization is built with Leaflet and incorporates data from the USGS's GeoJSON feed, which updates every 5 minutes. The project highlights earthquakes from the past month, plotting them based on their geographic coordinates, and visually representing their magnitude and depth through marker size and color, respectively.

Features
World Map Visualization: Displays a comprehensive view of the Earth with earthquake markers.
Fetches real-time earthquake data from the USGS GeoJSON feed for the past month.
Each earthquake marker provides additional information, such as magnitude, location, and depth, upon click.
Earthquake markers are color-coded to indicate the depth of the quake, with deeper quakes represented by darker colors.
The size of each marker reflects the magnitude of the earthquake, allowing for quick visual assessment of its strength.
A map legend explains the color coding related to earthquake depth.
How It Works
Data Source
The Challenge uses the USGS GeoJSON feed for "All Earthquakes from the Past Month." 
Clickable markers display popups with detailed information about the earthquake.
The main JavaScript file that contains the logic for fetching earthquake data, creating the map, and defining marker properties.
    - I'm not sure which is better to use "logic.js" or "app.js" for my code.  Since the provided "index.html" file referenced the "logic.js" file as the source, I used it.
    - In the previous Challenge, we were asked to use "GitHub Pages" which appeared to have a problem with reference files being in folders other than the main folder.
        - I therefore, moved all files to the main folder to avoid future confusion.  This required modifying a few lines of code in the index.html file.


Visualization
Leaflet.js is used to render the world map and plot earthquake data as markers on the map.
D3.js is optionally included for potential future enhancements or more complex data visualizations that may require its capabilities.
Key Functions
Marker Size: The getMarkerSize function calculates the marker size based on the earthquake's magnitude to visually differentiate the impact of each quake.
Marker Color: The getMarkerColor function assigns colors to markers based on the earthquake's depth, providing immediate visual cues about the depth.
Popups: 
Legend: A custom legend on the map explains the color scheme used for depths.
Project Structure
index.html: The main HTML document that hosts the map and includes links to the required JavaScript and CSS files.
style.css: Contains styles for the webpage, ensuring the map takes full height and width of the viewport.

Setup and Usage
Clone the Repository: Clone or download the project to your local machine.
Open index.html by right clicking on it and selecting "Open with Google Chrome":
Navigate the map to see recent earthquakes plotted globally. Click on markers to view detailed information about each earthquake.

I utilized ChatGpt to help me write the code along with references from class and my notes from class.  I feel the project was a success with all aspects of the project being completed except for the bonus or extra credit material.  I did not have time to complete any extra.