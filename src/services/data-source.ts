import DatabaseService from "@/services/appwrite-db-service";

/**
 * CONFIGS
 */
const DATABASE_ID = "boards";
const COLLECTION_ID = "sources";

const dataSourceDatabase = new DatabaseService(DATABASE_ID);
export const createDocument = async (data: any) => {
  return dataSourceDatabase.createDocument(COLLECTION_ID, data);
};

export const getDocument = async (documentId: string, queries?: string[]) => {
  return dataSourceDatabase.getDocument(COLLECTION_ID, documentId, queries);
};

export const listDocuments = async (queries?: string[]) => {
  return dataSourceDatabase.listDocuments(COLLECTION_ID, queries);
};

export const updateDocument = async (documentId: string, data: any) => {
  return dataSourceDatabase.updateDocument(COLLECTION_ID, documentId, data);
};

export const deleteDocument = async (documentId: string) => {
  return dataSourceDatabase.deleteDocument(COLLECTION_ID, documentId);
};
