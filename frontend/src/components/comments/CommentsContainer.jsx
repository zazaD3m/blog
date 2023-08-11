import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";

import {
  createNewComment,
  updateComment,
  deleteComment,
} from "../../services/index/comments";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { toast } from "react-hot-toast";

const CommentsContainer = ({
  className,
  loggedInUserId,
  comments,
  postSlug,
}) => {
  const queryClient = useQueryClient();
  const [affectedComment, setAffectedComment] = useState(null);
  const userState = useSelector((state) => state.user);

  const { mutate: mutateNewComment, isLoadingNewComment } = useMutation({
    mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
      return createNewComment({ token, desc, slug, parent, replyOnUser });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", postSlug]);
      toast.success("Your comment is added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate: mutateUpdateComment } = useMutation({
    mutationFn: ({ token, desc, commentId }) => {
      return updateComment({ token, desc, commentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", postSlug]);
      toast.success("Your comment has been updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: ({ token, desc, commentId }) => {
      return deleteComment({ token, commentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", postSlug]);
      toast.success("Your comment has been deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postSlug,
    });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    mutateUpdateComment({
      token: userState.userInfo.token,
      desc: value,
      commentId: commentId,
    });
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
    mutateDeleteComment({
      token: userState.userInfo.token,
      commentId: commentId,
    });
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />
      <div className="space-y-4 mt-8">
        {comments.map((comment) => (
          <Comment
            comment={comment}
            key={comment._id}
            loggedInUserId={loggedInUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};
export default CommentsContainer;
