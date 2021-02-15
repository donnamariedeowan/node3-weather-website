const request = require('request') 
//Geocoding 
//Address -> Lat/Long -> Weather

//
// Challenge: Goal: Print the lat/long for Los Angeles
// 
//1. Fire off a new request to the URL explored in the browser
//2. Have the request module parse it as JSON
//3. Print both the lat and the long to the terminal
//4. Test your work!

//
// Challenge: Goal: Handle errors for GeoCoding Request
// 
//1. Set up error handler for the low-level errors
//2. Test by disabling the network request and running the app
//3. Set up error handling for no matching results
//4. Test by altering the search term and running the app


// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZG9ubmFtYXJpZWRlb3dhbjI4IiwiYSI6ImNrbDA3YjA5ZzA5dGYycHBkMWIwNW12ZGQifQ.H9hoiLS8KEvXhtsLwlxHvA'

// request({url: geocodeURL, json: true}, (error, response) => {
//     if(error){
//         console.log('Unable to connect to Location Services')
//     } else if (response.body.features.length === 0){
//         console.log('Unable to find Location. Try another search')
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude) 
        
//     }
// })

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZG9ubmFtYXJpZWRlb3dhbjI4IiwiYSI6ImNrbDA3YjA5ZzA5dGYycHBkMWIwNW12ZGQifQ.H9hoiLS8KEvXhtsLwlxHvA'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Location Services!', undefined) 
        } else if (body.features.length === 0) {
            callback('Unable to find Location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode