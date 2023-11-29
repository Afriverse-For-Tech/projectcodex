import client from "../config/appwrite.config";
import WaitlistDocument from "../interfaces/waitlist.interface";
import sdk from "node-appwrite";
import logger from "../logging/winston.config";

const database = new sdk.Databases(client);

const collection = 'waitlist';
const db = 'codex_dev';

class WaitlistModel {
async addEmailToWaitlist(email: string): Promise<boolean> {
  try {
    const response = await database.createDocument(db, collection, sdk.ID.unique(), { email });
    
    return !!response;
  } catch (error: any) {
    logger.error(`Failed to add email to waitlist: ${error.message}`);
    throw new Error(`Failed to add email to waitlist: ${error.message}`);
  }
}

async fetchEmails(email: string): Promise<string[]> {
  try {
    const query = sdk.Query.equal('email', email);
    const existingEntries = await database.listDocuments<WaitlistDocument>(db, collection, [query]);

    return existingEntries.documents.map((doc) => doc.email);
  } catch (error: any) {
    logger.error(`Failed to fetch emails from waitlist: ${error.message}`);
    return [];
  }
}
}

export default WaitlistModel;
