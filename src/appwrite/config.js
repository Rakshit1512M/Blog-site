import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query, Permission, Role } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost(data) {
        if (!data.featuredImage) {
            console.error("createPost error: featuredImage is missing", data);
            return;
        }

        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                data.slug,
                {
                    title: data.title,
                    content: data.content,
                    featuredImage: data.featuredImage,
                    status: data.status,
                    userId: data.userId,
                },
                [
                    Permission.read(Role.user(data.userId)),
                    Permission.write(Role.user(data.userId)),
                ]
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            console.log("Uploading file:", file);  // ✅ Add this
            const uploadedFile = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                [Permission.read(Role.any())] // ✅ public read access
            );
    
            console.log("Uploaded file:", uploadedFile);  // ✅ Add this
            return uploadedFile;
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);  // ✅ See full error
            return null;
        }
    }
    

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            const preview = this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
            return preview.href;
        } catch (error) {
            console.error("Appwrite service :: getFilePreview :: error", error);
            return "";
        }
    }
}

const service = new Service();
export default service;
