App structure


src
    action
        api.js(handle all http request)
        dCandidate.js(redux actions and action craetiors)
        store.js(configure redux store)
    
    components
        DCandidateForm.js (form operation)
        DCandidates.js(list of records)
        useForm.js(handles common form operation)

    reducers
        dCandidate.js
        index.js

App.js
index.js
index.css



Redux :
redux, react-redux, redux-thunk
action - create, update, delete etc. data
reducers(action passed to reducer, to modify data) - *1
store


*1
component -> dispatch(action) [action object pass to reducer]  -> reducer --(update data)--> component