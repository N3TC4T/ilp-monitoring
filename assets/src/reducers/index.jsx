import { combineReducers } from "redux";
import PeersReducer from "./reducer_peers";
import AlertsReducer from "./reducer_alerts";

const rootReducer = combineReducers({
    peers: PeersReducer,
    alerts: AlertsReducer
});

export default rootReducer;
