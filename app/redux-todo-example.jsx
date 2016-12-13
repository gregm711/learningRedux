var redux = require('redux');


var stateDefault = {
    searchText: '',
    showCompleted: false,
    todos: [],

};

var reducer = (state = stateDefault, action) =>  {
    switch(action.type) {
        case "CHANGE_SEARCH_TEXT":
            return  {
                ...state,
                searchText: action.searchText
            };
        case "CHANGE_SHOW_COMPLETED":
            return  {
                ...state,
                searchText: action.showCompleted
            };
        default:
            return state;

    }
};


var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));


store.subscribe(() =>  {
    var state = store.getState();
    document.getElementById('app').innerHTML = state.searchText;
});

store.dispatch({
    type: "CHANGE_SEARCH_TEXT",
    searchText: "text"

});

store.dispatch({
    type: "CHANGE_SEARCH_TEXT",
    searchText: "fuck"

});

console.log('changing search text', store.getState());