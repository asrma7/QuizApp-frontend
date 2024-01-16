import "./EditTopic.css";

import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleTopicQuery,
  useUpdateTopicMutation,
} from "../../topicsApiSlice";

import {
  useUploadFileMutation,
  useDeleteUploadedFileMutation,
} from "../../../../api/uploadApiSlice";

import placeholder from "../../../../assets/images/placeholder.png";

import { backendURL } from "../../../../utils/config";

import React, { useEffect, useState } from "react";
import Loading from "../../../../components/Loading/Loading";

export const EditTopic = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  const [updateTopic] = useUpdateTopicMutation();
  const [uploadFile] = useUploadFileMutation();
  const [deleteUploadedFile] = useDeleteUploadedFileMutation();

  const navigate = useNavigate();

  const { topicId } = useParams();

  const {
    refetch,
    data: topicData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSingleTopicQuery(topicId);

  useEffect(() => {
    if (topicData) {
      setTitle(topicData?.title);
      setDescription(topicData?.description);
      setUploadedImage(topicData?.image);
    }
  }, [topicData]);

  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleDescriptionInput = (e) => setDescription(e.target.value);

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
      await updateTopic({ topicId, title, description, image: uploadedImage });
      await refetch();
      setTitle("");
      setDescription("");
      setUploadedImage("");
      navigate("/topicslist");
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

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <div className="modal-card">
        <h2>Edit Topic</h2>

        <div className="form-flex">
          <form
            className="modal-form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <p
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="form-control">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleInput}
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                rows={7}
                onChange={handleDescriptionInput}
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="image">Image:</label>
              <input
                type="url"
                id="image"
                value={uploadedImage}
                style={{ fontSize: ".9em" }}
                disabled
                required
              />
            </div>

            <div className="form-control">
              <input
                type="submit"
                value="Update Topic"
                className="btn btn-sm btn-warning"
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
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return content;
};
