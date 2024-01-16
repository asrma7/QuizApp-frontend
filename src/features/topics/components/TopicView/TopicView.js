import "./TopicView.css";

import {
  useGetSingleTopicQuery,
  useDeleteTopicMutation,
} from "../../topicsApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../auth/authSlice";

const TopicView = () => {
  const user = useSelector(selectCurrentUser);
  let { topicId } = useParams();

  const navigate = useNavigate();

  const [deleteTopic] = useDeleteTopicMutation();

  const handleDeleteTopic = async () => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      await deleteTopic(topicId);
      navigate("/topicslist", { replace: true });
    }
  };

  const {
    data: topic,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSingleTopicQuery(topicId);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <section className="topics">
        <div className="heading">
          <h1>{topic.title}</h1>
          {user.isAdmin ? (
            <div>
              <Link
                to={`/addquestion/${topic._id}`}
                className="btn btn-sm btn-primary "
              >
                Add Question
              </Link>
              <Link to={`/edittopic/${topicId}`} className="btn btn-sm btn-warning ">
                Edit Topic
              </Link>
              <span
                className="btn btn-sm btn-error"
                onClick={handleDeleteTopic}
              >
                Delete Topic
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="topic-body">
          <img
            className="topicview-image"
            src={topic.image}
            alt={topic.title}
          />
          <p className="topicview-description">{topic.description}</p>
          <Link to={`/startquiz/${topicId}`} className="btn btn-sm btn-success">
            Start Quiz
          </Link>
        </div>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
export default TopicView;
