import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData?.$id) {
            appwriteService.getPosts([
                Query.equal("status", "active"),
                Query.equal("userId", userData.$id)
            ]).then((response) => {
                if (response) {
                    setPosts(response.documents);
                }
            });
        }
    }, [userData]);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 w-full">No posts found for this user.</p>
                    )}
                </div>
            </Container>
        </div>
    );
}
