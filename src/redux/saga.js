import { all } from "redux-saga/effects";
const { watchSagagetlogin } = require("../resoleredux/saga");

function*rootsaga(){
    yield all([
        watchSagagetlogin(),
    ])
}
export default rootsaga