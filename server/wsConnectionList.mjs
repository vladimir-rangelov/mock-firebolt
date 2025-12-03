// Keep array of all ws connections 
'use strict';

var wsConnectionList = [];

export function getWsConnectionList() {
    return wsConnectionList;
}

export function appendWsConnection(ws) {
    wsConnectionList.push(ws);
    console.info(`Adding ws. Total connections: ${wsConnectionList.length}`);
}

export function removeWsConnection(ws) {
    const currentConnectionCount = wsConnectionList.length;
    wsConnectionList = wsConnectionList.filter(item => item !== ws);
    console.info(`Removing ws. Total connections: ${wsConnectionList.length}`);
    if (wsConnectionList.length === currentConnectionCount) {
        console.warn(`WS connection to remove not found!`);
    }
}


