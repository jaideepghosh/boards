import { Client } from "appwrite";

const appwriteClient = new Client();

appwriteClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APP_API_BASE_URL || "");

export default appwriteClient;
