import { Link } from "react-router-dom";
import "./ResultView.css";

import React from "react";

const ResultView = ({ time, score, totalQuestions }) => {
  // Hours calculation
  const hours = Math.floor(time / 360000).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let content = (
    <div className="result-view">
      <span>
        Time: {hours}:{minutes}:{seconds}
      </span>
      <span>
        Score: {score}/{totalQuestions}
      </span>
      <p>
        <Link to="/topicslist" replace>
          Go to the Topics List
        </Link>
      </p>
    </div>
  );

  return content;
};

export default ResultView;
