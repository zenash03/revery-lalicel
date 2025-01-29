import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('679a6f270019ac1aaa7a') // Replace with your project ID
    .setKey('standard_4822bc4c467f7abfd8c36f6d9f46a669f06f09ee5bc99b89b802d61afb82a19226350bfd9205fd76a85e6767ca11a676b42dc13c4f209d3daeffba6e64dbed00de6a35ae0f464f2cd805dfa2c5ae09d38df0d23fb1249268c799e9a1730cca06a0d7980a2fca647c3efe2e7157f57954c5fe20c3f1a615159e6a40a6feef800a')



export const account = new Account(client);


const databases = Databases.client(client);
const promise = databases.listDocuments('679a734100278916467c');

export { ID } from 'appwrite';