const sdk = require("node-appwrite");

let appwriteClient = new sdk.Client();

appwriteClient
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
    .setKey(process.env.APPWRITE_API_SECRET); // Your secret API key
    // .setSelfSigned() // Use only on dev mode with a self-signed SSL cert

module.exports = appwriteClient;