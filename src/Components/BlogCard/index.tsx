import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import {
  handleClose,
  handleDeleteChecked,
  handleEdit,
  handleFieldChange,
  handleHoverEnter,
  handleHoverLeave,
  handleRemoveCheckedClick,
  handleSave,
} from "../../Slices/BlogsSlice";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import styles from "./index.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import VerifiedSharpIcon from "@mui/icons-material/VerifiedSharp";
interface BlogCardProps {
  id: number;
  title: string;
  content: string;
  liked: boolean;
  image: string;
  date: string;
  handleClick: (id: number) => void;
  handleDelete: (id: number) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  content,
  liked,
  date,
  image,
  handleClick,
  handleDelete,
}) => {
  const { modelOpen, editedData, hoveredCard, checked } = useSelector(
    (state: RootState) => state.blogs
  );
  useEffect(() => {}, [modelOpen]);
  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const dispatch = useDispatch();
  return (
    <>
      <div
        onDoubleClick={() => dispatch(handleDeleteChecked(id))}
        onMouseEnter={() => dispatch(handleHoverEnter(id))}
        className={styles.card}
        onMouseLeave={() => dispatch(handleHoverLeave(id))}
      >
        {checked.includes(id) && (
          <div
            onClick={() => dispatch(handleRemoveCheckedClick(id))}
            className={styles.checkedIcon}
          >
            <VerifiedSharpIcon />{" "}
          </div>
        )}

        <div className={styles.detailsConatiner}>
          <div className={styles.titleContainer}>
            {/* <h1 className={styles.title}>{title}</h1> */}
            <img
              style={{ width: "310px", height: "200px" }}
              src={image}
              alt="blog"
            />
            <p className={styles.content}>{content}</p>
          </div>
          {hoveredCard[id] && (
            <div className={styles.actionsContainer}>
              <div onClick={() => dispatch(handleEdit(id))}>
                <ModeEditIcon />
              </div>
              <div onClick={() => handleDelete(id)}>
                <DeleteOutlineIcon />
              </div>
            </div>
          )}
          <div className={styles.dateContainer}>
            <>
              <p className={styles.date}>{formattedDate(date)}</p>
            </>
            <p onClick={() => handleClick(id)}>
              {liked ? <FavoriteSharpIcon /> : <FavoriteBorderIcon />}
            </p>
          </div>
        </div>
      </div>
      {modelOpen && (
        <Modal
          open={modelOpen}
          onClose={() => dispatch(handleClose())}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ outline: "none" }}
        >
          <Box sx={style}>
            <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <TextField
                sx={{ minWidth: "300px" }}
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                name="title"
                value={editedData?.title}
                onChange={(event) =>
                  dispatch(
                    handleFieldChange({
                      name: "title",
                      value: event.target.value,
                    })
                  )
                }
              />
              <TextField
                sx={{ minWidth: "300px" }}
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                name="content"
                value={editedData?.content}
                onChange={(event) =>
                  dispatch(
                    handleFieldChange({
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
                      minWidth: "300px !important",
                    }}
                    value={dayjs(editedData?.date)}
                    onChange={(dayjsValue) =>
                      dispatch(
                        handleFieldChange({
                          name: "date",
                          value: dayjsValue?.format("YYYY-MM-DD"),
                        })
                      )
                    }
                    label="Basic date picker"
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
                          reader.onloadend = () => {
                            const base64String = reader.result;
                            dispatch(
                              handleFieldChange({
                                name: "image",
                                value: base64String,
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
                  {editedData.image && (
                    <img
                      src={editedData.image}
                      alt="blog"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </Box>
              </div>
            </Box>
            <Box>
              <Button onClick={() => dispatch(handleClose())}>Close</Button>
              <Button onClick={() => dispatch(handleSave())}>Save</Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};
export default BlogCard;
