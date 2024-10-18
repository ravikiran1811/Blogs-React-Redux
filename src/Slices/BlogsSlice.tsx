import { createSlice } from "@reduxjs/toolkit";
import { blogsData } from "../DataJsons/blogsData";
import dayjs from "dayjs";
interface Blog {
  id: number;
  title: string;
  content: string;
  liked: boolean;
  date: string;
  image: string;
}
interface EditBlog {
  title: string;
  content: string;
  date: string;
  image: string;
}
interface BlogsState {
  blogs: Blog[];
  modelOpen: boolean;
  editIndex?: number;
  editedData: EditBlog;
  hoveredCard: { [id: number]: boolean };
  checked: number[];
  liked: number[];
  allPosts: boolean;
  image: string;
  addBlog: EditBlog;
  addBlogModalOpen: boolean;
}
const initialState: BlogsState = {
  blogs: [],
  modelOpen: false,
  editIndex: -1,
  editedData: {
    title: "",
    content: "",
    date: "",
    image: "",
  },
  hoveredCard: {},
  checked: [],
  liked: [],
  allPosts: true,
  image: "",
  addBlog: {
    title: "",
    content: "",
    date: dayjs().format("YYYY-MM-DD"),
    image: "",
  },
  addBlogModalOpen: false,
};
export const BlogsSlice = createSlice({
  name: "blogs",
  initialState,

  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    handleClick: (state, action) => {
      const blogId = action.payload;
      const index = state.liked.indexOf(blogId);
      if (index !== -1) {
        state.liked.splice(index, 1);
      } else {
        state.liked.push(blogId);
      }
      console.log("liked", state.liked);
      const updatedBlogs = state.blogs.map((blog) =>
        state.liked.includes(blog.id)
          ? { ...blog, liked: true }
          : { ...blog, liked: false }
      );
      state.blogs = updatedBlogs;
    },
    handleDelete: (state, action) => {
      const updatedBlogs = state.blogs.filter(
        (blog) => blog.id !== action.payload
      );
      state.checked.push(action.payload);
      state.blogs = updatedBlogs;
    },
    handleEdit: (state, action) => {
      state.modelOpen = true;
      state.editIndex = action.payload;
      state.editedData = state.blogs[action.payload - 1];
    },
    handleClose: (state) => {
      state.modelOpen = false;
      state.editIndex = -1;
    },
    handleFieldChange: (state, action) => {
      const { name, value } = action.payload;
      console.log("name", name, "value", value);
      state.editedData[name as keyof EditBlog] = value;
    },
    handleSave: (state) => {
      const updatedBlogs = state.blogs.map((blog, index) =>
        blog.id === state.editIndex ? { ...blog, ...state.editedData } : blog
      );
      console.log("edit", state.editedData.image);
      state.blogs = updatedBlogs;
      state.modelOpen = false;
      state.editIndex = -1;
    },
    handleHoverEnter: (state, action) => {
      state.hoveredCard[action.payload] = true;
    },
    handleHoverLeave: (state, action) => {
      state.hoveredCard[action.payload] = false;
    },
    handleDeleteChecked: (state, action) => {
      state.checked.push(action.payload);
    },
    handleDeleteAll: (state) => {
      state.blogs = state.blogs.filter(
        (blog) => !state.checked.includes(blog.id)
      );
      state.checked = [];
    },
    handleLikedPosts: (state) => {
      state.blogs = state.blogs.filter((blog) => state.liked.includes(blog.id));
      const updatedBlogs = state.blogs.map((blog) => ({
        ...blog,
        liked: true,
      }));
      state.blogs = updatedBlogs;
      state.allPosts = false;
    },
    handleAllPosts: (state) => {
      state.blogs = blogsData.map((blog) => ({
        ...blog,
        liked: state.liked.includes(blog.id),
      }));
      state.blogs = state.blogs.filter(
        (blog) => !state.checked.includes(blog.id)
      );
      state.blogs = state.blogs.filter(
        (blog) => !state.checked.includes(blog.id)
      );

      state.allPosts = true;
    },
    handleRemoveCheckedClick: (state, action) => {
      state.checked = state.checked.filter((id) => id !== action.payload);
    },
    handleAddBlog: (state) => {
      state.modelOpen = true;
    },
    handleAddBlogField: (state, action) => {
      const { name, value } = action.payload;
      console.log("name", name, "value", value);

      state.addBlog[name as keyof EditBlog] = value;
      console.log("addBlog", state.addBlog);
    },
    handleAddTheBlog: (state) => {
      state.blogs.push({
        id: state.blogs.length + 1,
        liked: false,

        ...state.addBlog,
      });
      state.addBlogModalOpen = !state.addBlogModalOpen;
      state.addBlog = {
        title: "",
        content: "",
        date: "",
        image: "",
      };
    },
    handleAddBlogModal: (state) => {
      state.addBlogModalOpen = !state.addBlogModalOpen;
    },
  },
});
export const {
  setBlogs,
  handleClick,
  handleDelete,
  handleEdit,
  handleClose,
  handleFieldChange,
  handleSave,
  handleHoverEnter,
  handleHoverLeave,
  handleDeleteChecked,
  handleDeleteAll,
  handleRemoveCheckedClick,
  handleAllPosts,
  handleLikedPosts,
  handleAddBlog,
  handleAddBlogField,
  handleAddTheBlog,
  handleAddBlogModal,
} = BlogsSlice.actions;
export default BlogsSlice.reducer;
