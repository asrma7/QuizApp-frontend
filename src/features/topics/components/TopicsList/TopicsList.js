import "./TopicList.css";

import { useGetTopicsQuery } from "../../topicsApiSlice";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../auth/authSlice";

const TopicsList = () => {
  const user = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  const {
    data: topics,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTopicsQuery();

  const handleCardClick = (e) => {
    if (e.target.className !== "topic-info-btn") {
      const topicId =
        e.target.className !== "topic-card"
          ? e.target.parentElement.dataset?.topicId
          : e.target.dataset?.topicId;
      navigate(`/topic/${topicId}`);
    }
  };

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <section className="topics">
        <div className="heading">
          <h1>Topics List</h1>
          {user.isAdmin ? (
            <Link to="/newtopic" className="btn btn-sm btn-success">
              Add Topic
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="list-view">
          {topics.length === 0 ? <h2>No topics Found</h2> : ""}
          {topics.map((topic, i) => {
            return (
              <div
                key={i}
                data-topic-id={topic._id}
                className="topic-card"
                onClick={handleCardClick}
                style={{ backgroundImage: `url(${topic.image})` }}
              >
                <span className="topic-info-btn">i</span>
                <div className="topic-title">{topic.title}</div>
                <div className="topic-description">{topic.description}</div>
              </div>
            );
          })}
        </div>
        <Link to="/welcome">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
export default TopicsList;
