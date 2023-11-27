import client from "../config/databases/appwrite.db";
import WaitlistDocument from "../interfaces/waitlist.interface";
import sdk from "node-appwrite";

const database = new sdk.Databases(client);

const collection = 'waitlist';
const db = 'codex_dev';

class WaitlistModel {
async addEmailToWaitlist(email: string): Promise<boolean> {
  try {
    const response = await database.createDocument(db, collection, sdk.ID.unique(), { email });
    
    return !!response;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to add email to waitlist: ${error.message}`);
  }
}

async fetchEmails(email: string): Promise<string[]> {
  try {
    const query = sdk.Query.equal('email', email);
    const existingEntries = await database.listDocuments<WaitlistDocument>(db, collection, [query]);

    return existingEntries.documents.map((doc) => doc.email);
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
}

export default WaitlistModel;
