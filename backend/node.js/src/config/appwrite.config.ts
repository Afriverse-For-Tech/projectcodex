import appwrite from "node-appwrite";

const project = process.env.APPWRITE_DB_PROJECT || 'main';
const key = process.env.APPWRITE_DB_KEY || 'main';

const client = new appwrite.Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(project)
  .setKey(key);

export default client;