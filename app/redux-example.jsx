var redux = require('redux');


console.log("starting redux");

var stateDefault = {
    name: '',
    hobbies: [],
    movies: [],

};

var nextHobbyId = 1;

var reducer = (state = stateDefault, action) =>  {
    console.log("action", action);
    switch (action.type) {
        case "CHANGE_NAME":
            return  {
                ...state,
                name: action.name
            };
        case "ADD_HOBBY":
            return {
                ...state,
                    hobbies: [
                    ...state.hobbies,
                        {
                            id: nextHobbyId++,
                            hobby: action.hobby
                        }
                    ]
            };

        case "REMOVE_HOBBY":
            return {
                ...state,
                hobbies: state.hobbies.filter((hobby) =>  hobby.id !== action.id)
            };
        default:
            return state;
    }
};

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f

));

var currentState = store.getState();

console.log('current state', currentState);



var action = {
    type: "CHANGE_NAME",
    name: "Greg"
};

var unsubscribe = store.subscribe(() =>  {
    var state = store.getState();
    console.log("name is ", state.name);
    document.getElementById('app').innerHTML = state.name;
});

store.dispatch({
    type: "CHANGE_NAME",
    name: "Greg"

});
// unsubscribe();

store.dispatch({
    type: "CHANGE_NAME",
    name: "andrew"

});

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
    id: 2
});

console.log("name ", store.getState());