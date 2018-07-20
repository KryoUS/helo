const initialstate = {
    username: '',
    id: 0,
    pic: ''
};

const SET_USER = 'SET_USER';

export default function reducer(state = initialstate, action) {
    console.log(state, action)
    switch (action.type) {
        case SET_USER:
            return Object.assign( {}, state, {
                id: action.payloadId, 
                username: action.payloadUsername, 
                pic: action.payloadPic
            } );

        default:
            return state
    }
};

export function setUser( id, username, pic ) {
    return {
        type: SET_USER,
        payloadId: id,
        payloadUsername: username,
        payloadPic: pic
    }
};