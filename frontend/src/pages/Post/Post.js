import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import avtar1 from "../../assets/images/users/avatar-2.jpg";
import imgPlaceholder from "../../assets/images/img-placeholder.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import videoPlaceholder from "../../assets/images/video-placeholder.webp";
import {
  FormFeedback,
  Label,
  ModalFooter,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Col,
  Container,
  Row,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
} from "reactstrap";
import {
  getPost,
  postPost,
  postEdit,
  getComments,
  getUserPost,
  postLike,
  getPostTypeFilter,
  likeComment,
  postDelete,
  postComment,
  commentDelete,
} from "../../helpers/backend_helper";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useProfile } from "../../Components/Hooks/UserHooks";

const Post = () => {
  document.title = "Starter | Velzon - React Admin & Dashboard Template";
  const { userProfile } = useProfile();
  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [editID, setEditID] = useState();
  const [imageGroup, setImageGroup] = useState();
  const [postId, setPostId] = useState();
  const loggedInUserID = userProfile?.user?._id;

  // useEffect(() => {
  //   getPostData();
  // },);

  const getPostData = () => {
    getPost()
      .then((res) => {
        setPostData(res?.data?.data);
      })
      .catch((err) => {
        console.log("err ==>", err.response);
      });
  };
  const getPersonalPost = () => {
    getUserPost()
      .then((res) => {
        setPostData(res?.data?.data ? res?.data?.data : []);
      })
      .catch((err) => {
        console.log("err ==>", err.response);
        console.log("err ==>", err.response);
        if (err.response.status === 400) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };
  const getPostByType = (type) => {
    getPostTypeFilter(type)
      .then((res) => {
        setPostData(res?.data?.data ? res?.data?.data : []);
      })
      .catch((err) => {
        console.log("err ==>", err.response);
        console.log("err ==>", err.response);
        if (err.response.status === 400) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };

  const handleLike = (id) => {
    postLike(id)
      .then((res) => {
        getPostData();
      })
      .catch((err) => {
        console.log("err ==>", err.response);
        console.log("err ==>", err.response);
        if (err.response.status === 400) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };
  const handelLikeComment = (id) => {
    likeComment(id)
      .then((res) => {
        console.log(res);
        handelComment(postId);
      })
      .catch((err) => {
        console.log("err ==>", err.response);
        if (err.response.status === 400) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };
  const handleDelete = (id) => {
    postDelete(id)
      .then((res) => {
        getPostData();
      })
      .catch((err) => {
        console.log("err ==>", err.response);
        if (err.response.status === 400) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };
  const deleteComment = (id) => {
    commentDelete(id)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          handelComment(postId);
        }
      })
      .catch((err) => {
        console.log("err ==>", err.response);
        if (err.response.status === 400) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };
  const handleEdit = (id) => {
    postEdit(id, { url: imageGroup.editUrl })
      .then((res) => {
        getPostData();
        setEditModal(false);
      })
      .catch((err) => {
        console.log("err ==>", err.response);
        if (err.response.status === 400) {
          setEditModal(false);
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };
  const handelComment = (id) => {
    console.log(id);
    getComments(id)
      .then((res) => {
        console.log("res", res);
        setCommentModal(true);
        setCommentData(res?.data?.data);
      })
      .catch((err) => {
        console.log("err ==>", err.response);
        if (err.response.status === 400) {
          setEditModal(false);
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };

  const handleImage = (e) => {
    const { name, files } = e.target;
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById(name).src = e.target.result;
        const baseUrl = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "")
          .trim();
        setImageGroup((preState) => ({
          ...preState,
          [name]: baseUrl,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      type: "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Please Select Type"),
    }),
    onSubmit: (values) => {
      validation.resetForm();
      postPost({ ...values, url: imageGroup.url })
        .then((res) => {
          getPostData();
          setModal(!modal);
        })
        .catch((err) => {
          console.log("err ==>", err.response);
          console.log("err ==>", err.response);
          if (err.response.status === 400) {
            toast.error(err.response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        });
    },
  });
  // validation
  const validationComment = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("Please Enter Comment First"),
    }),
    onSubmit: (values) => {
      validationComment.resetForm();
      postComment(postId, values)
        .then((res) => {
          if (res.status === 200) {
            handelComment(postId);
          }
        })
        .catch((err) => {
          console.log("err ==>", err.response);
          console.log("err ==>", err.response);
          if (err.response.status === 400) {
            toast.error(err.response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        });
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ToastContainer autoClose={2000} limit={1} />
          <BreadCrumb title="Customers" pageTitle="Ecommerce" />
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Post</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <button
                        type="button"
                        className="btn btn-success add-btn me-1"
                        id="create-btn"
                        onClick={getPostData}
                      >
                        <i className="ri-refresh-line align-bottom"></i>
                      </button>
                      {/* <button
                        type="button"
                        className="btn btn-success add-btn me-1"
                        id="create-btn"
                        onClick={getPostData}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        className="btn btn-success me-1 add-btn"
                        id="create-btn"
                        onClick={getPersonalPost}
                      >
                        My
                      </button>
                      <button
                        type="button"
                        className="btn btn-success me-1 add-btn"
                        id="create-btn"
                        onClick={() => {
                          getPostByType("video");
                        }}
                      >
                        Video
                      </button>
                      <button
                        type="button"
                        className="btn btn-success me-1 add-btn"
                        id="create-btn"
                        onClick={() => {
                          getPostByType("image");
                        }}
                      >
                        Image
                      </button> */}
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={(e) => {
                          setModal(!modal);
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                        Post
                      </button>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <Row>
                    {postData.map((item, key) => {
                      return (
                        <Col lg={4} md={6} key={key} className="mb-3">
                          <Card className="border">
                            <CardBody>
                              {item.type === "image" ? (
                                <img
                                  alt="..."
                                  className="object-contain h-200p w-100"
                                  src={imgPlaceholder}
                                />
                              ) : (
                                <img
                                  alt="..."
                                  className="object-contain h-200p w-100"
                                  src={videoPlaceholder}
                                />
                              )}
                              <p className="mb-0 mt-2">{item.description}</p>
                            </CardBody>
                            <CardFooter className="d-flex flex-wrap align-items-center justify-content-between w-100">
                              <div className="d-flex flex-wrap align-items-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleLike(item._id);
                                  }}
                                  className="btn btn-info me-1 p-2 line-normal d-flex align-items-center justify-content-center py-1"
                                >
                                  {item.isLike ? (
                                    <i className="ri-heart-fill fs-5 me-1"></i>
                                  ) : (
                                    <i className="ri-heart-line fs-5 me-1"></i>
                                  )}
                                  {item.like_ctn}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    handelComment(item._id);
                                    setPostId(item._id);
                                  }}
                                  className="btn btn-primary me-1  p-2 line-normal d-flex align-items-center justify-content-center py-1"
                                >
                                  <i className="ri-message-3-line fs-5"></i>
                                </button>
                              </div>
                              {item.ref_id === loggedInUserID ? (
                                <div className="d-flex flex-wrap align-items-center">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleDelete(item._id);
                                    }}
                                    className="btn btn-danger me-1  p-2 line-normal d-flex align-items-center justify-content-center py-1"
                                  >
                                    <i className="ri-delete-bin-line fs-5"></i>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditModal(!editModal);
                                      setEditID(item._id);
                                    }}
                                    className="btn btn-secondary me-1 p-2 line-normal d-flex align-items-center justify-content-center py-1"
                                  >
                                    <i className="ri-pencil-line fs-5"></i>
                                  </button>
                                </div>
                              ) : null}
                            </CardFooter>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                  <Modal id="showModal" isOpen={modal} centered>
                    <ModalHeader className="bg-light p-3">Add Post</ModalHeader>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <ModalBody>
                        <input
                          type="file"
                          name="url"
                          hidden
                          onChange={handleImage}
                          id="postUrl"
                        />
                        <label
                          for="postUrl"
                          className="w-100 h-200p border shadow rounded cursor-pointer"
                        >
                          <img
                            id="url"
                            alt="..."
                            className="object-contain h-100 w-100"
                            src={avtar1}
                          />
                        </label>

                        <div>
                          <Label
                            htmlFor="customername-field"
                            className="form-label"
                          >
                            Type
                          </Label>
                          <select
                            name="type"
                            className="form-control"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.type && validation.errors.type
                                ? true
                                : false
                            }
                          >
                            <option disabled selected>
                              Select Type
                            </option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                          </select>

                          {validation.touched.type && validation.errors.type ? (
                            <FormFeedback type="invalid" className="d-block">
                              {validation.errors.type}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div>
                          <Label
                            htmlFor="customername-field"
                            className="form-label"
                          >
                            Description
                          </Label>
                          <textarea
                            className={"form-control"}
                            name="description"
                            placeholder="Enter a description"
                            rows="3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          ></textarea>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => {
                              setModal(false);
                            }}
                          >
                            Close
                          </button>

                          <button type="submit" className="btn btn-success">
                            Submit
                          </button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <Modal id="showModal" isOpen={editModal} centered>
                    <ModalHeader className="bg-light p-3">
                      Edit Post
                    </ModalHeader>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <ModalBody>
                        <input
                          type="file"
                          name="editUrl"
                          hidden
                          onChange={handleImage}
                          id="EditpostUrl"
                        />
                        <label
                          Htmlfor="EditpostUrl"
                          className="w-100 h-200p border shadow rounded cursor-pointer"
                        >
                          <img
                            id="editUrl"
                            alt="..."
                            className="object-contain h-100 w-100"
                            src={avtar1}
                          />
                        </label>
                        <div>
                          <Label
                            htmlFor="customername-field"
                            className="form-label"
                          >
                            Description
                          </Label>
                          <textarea
                            className="form-control"
                            name="description"
                            placeholder="Enter a description"
                            rows="3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          ></textarea>
                        </div>
                      </ModalBody>

                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => {
                              setEditModal(false);
                            }}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              handleEdit(editID);
                            }}
                          >
                            Save change
                          </button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <Modal id="msgshowModal" isOpen={commentModal} centered>
                    <ModalHeader className="bg-light p-3">
                      Edit Post
                    </ModalHeader>
                    <Form
                      className="w-100 mt-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validationComment.handleSubmit();

                        return false;
                      }}
                    >
                      <ModalBody>
                        <ul className="mb-3 p-0">
                          {commentData?.map((item, key) => {
                            return (
                              <li
                                key={key}
                                className="d-flex align-items-center py-3"
                              >
                                <div className="avatar-xs flex-shrink-0 me-3">
                                  <img
                                    src="/static/media/avatar-3.db8ab0bd118929359559.jpg"
                                    alt=""
                                    className="img-fluid rounded-circle"
                                  />
                                </div>
                                <div className="flex-grow-1">
                                  <div>
                                    <h5 className="fs-14 mb-1">
                                      {item?.user?.data?.username}
                                    </h5>
                                    <p className="fs-13 text-muted mb-0">
                                      {item.comment}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex-shrink-0 ms-2">
                                  {item?.user?.id === loggedInUserID ? (
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={(e) => {
                                        deleteComment(item._id);
                                      }}
                                    >
                                      <i className="ri-delete-bin-line align-middle"></i>
                                    </button>
                                  ) : null}
                                  <button
                                    type="button"
                                    className={`btn ms-1 btn-sm btn${
                                      !item.isLike ? "-outline" : ""
                                    }-success`}
                                    onClick={(e) => {
                                      handelLikeComment(item._id);
                                    }}
                                  >
                                    <i
                                      className={`ri-heart-${
                                        item.isLike ? "fill" : "line"
                                      } align-middle me-1`}
                                    ></i>
                                    {item?.likeCtn}
                                  </button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>

                        <div>
                          <textarea
                            className={"form-control"}
                            name="comment"
                            placeholder="Enter a Comment"
                            rows="3"
                            onChange={validationComment.handleChange}
                            onBlur={validationComment.handleBlur}
                          ></textarea>
                          {validationComment.touched.comment &&
                          validationComment.errors.comment ? (
                            <FormFeedback type="invalid" className="d-block">
                              {validationComment.errors.comment}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </ModalBody>

                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => {
                              setCommentModal(!commentModal);
                            }}
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-success">
                            Submit
                          </button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Post;
