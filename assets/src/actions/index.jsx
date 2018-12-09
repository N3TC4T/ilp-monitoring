export const FETCH_PEERS = "fetch_peers";
export const FETCH_PEER = "fetch_peer";

export const FETCH_ALERTS = "fetch_alerts";

export function fetchAlerts() {
    return fetch('api/alerts')
        .then(results => results.json())
        .then(response => {
            return {
                type: FETCH_ALERTS,
                payload: response
            };
        });
}


export function fetchPeers() {
    return fetch('api/peers')
        .then(results => results.json())
        .then(response => {
            return {
                type: FETCH_PEERS,
                payload: response
            };
        });
}

export function fetchPeer(id) {
    return fetch(`api/peers/${id}`)
        .then(results => results.json())
        .then(response => {
            return {
                type: FETCH_PEER,
                payload: response
            };
        });
}
