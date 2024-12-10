import DatabaseService from "@/services/appwrite-db-service";

/**
 * CONFIGS
 */
const DATABASE_ID = "boards";
const COLLECTION_ID = "sources";

// Define the type for document data (use the same type for creation and update)
interface DocumentData {
  [key: string]: string | number | boolean | object | null; // Define the possible types for your document data
}

// Define the type for the document response (assuming Appwrite's document structure)
interface Document {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  [key: string]: string | number | boolean | object | null; // Adjust the types based on your actual data
}

const dataSourceDatabase = new DatabaseService(DATABASE_ID);

// Create document function
export const createDocument = async (data: DocumentData): Promise<Document> => {
  return dataSourceDatabase.createDocument(COLLECTION_ID, data);
};

// Get document function
export const getDocument = async (
  documentId: string,
  queries?: string[]
): Promise<Document> => {
  return dataSourceDatabase.getDocument(COLLECTION_ID, documentId, queries);
};

// List documents function
export const listDocuments = async (
  queries?: string[]
): Promise<Document[]> => {
  return dataSourceDatabase.listDocuments(COLLECTION_ID, queries);
};

// Update document function
export const updateDocument = async (
  documentId: string,
  data: DocumentData
): Promise<Document> => {
  return dataSourceDatabase.updateDocument(COLLECTION_ID, documentId, data);
};

// Delete document function
export const deleteDocument = async (documentId: string): Promise<void> => {
  return dataSourceDatabase.deleteDocument(COLLECTION_ID, documentId);
};
