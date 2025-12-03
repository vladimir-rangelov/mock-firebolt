'use strict';

import { logger } from './logger.mjs';
import * as fireboltOpenRpc from './fireboltOpenRpc.mjs';
import { config } from './config.mjs';
import { getWsConnectionList } from './wsConnectionList.mjs';

let id = 1;
const { dotConfig: { eventConfig } } = config;

function createBidirectionalPayload(method, params) {
  return {
    //id: id++,  // No id as this is an event
    jsonrpc: "2.0",
    method,
    params
  };
}

function callAppApi(ws, method, params) {

  let payload = createBidirectionalPayload(method, params);
  ws.send(JSON.stringify(payload)); // Send bidirectional event
  logger.info(`Sent bidirectional API call: ${JSON.stringify(payload)}`);
}

function testAppApiMethods(methodToCall) {

  setTimeout(() => {
    //get biderctial method exaple params 
    const paramsArray = fireboltOpenRpc.getFirstExampleParamsForMethod(methodToCall, false);

    const wsList = getWsConnectionList();

    if (!wsList || wsList.length === 0) {
       logger.error(`Empty WebSocket connection list`);
    }

    wsList.forEach(ws => {
      logger.info(`Calling App API Method: ${methodToCall} with params: ${JSON.stringify(paramsArray)}`);
      // Emit a response to the client app indicating that the event listener has been registered  
      callAppApi(ws, methodToCall, paramsArray);
    });

  }, 10);
}

function testAllAppApiMethods(ws) {
  // Test all app API methods
  /*
  const methods = fireboltOpenRpc.getAllMethods();
  methods.forEach(method => {
    const params = fireboltOpenRpc.getFirstExampleParamsForMethod(method, false);
    callAppApi(null, method, params);
  });
*/

  //testAppApiMethods(ws, "PinChallenge.challenge");
  //testAppApiMethods(ws, "Keyboard.standard");

}


export {
  callAppApi,
  testAppApiMethods,
  testAllAppApiMethods
};
