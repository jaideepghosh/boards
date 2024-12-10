import { Databases, ID, Models } from "appwrite";
import appwriteClient from "@/config/appwrite"; // Import the configured Appwrite client

// Define the type for document data
interface DocumentData {
  [key: string]: string | number | boolean | object | null; // Define allowed types for document data
}

// Define the type for the document, based on Appwrite's response structure
interface Document {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  // Define other properties here if needed, or make it more specific based on your data structure
  [key: string]: string | number | boolean | object | null;
}

class DatabaseService {
  private databases: Databases;
  private databaseId: string;

  constructor(databaseId: string) {
    this.databaseId = databaseId;
    this.databases = new Databases(appwriteClient);
  }

  // Create a document with a type-safe payload
  async createDocument(
    collectionId: string,
    data: DocumentData
  ): Promise<Models.Document> {
    return this.databases.createDocument(
      this.databaseId,
      collectionId,
      ID.unique(),
      data
    );
  }

  // Get a document by its ID, with proper types
  async getDocument(
    collectionId: string,
    documentId: string,
    queries?: string[]
  ): Promise<Models.Document> {
    return this.databases.getDocument(
      this.databaseId,
      collectionId,
      documentId,
      queries
    );
  }

  // List all documents in a collection, properly handle the DocumentList
  async listDocuments(
    collectionId: string,
    queries?: string[]
  ): Promise<Document[]> {
    const result = await this.databases.listDocuments(
      this.databaseId,
      collectionId,
      queries
    );

    // Extract the documents array from the result
    return result.documents;
  }

  // Update an existing document with a type-safe payload
  async updateDocument(
    collectionId: string,
    documentId: string,
    data: DocumentData
  ): Promise<Models.Document> {
    return this.databases.updateDocument(
      this.databaseId,
      collectionId,
      documentId,
      data
    );
  }

  // Delete a document by its ID, return void as no data is needed from this operation
  async deleteDocument(
    collectionId: string,
    documentId: string
  ): Promise<void> {
    await this.databases.deleteDocument(
      this.databaseId,
      collectionId,
      documentId
    );
  }
}

export default DatabaseService;
