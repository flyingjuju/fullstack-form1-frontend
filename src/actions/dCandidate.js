//need a better way 
//export const create = data => {
//     return{
//         type : "create",
//         payload: data
//     }
// }

// //dispatch(create({fullName: ""}))
import api from './api';

export const ACTION_TYPES = {
    CREATE : "CREATE",
    UPDATE : "UPDATE",
    DELETE :"DELETE",
    FETCH_ALL : "FETCH_ALL"
}
const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})

export const fetchAll = () => {
    return dispatch => {
        //get api req

        api.dCandidate().fetchAll()
        .then(res => {
            console.log(res)
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL,
                    payload: res.data
                })

            }
        )
        .catch(err => console.log(err))
    }
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data);
    api.dCandidate().create(data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}


export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data);
    api.dCandidate().update(id, data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: {id: id, ...data}
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}


export const  Delete= (id,  onSuccess) => dispatch => {

    api.dCandidate().delete(id)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: {id: id}
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}