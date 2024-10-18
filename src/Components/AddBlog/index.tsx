import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  handleAddBlogField,
  handleAddBlogModal,
  handleAddTheBlog,
} from "../../Slices/BlogsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import FileUploadIcon from "@mui/icons-material/FileUpload";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "700px",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  bgcolor: "background.paper",
  padding: "20px",
};
const AddBlog = () => {
  const dispatch = useDispatch();
  const { addBlog } = useSelector((state: RootState) => state.blogs);

  return (
    <Box
      sx={{
        ...style,
        outline: "none",
        "&:focus": { outline: "none" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <TextField
          sx={{ width: "300px" }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          name="title"
          value={addBlog.title}
          onChange={(event) =>
            dispatch(
              handleAddBlogField({ name: "title", value: event.target.value })
            )
          }
        />

        <TextField
          sx={{ width: "300px" }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          name="content"
          value={addBlog.content}
          onChange={(event) =>
            dispatch(
              handleAddBlogField({
                name: "content",
                value: event.target.value,
              })
            )
          }
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              sx={{
                width: "300px !important",
              }}
              label="Basic date picker"
              value={addBlog.date ? dayjs(addBlog.date) : dayjs()}
              onChange={(dayjsValue) => {
                dispatch(
                  handleAddBlogField({
                    name: "date",
                    value: dayjsValue
                      ? dayjsValue.format("YYYY-MM-DD")
                      : dayjs().format("YYYY-MM-DD"),
                  })
                );
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <div>
          <Button
            sx={{
              height: "50px",
              marginTop: "10px",
              width: "300px",
              border: "1px solid #3f3f3f",
              color: "#3f3f3f",
            }}
            variant="outlined"
            component="label"
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <FileUploadIcon />
              CLICK HERE TO UPLOAD
              <input
                type="file"
                hidden
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const base64String = reader.result;
                      dispatch(
                        handleAddBlogField({
                          name: "image",
                          value: base64String as string,
                        })
                      );
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Box>
          </Button>
          <Box>
            {addBlog.image && (
              <img
                src={addBlog.image}
                alt="blog"
                style={{ width: "50px", height: "50px" }}
              />
            )}
          </Box>
        </div>
      </Box>
      <Box>
        <Button onClick={() => dispatch(handleAddBlogModal())}>Close</Button>
        <Button onClick={() => dispatch(handleAddTheBlog())}>Save</Button>
      </Box>
    </Box>
  );
};
export default AddBlog;
