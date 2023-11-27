import appwrite from "node-appwrite";

const client = new appwrite.Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('654e9312e05dca159b02')
  .setKey('c28b12fe02ff550d5423f9d783b181860b850afce2fa0b2cbc09ee939d787d4b47cfb7f83455d1a2f71bab5a432ae064cee478a68e1b26f08e98d44c3b890aea80e824dd0fe9d8a3a571b2af879e0ac8642b7b17dfa95b4222c4d7744239ca51665fe1d68db41d43a8be3482af34dceb7074def128e668feedf1d0de3d5c9633');

export default client;