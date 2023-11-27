import client from "../databases/appwrite.db";
import sdk from "node-appwrite";

const databases = new sdk.Databases(client);

var waitlistDB;

async function prepareDatabase() {
    waitlistDB = await databases.create(
        sdk.ID.unique(), 
        'Waitlist'
    );
}