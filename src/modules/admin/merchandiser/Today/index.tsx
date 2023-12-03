import { useState } from "react";
import axios from "axios";
import { FormContainer } from "../../book/BookForm/styles";
import { TodayContainer } from "./style";
import { BASE_URL } from "../../book/Book";

const TodayBook = () => {
  const [itemId, setItemId] = useState("");
  const [todayLetter, setTodayLetter] = useState("");
  const [readDate, setReadDate] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemId", itemId);
    formData.append("todayLetter", todayLetter);
    formData.append("readDate", readDate);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(`${BASE_URL}/today`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Book uploaded successfully!");
    } catch (error) {
      console.error("Error uploading book:", error);
      alert("Error uploading book");
    }
  };

  return (
    <div>
      <TodayContainer>
        <p>오늘의 책</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Item ID :</span>
            <input type="number" value={itemId} onChange={(e) => setItemId(e.target.value)} placeholder="Item ID" />
          </label>
          <label>
            <span>MD 추천 글:</span>
            <textarea
              value={todayLetter}
              onChange={(e) => setTodayLetter(e.target.value)}
              placeholder="Today's Letter"
            />
          </label>
          <label>
            <span>날짜 :</span>
            <input type="date" value={readDate} onChange={(e) => setReadDate(e.target.value)} />
          </label>
          <label>
            <span>도서 이미지 :</span>
            <input type="file" multiple onChange={handleImageChange} />
          </label>

          <button type="submit">Submit</button>
        </form>
      </TodayContainer>
    </div>
  );
};

export default TodayBook;
