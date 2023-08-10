import { v4 as uuidv4 } from "uuid";

import Post from "../models/Post";
import Comment from "../models/Comment";
import cloudinary from "../middleware/cloudinary";

const createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: "sample title",
      caption: "sample caption",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      photoId: "",
      user: req.user._id,
    });

    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;
      const updatedPost = await post.save();
      return res.json(updatedPost);
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "post_pictures",
        transformation: [
          { quality: "auto:eco" },
          { height: 800, width: 800, crop: "fill" },
        ],
      });

      if (!result) {
        const error = new Error(
          "An unknown error occured when uploading photo"
        );
        return next(error);
      }

      if (post.photoId) {
        await cloudinary.uploader.destroy(post.photoId, {
          invalidate: true,
        });
      }

      post.photo = result.secure_url;
      post.photoId = result.public_id;
      handleUpdatePostData(req.body.document);
    } else {
      if (post.photoId) {
        await cloudinary.uploader.destroy(post.photoId, {
          invalidate: true,
        });
        post.photo = "";
        post.photoId = "";
      }
      handleUpdatePostData(req.body.document);
    }
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    await Comment.deleteMany({ post: post._id });

    if (post.photo) {
      await cloudinary.uploader.destroy(post.photoId, {
        invalidate: true,
      });
    }
    return res.json({ message: "Post is successfully deleted" });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      // comments come from posts virtual property
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
          },
        ],
      },
    ]);

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

export { createPost, updatePost, deletePost, getPost };
