var wsStorage = null;

export function getWsForUser(userId) {
    return wsStorage;
}

export function associateUserWithSessionWsMap(userId, ws) {
    wsStorage = ws;
}

export function removeUserFromSessionWsMap(userId) {
    console.info(`============= Removing ws for user: ${userId}`);
    wsStorage = null;
}


