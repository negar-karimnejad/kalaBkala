import { useGetOneCommentQuery } from "../../Redux/store/comments";
import CommentBox from "../CommentBox/CommentBox";
import jalali from "dayjs-jalali";
import dayjs from "dayjs";

function Comments({ productID }) {
  const { data: comments } = useGetOneCommentQuery(productID);
  dayjs.extend(jalali);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-10">
      {comments.map((comment) => (
        <CommentBox
          key={comment.id}
          author={comment.author}
          date={dayjs(comment.created_at)
            .locale("fa")
            .format("dddd D MMMM YYYY")}
          content={comment.content}
          rating={comment.rating}
        />
      ))}
    </div>
  );
}

export default Comments;
