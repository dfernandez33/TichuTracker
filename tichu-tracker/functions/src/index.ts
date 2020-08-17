import * as functions from 'firebase-functions';
import admin = require("firebase-admin");

admin.initializeApp();

const firestore = admin.firestore();

export const deleteUnfinishedGames = functions.pubsub.schedule("every day 23:30")
    .timeZone("America/New_York").onRun(async () => {
        let count = 0; // For logging purposes
        const batch = firestore.batch();
        const unfinishedGames = await firestore.collection('games').where("done", "==", false).get();
        unfinishedGames.forEach(game => {
            const now = new Date();
            const twoHoursAgo = new Date().setHours(now.getHours() - 2);
            if (game.data().startTime < twoHoursAgo) {
                batch.delete(game.ref);
                count++;
            }
        });
        console.log("Deleted " + count + " events");
        return batch.commit();
})
