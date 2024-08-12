import React, { useEffect } from 'react'
import Post from '../components/Post'
import { StatusType } from '../enums/StatusType'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '../redux/postSlice';
import { AppDispatch, RootState } from '../redux/store';

function UserProfile() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchAllPosts());
    }, []);
    const profileImageUrl = `https://nestjs-upload.s3.amazonaws.com/posts/`;

    const { posts } = useSelector((store: RootState) => store.post)

    return (
        <div>
            {posts && posts.map((post) => (
                <Post
                    key={post.id}
                    likes={post.likes}
                    comments={post.comments}
                    imageUrl={profileImageUrl + post.id + ".jpg"}
                    title={post.title}
                    content={post.content}
                    createAt={new Date(post.createAt)}
                    status={post.status}
                    id={post.id}
                    userId={post.userId}
                />
            ))}
        </div>
    )
}

export default UserProfile