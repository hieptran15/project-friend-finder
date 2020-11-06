import { actionTypes } from "./action";

const initialstate={
    list:[],
    profile:'',
    search:null,
    roomId:'',
}
const hobbyreducer= (state = initialstate,action) => {
    switch(action.type){
        case actionTypes.GETID_USER:
            // console.log({action})
            return{
                ...state,
                list:action.payload
            }
        case actionTypes.GETID_PROFILE:
            // console.log({action})
            return{
                ...state,
                profile:action.payload
            }
        case actionTypes.GET_SEARCH:
                // console.log({action})
                return{
                    ...state,
                    search:action.payload
                }
        case actionTypes.GET_ROOM_ID:
                    // console.log({action})
                    return{
                        ...state,
                        roomId:action.payload
                    }
        default:
            return state;
    }
}
export default hobbyreducer;