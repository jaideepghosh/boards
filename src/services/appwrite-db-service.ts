import { Databases, ID } from "appwrite";

import appwriteClient from "@/config/appwrite"; // Import the configured Appwrite client

class DatabaseService {
  private databases: Databases;
  private databaseId: string;

  constructor(databaseId: string) {
    this.databaseId = databaseId;
    this.databases = new Databases(appwriteClient);
  }

  async createDocument(collectionId: string, data: any) {
    return this.databases.createDocument(
      this.databaseId,
      collectionId,
      ID.unique(),
      data
    );
  }

  async getDocument(
    collectionId: string,
    documentId: string,
    queries?: string[]
  ) {
    return this.databases.getDocument(
      this.databaseId,
      collectionId,
      documentId,
      queries
    );
  }

  async listDocuments(collectionId: string, queries?: string[]) {
    return this.databases.listDocuments(this.databaseId, collectionId, queries);
  }

  async updateDocument(collectionId: string, documentId: string, data: any) {
    return this.databases.updateDocument(
      this.databaseId,
      collectionId,
      documentId,
      data
    );
  }

  async deleteDocument(collectionId: string, documentId: string) {
    return this.databases.deleteDocument(
      this.databaseId,
      collectionId,
      documentId
    );
  }
}

export default DatabaseService;
