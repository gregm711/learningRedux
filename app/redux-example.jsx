var redux = require('redux');


console.log("starting redux");

var reducer = (state = {name: 'Anonymous' }, action) => {
    console.log("action", action);
    switch (action.type) {
        case "CHANGE_NAME":
            return  {
                ...state,
                name: action.name
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


console.log("name ", store.getState());