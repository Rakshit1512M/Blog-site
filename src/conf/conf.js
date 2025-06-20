const conf = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
  };

console.log("Loaded Appwrite Config:");
console.log("URL:", import.meta.env.VITE_APPWRITE_URL);
console.log("Project ID:", import.meta.env.VITE_APPWRITE_PROJECT_ID);

export default conf


