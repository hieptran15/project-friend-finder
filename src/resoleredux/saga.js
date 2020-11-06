import { actionTypes } from "./action"
import {takeLatest,put} from "redux-saga/effects";

function *sagagetlogin(){
        console.log('saga ok')
}
export function* watchSagagetlogin(){
    yield takeLatest(actionTypes.GET_LOGIN ,sagagetlogin) 
}