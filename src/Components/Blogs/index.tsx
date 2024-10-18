import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogsData } from "../../DataJsons/blogsData";

import Button from "@mui/material/Button";
import {
  setBlogs,
  handleClick,
  handleDelete,
  handleDeleteAll,
  handleLikedPosts,
  handleAllPosts,
  handleAddBlogModal,
} from "../../Slices/BlogsSlice";
import { RootState } from "../../Store/store";
import BlogCard from "../BlogCard";
import styles from "./index.module.css";
import leoniaLogo from "../../assets/leonia.svg";
import { Modal } from "@mui/material";
import AddBlog from "../AddBlog";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, checked, allPosts, addBlogModalOpen } = useSelector(
    (state: RootState) => state.blogs
  );
  useEffect(() => {
    dispatch(setBlogs(blogsData));
  }, []);
  useEffect(() => {
    console.log(blogs);
  }, [blogs]);
  const handleLikeClick = (id: number) => {
    dispatch(handleClick(id));
  };
  const handleDeleteClick = (id: number) => {
    console.log(id);
    dispatch(handleDelete(id));
  };
  return (
    <>
      <div className={styles.header}>
        <img src={leoniaLogo} alt="leonia" />
        <div className={styles.actionItems}>
          {checked.length > 0 && (
            <Button onClick={() => dispatch(handleDeleteAll())}>
              Delete All
            </Button>
          )}
          <Button onClick={() => dispatch(handleAddBlogModal())}>
            Add Blog
          </Button>
          <p
            style={{
              borderBottom: allPosts ? "1px solid red" : "none",
              cursor: "pointer",
            }}
            onClick={() => dispatch(handleAllPosts())}
          >
            All Posts
          </p>
          <p
            style={{
              borderBottom: !allPosts ? "1px solid red" : "none",
              cursor: "pointer",
            }}
            onClick={() => dispatch(handleLikedPosts())}
          >
            {" "}
            Liked Posts
          </p>
        </div>
      </div>
      <div className={styles.container}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              title={blog.title}
              content={blog.content}
              image={blog.image}
              liked={blog.liked}
              date={blog.date}
              handleClick={() => handleLikeClick(blog.id)}
              handleDelete={() => handleDeleteClick(blog.id)}
            />
          ))
        ) : (
          <h1>No Blogs Found</h1>
        )}
      </div>
      <Modal
        open={addBlogModalOpen}
        onClose={() => dispatch(handleAddBlogModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ outline: "none" }}
      >
        <AddBlog />
      </Modal>
    </>
  );
};
export default Blogs;
