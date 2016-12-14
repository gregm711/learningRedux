var redux = require('redux');
var axios = require('axios');


console.log("starting redux");

var stateDefault = {
    name: '',
    hobbies: [],
    movies: [],

};

var nextHobbyId = 1;


var nameReducer = (state = 'Ananoymouse', action) => {
    switch(action.type) {
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state;
    }

};

var changeName = (name) => {
    return {
        type: "CHANGE_NAME",
        name
    }
};


var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
    switch (action.type) {
        case 'START_LOCATION_FETCH':
            return {
                isFetching: true,
                url: undefined

            };
        case 'COMPLETE_LOCATION_FETCH':
            return  {
                isFetching: false,
                url: action.url
            };
        default:
            return state;
    }

};


var startLocationFetch  =  () => {
    return {
        type: 'START_LOCATION_FETCH'

    };
};

var completeLocationFetch  =  (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    };
};

var fetchLocation = () =>  {
    store.dispatch(startLocationFetch());

    axios.get("http://ipinfo.io").then(function (res) {
        var loc = res.data.loc;
        var baseUrl = "http://maps.google.com?q=";
        store.dispatch(completeLocationFetch(baseUrl + loc));


    });
};

var hobbiesReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_HOBBY":
        return  [
            ...state,
            {
                id: nextHobbyId++,
                hobby: action.hobby
            }
        ];
        case "REMOVE_HOBBY":
            return state.filter((hobby) =>  hobby.id !== action.id);
        default:
            return state;
    }
};

var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    map: mapReducer

});

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f

));

var currentState = store.getState();

console.log('current state', currentState);



var unsubscribe = store.subscribe(() =>  {
    var state = store.getState();
    console.log("name is ", state.name);
    document.getElementById('app').innerHTML = state.name;

    if (state.map.isFetching) {
        document.getElementById('app').innerHTML = 'loading...';

    } else if (state.map.url) {
        document.getElementById('app').innerHTML = '<a href="' + state.map.url + '"  target="_blank">View your location</a>'
    }
});


store.dispatch(changeName('Bob'));

fetchLocation();

store.dispatch({
    type: "ADD_HOBBY",
    hobby: "coding"
});

store.dispatch({
    type: "ADD_HOBBY",
    hobby: "eating"

});


store.dispatch({
    type: "REMOVE_HOBBY",
    id: 1
});

console.log("name ", store.getState());