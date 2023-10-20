import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>BookDetail Page</h1>
      <div>
        <h3>BookDetail Detail</h3>
        <p>{id}</p>
      </div>
    </div>
  );
};
export default BookDetail;
