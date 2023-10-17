/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { createContext, useContext, useMemo } from "react";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../services/posts";
import { useParams } from "react-router-dom";


const Context = createContext();


export function usePost() {
    return useContext(Context)
}

export function PostProvider({ children }) {

    const { id } = useParams();

    const { loading, error, value: post } = useAsync(() => getPost(id), [id]);

    const [comments, setComments] = useState([])






    const commentsByParentId = useMemo(() => {

        if (comments === null) return []

        const group = {};

        comments.forEach(comment => {
            group[comment.parentId] ||= [];
            group[comment.parentId].push(comment);
        });

        return group;

    }, [comments])


    function getReplies(parentId) {
        return commentsByParentId[parentId];
    }


    function createLocalComment(comment) {

        setComments(prevComments => { return [comment, ...prevComments] })

    }

    function updateLocalComment(id, message) {

        setComments(prevComments => {

            return prevComments.map(comment => {
                if (comment.id === id) {
                    return { ...comment, message }
                }
                else {
                    return comment
                }
            })
        })
    }


    useEffect(() => {
        if (post?.comments == null) return;
        setComments(post.comments)
    }, [post?.comments])


    return <Context.Provider value={{
        post: { id, ...post },
        rootComments: commentsByParentId[null],
        getReplies,
        createLocalComment,
        updateLocalComment
    }}>
        {loading ? (<h1>Loading</h1>) : error ? (<h1 className="error-msg">{error}</h1>) : children}
    </Context.Provider>
}


