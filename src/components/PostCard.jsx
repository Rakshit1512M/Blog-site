import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
    // Ensure we only try to get preview if featuredImage is valid
    let imageUrl = "";

    if (featuredImage) {
        try {
            imageUrl = appwriteService.getFilePreview(featuredImage);
            if (imageUrl && typeof imageUrl.toString === "function") {
                imageUrl = imageUrl.toString();
            } else {
                imageUrl = "";
            }
        } catch (error) {
            console.error("Error generating image preview:", error);
            imageUrl = "";
        }
    }

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                {imageUrl && (
                    <div className="w-full justify-center mb-4">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="rounded-xl"
                        />
                    </div>
                )}
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
