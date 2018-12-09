import { FETCH_PEERS, FETCH_PEER } from "../actions";

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_PEER:
            return { ...state, [action.payload.data.id]: action.payload.data };
        case FETCH_PEERS:
            return action.payload.data;
        default:
            return state;
    }
}
