import Button from "./Button";
import MyModal from "./Modal";
import { useState } from "react";

export default function AddNewCourse({
  onHandleShow,
  showModal,
  onAddCourse,
  currentUserName,
}) {
  const [courseTitle, setCourseTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("https://i.pravatar.cc/48");

  function handleShown() {
    onHandleShow((shown) => !shown);
  }

  function handleCreateCourse() {
    if (!courseTitle || !thumbnail) return;
    const id = Date.now();
    const newCourse = {
      id,
      title: courseTitle,
      thumbnail: `https://i.pravatar.cc/48?u=${id}`,
      author: currentUserName,
    };

    onAddCourse(newCourse);

    setCourseTitle("");
    setThumbnail("https://i.pravatar.cc/48");
    onHandleShow();
  }

  return (
    <MyModal show={showModal} title="YOUR NEW COURSE" onHide={handleShown}>
      <div>
        <label>Course Title</label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          style={{
            padding: "1rem 2rem 1rem 2rem",
            display: "inline-block",
            marginLeft: "2em",
            marginRight: "2em",
          }}
          type="text"
          placeholder="Course title"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />
        <label>Course Thumbnail</label>
        &nbsp; &nbsp;
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <Button onClick={handleCreateCourse} bgColor="green" textColor="#fff">
          Create Course
        </Button>
      </div>
    </MyModal>
  );
}
