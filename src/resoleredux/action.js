export const actionTypes={
    GET_LOGIN:'GET_LOGIN',
    LOGIN_SUCCESS:'LOGIN_SUCCESS',
    LOGIN_ERROR:'LOGIN_ERROR',

    GETID_USER:'GETID_USER',
    GETID_USER_SUCCESS:'GETID_USER_SUCCESS',
    GETID_USER_ERROR:'GETID_USER_ERROR',

    GETID_PROFILE:'GETID_PROFILE',
    GETID_PROFILE_SUCCESS:'GETID_PROFILE_SUCCESS',
    GETID_PROFILE_ERROR:'GETID_PROFILE_ERROR',

    GET_SEARCH:'GET_SEARCH',
    GET_SEARCH_SUCCESS:'GET_SEARCH_SUCCESS',
    GET_SEARCH_ERROR:'GET_SEARCH_ERROR',

    GET_ROOM_ID:'GET_ROOM_ID',
    GET_ROOM_ID_SUCCESS:'GET_ROOM_ID'

};
export const getLogin=()=>{
    return {type:actionTypes.GET_LOGIN}
};
export const getIduser=(use)=>{
    return {type:actionTypes.GETID_USER,
            payload:use,
    }
};
export const getIdProfile=(value)=>{
    return {type:actionTypes.GETID_PROFILE,
            payload:value,
    }
};
export const getSearch=(value)=>{
    return {type:actionTypes.GET_SEARCH,
            payload:value,
    }
};
export const getRoomId=(id)=>{
    return {type:actionTypes.GET_ROOM_ID,
            payload:id,
    }
};
