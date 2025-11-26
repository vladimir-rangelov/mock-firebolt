/*
* Copyright 2021 Comcast Cable Communications Management, LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* SPDX-License-Identifier: Apache-2.0
*/

'use strict';

import { getWsForUser} from './wsStorage.mjs';

// POST /api/v1/raw
// Expected body: Any
function rawPayload(req, res) {
    try {
        const userId = 'global';
        const ws = getWsForUser(userId);

        if (!ws) {
            throw new Error(`No WebSocket connection found for user: ${userId}`);
        }

        const payload = {
            jsonrpc: "2.0",
            ...req.body
        };

        console.log(`Sending raw payload: ${JSON.stringify(payload)}`);

        ws.send(JSON.stringify(payload));

        res.status(200).send({
            status: "Sent payload"
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            status: "Cannot send payload",
            error
        })
    }
}

function configureAPI(app) {


    app.post('/api/v1/raw',  rawPayload);

    // =========================== Health Check Route =========================

    // Health check endpoint
    //app.get('/api/v1/healthcheck',                      healthApi.healthcheck);

    // ======================== Debugging/Tooling Routes ======================

    // Get all OpenRPC metadata
    //app.get('/api/v1/meta',                             metaApi.getMeta);


}

export { configureAPI };
