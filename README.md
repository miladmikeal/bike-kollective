# BikeKollective

## Description:

BikeKollective is a mobile app that allows you to share your used bike(s) with everyone else.

## Getting Started:
#### This is a College Capstone project, if you are not the instructors and wish to run this repository from scratch, you will need to take additional steps. In that case, please see the additional getting started instructions at the bottom of this document.

You will need:
- An Android of iOS device or simulator


```sh
# install expo CLI (if not already installed)
npm install -g expo-cli

# clone the repo
git clone https://github.com/miladmikeal/bike-kollective.git

# install dependencies
npm install

# start expo server
npm run start
```

This will launch the expo metro bundler. From here, if you are using a physical device,
download the `Expo Go` app, start it, and scan the QR code to launch the app. If you
are using a simulator, start the simulator, and then click the button in the
bundler to run on iOS or Android as appropriate. Running in Web browser is not supported.

![Metro Bundler Screenshot](/screenshots/metroBundler.png?raw=true "Metro Bundler")

## Using the App
Full usage instructions can be read in the instructions.pdf file in this repo, but the
app is designed for use intuitively without the need for explicit instructions. You will
first be required to create an account or login with an existing one.

![Login Screen](/screenshots/login.png "Login Screen")

After logging in, you will be directed to a screen with a map and a list of bikes. Each
pin on the map is a bike, and corresponds to an entry in the bike list. You can click 
the blue action button at the bottom of the screen to refresh or filter the list of
bikes, the right tab of the bottom tab navigator to donate a bike to the collective, or
the next arrow on a list entry to view the details of a bike and decide to rent it.

![Home Screen](/screenshots/homeScreen.png "Home Screen")

Following the instructions to check out or add a bike should be straightforward

![Add Bike Screen](/screenshots/formScreen.png "Add Bike Screen")
![Details Screen](/screenshots/detailsScreen.png "Details Screen")

When you check out a bike, the rental lasts for 2 hours, after which time the bike will be forcibly returned.

![Ride Mode Screen](/screenshots/rideModeScreen.png "Ride Mode Screen")


## Additional Getting Started Instructions for Non-OSU users
You will additionally need:
- A Google Cloud Project you want to associate with this app
- A Firebase project you want to associate with this app
- An API key for Google Maps, enabled for your app. Expo's directions for doing this can be found [here](https://docs.expo.io/versions/latest/sdk/map-view/)

Remove the .template extension from the app.json.template and env.template files. Use
the information above to populate the required constants. The Google Maps API key needs
to be placed in the .env and app.json files. The other constants only need to go in the
.env file. You are now ready to follow the rest of the getting started instructions