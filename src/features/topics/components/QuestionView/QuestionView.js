import "./QuestionView.css";

import {
  useGetTopicQuestionsQuery,
  useDeleteQuestionMutation,
} from "../../questionsApiSlice";
import { Link, useParams } from "react-router-dom";

import Loading from "../../../../components/Loading/Loading";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../auth/authSlice";
import { useRef, useState } from "react";
import Timer from "../../../../components/Timer/Timer";
import ResultView from "../ResultView/ResultView";

const QuestionView = () => {
  const user = useSelector(selectCurrentUser);
  const { topicId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionsPick, setOptionsPick] = useState([]);
  const [score, setScore] = useState(0);
  const [resultMode, setResultMode] = useState(false);
  const [isTimerActive, setisTimerActive] = useState(true);
  const [stopTime, setStopTime] = useState(0);

  const startTime = useRef(Date.now());

  const [deleteQuestion] = useDeleteQuestionMutation();

  const {
    refetch,
    data: questions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTopicQuestionsQuery(topicId);
  const currenQuestionUserAnswer = optionsPick.find(
    (optionPick) => optionPick["question"] === questions[currentQuestion]._id
  )?.pick;
  const currentQuestionPicked = currenQuestionUserAnswer !== undefined;

  const handleOptionClick = (e) => {
    if (!currentQuestionPicked) {
      if (
        questions[currentQuestion].answer === parseInt(e.target.dataset.index)
      ) {
        setScore(score + 1);
      }
      setOptionsPick([
        ...optionsPick,
        {
          question: questions[currentQuestion]._id,
          pick: parseInt(e.target.dataset.index),
        },
      ]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };
  const handleNext = () => {
    if (currentQuestion < questions.length - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  const handleComplete = () => {
    setStopTime(Date.now());
    setResultMode(true);
    setisTimerActive(false);
  };

  const handleDeleteQuestion = async () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await deleteQuestion(questions[currentQuestion]._id);
      refetch();
    }
  };

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    if (questions.length === 0) {
      content = <h2>No Questions Found</h2>;
    } else {
      let question = questions[currentQuestion];
      let correctAnswer;
      let incorrectAnswer;
      if (currentQuestionPicked) {
        if (question.answer !== currenQuestionUserAnswer)
          incorrectAnswer = currenQuestionUserAnswer;
        correctAnswer = question.answer;
      }
      content = (
        <section className="questions">
          <div className="heading">
            <h1>{question.topic.title}</h1>
            {user.isAdmin ? (
              <div>
                <Link to={`/editquestion/${question._id}`} className="btn btn-sm btn-warning ">
                  Edit Question
                </Link>
                <span
                  className="btn btn-sm btn-error"
                  onClick={handleDeleteQuestion}
                >
                  Delete Question
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="question-view">
            <div className="question-view-header">
              {resultMode ? (
                <div className="result-header">Your Result</div>
              ) : (
                <div className="normal-header">
                  <span className="btn btn-xs" onClick={handleComplete}>
                    Done
                  </span>
                  <Timer
                    startTime={startTime.current}
                    timerActive={isTimerActive}
                  />
                </div>
              )}
            </div>
            {resultMode ? (
              <ResultView
                time={(stopTime - startTime.current) / 10}
                score={score}
                totalQuestions={questions.length}
              />
            ) : (
              <div className="question-view-body">
                <div className="question">
                  {currentQuestion + 1}. {question.question}
                </div>
                {question.image ? (
                  <img src={question.image} alt={question._id} />
                ) : (
                  <></>
                )}
                <ol className="options" type="A">
                  {question.options.map((option, i) => {
                    return (
                      <li
                        className={`option ${
                          incorrectAnswer === i ? "incorrect" : ""
                        } ${correctAnswer === i ? "correct" : ""}`}
                        key={i}
                        data-index={i}
                        onClick={
                          !currentQuestionPicked ? handleOptionClick : null
                        }
                      >
                        {option}
                      </li>
                    );
                  })}
                </ol>
                <div className="pagination">
                  <span
                    className={`previous ${
                      currentQuestion > 0 ? "" : "disabled"
                    }`}
                    onClick={currentQuestion > 0 ? handlePrevious : null}
                  >
                    &lt;
                  </span>
                  <span
                    className={`next ${
                      currentQuestion < questions.length - 1 ? "" : "disabled"
                    }`}
                    onClick={
                      currentQuestion < questions.length - 1 ? handleNext : null
                    }
                  >
                    &gt;
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      );
    }
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default QuestionView;
