import "./CreateQuestion.css";

import { useNavigate, useParams } from "react-router-dom";
import { useCreateQuestionMutation } from "../../questionsApiSlice";

import {
  useUploadFileMutation,
  useDeleteUploadedFileMutation,
} from "../../../../api/uploadApiSlice";

import placeholder from "../../../../assets/images/placeholder.png";

import { backendURL } from "../../../../utils/config";

import React, { useState } from "react";

export const CreateQuestion = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState(0);
  const [uploadedImage, setUploadedImage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { topicId } = useParams();

  const [createQuestion] = useCreateQuestionMutation();
  const [uploadFile] = useUploadFileMutation();
  const [deleteUploadedFile] = useDeleteUploadedFileMutation();

  const navigate = useNavigate();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    options.splice(index, 1);
    setOptions([...options]);
    setAnswer("");
  };

  const handleQuestionInput = (e) => setQuestion(e.target.value);
  const handleOptionInput = (e) => {
    options[e.target.dataset.index] = e.target.value;
    setOptions([...options]);
  };
  const handleAnswerInput = (e) => setAnswer(e.target.value);

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const uploadedResponse = await uploadFile(formData).unwrap();
    if (uploadedImage !== "")
      await deleteUploadedFile(
        uploadedImage.slice(`${backendURL}/uploads/`.length)
      );
    setUploadedImage(`${backendURL}/uploads/${uploadedResponse}`);
  };

  const handleUploadReset = async (e) => {
    await deleteUploadedFile(
      uploadedImage.slice(`${backendURL}/uploads/`.length)
    );
    setUploadedImage("");
  };

  const handleSubmit = async (e) => {
    setErrMsg("");
    e.preventDefault();

    try {
      await createQuestion({
        question,
        topic: topicId,
        image: uploadedImage,
        options,
        answer,
      });
      setQuestion("");
      setUploadedImage("");
      setOptions([]);
      setAnswer(0);
      navigate("/topic/" + topicId);
      console.log({ question, topicId, image, options, answer });
    } catch (err) {
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <div className="modal-card">
      <h2>New Question</h2>

      <div className="form-flex">
        <form className="modal-form" autoComplete="off" onSubmit={handleSubmit}>
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <div className="form-control">
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={handleQuestionInput}
              required
            />
          </div>
          <div className="form-control">
            <div>
              <label htmlFor="options">Options:</label>
              <span className="add-option" onClick={addOption}>
                {" "}
                <b>+</b>{" "}
              </span>
            </div>
            {options.map((option, i) => {
              return (
                <div className="options-input" key={i}>
                  <input
                    type="text"
                    id="option"
                    value={option}
                    onChange={handleOptionInput}
                    data-index={i}
                    required
                  />
                  <span
                    className="remove-option"
                    onClick={() => {
                      removeOption(i);
                    }}
                  >
                    x
                  </span>
                </div>
              );
            })}
          </div>

          <div className="form-control">
            <label htmlFor="answer">Answer:</label>
            <select id="answer" value={answer} onChange={handleAnswerInput}>
              {options.map((option, i) => {
                return (
                  <option value={i} key={i}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="image">Image:</label>
            <input
              type="url"
              id="image"
              value={uploadedImage}
              style={{ fontSize: ".9em" }}
              disabled
            />
          </div>

          <div className="form-control">
            <input
              type="submit"
              value="Add Question"
              className="btn btn-sm btn-success"
            />
          </div>
        </form>
        <form className="upload-form" onSubmit={handleUploadSubmit}>
          <div className="form-control">
            <img
              src={uploadedImage === "" ? placeholder : uploadedImage}
              alt=""
            />
          </div>
          <div className="form-control">
            <input type="file" name="image" />
          </div>
          <div className="form-control flex">
            <input
              type="submit"
              value="Upload"
              className="btn btn-sm btn-success"
            />
            <input
              type="reset"
              value="Remove"
              className="btn btn-sm btn-error"
              onClick={handleUploadReset}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
