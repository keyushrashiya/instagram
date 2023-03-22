import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Col,
  Container,
  Row,
  CardHeader,
  Card,
  UncontrolledTooltip,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  DropdownItem,
  UncontrolledDropdown,
  CardBody,
  CardFooter,
  Input,
  Button,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useProfile } from "../../Components/Hooks/UserHooks";
import {
  getChat,
  deleteChatMessage,
  getUser,
} from "../../helpers/backend_helper";

const socket = io("http://192.168.100.6:3000");

const Chat = () => {
  document.title = "Starter | Velzon - React Admin & Dashboard Template";
  const { userProfile } = useProfile();
  const [isJoin, setIsJoin] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeChat, setActiveChat] = useState({});
  const [roomID, setRoomID] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const [userDataList, setUserDataList] = useState([]);

  const logInUser = userProfile?.user?.username;
  const logInUserId = userProfile?.user?._id;
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      roomId: "",
    },
    validationSchema: Yup.object({
      roomId: Yup.number().required("Please Enter Room ID"),
    }),
    onSubmit: (values) => {
      socket.connect();
      setRoomID(values.roomId);
      setIsJoin(true);
      socket.emit("join_room", values.roomId);
      getChatData(values.roomId);
      validation.resetForm();
    },
  });

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageArray([...messageArray, data]);
    });
    if (JSON.stringify(userDataList) == "[]") {
      getUserList();
    }
  }, [isTyping, messageArray, userDataList, roomID]);
  console.log("roomID", roomID);
  const sendMsgValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Please Enter Message"),
    }),
    onSubmit: (values) => {
      const messageData = {
        room: roomID,
        user: { userId: userProfile.user._id, userName: logInUser },
        message: values.message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("send_message", messageData);
      console.log(messageArray);
      setMessageArray([...messageArray, messageData]);
      sendMsgValidation.resetForm();
    },
  });

  const getChatData = (id) => {
    getChat(id)
      .then((res) => {
        console.log("res =>> ", res);
        setMessageArray(res?.data?.data);
      })
      .catch((err) => {
        console.log("err =>> ", err.response);
      });
  };
  const getUserList = (id) => {
    getUser(id)
      .then((res) => {
        console.log("res =>> ", res);
        setUserDataList(res?.data?.data);
      })
      .catch((err) => {
        console.log("err =>> ", err.response);
      });
  };
  const handleDeleteMessage = (e, id) => {
    const element = document.getElementById(id);
    deleteChatMessage(id)
      .then((res) => {
        console.log("res =>> ", res);
        element.remove();
      })
      .catch((err) => {
        console.log("err =>> ", err.response);
      });
  };

  const exitChat = () => {
    setIsJoin(false);
    setMessageArray([]);
    socket.disconnect();
  };

  const handleOpenChat = (id) => {
    const generateRoomId = id + "_" + logInUserId;
    socket.connect();
    setRoomID(generateRoomId);
    socket.emit("join_room", generateRoomId);
    getChatData(generateRoomId);
  };
  console.log(messageArray);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ToastContainer autoClose={2000} limit={1} />
          <BreadCrumb title="Chat" pageTitle="chat" />
          <Row>
          
            <Col md={3}>
              <Card>
                <CardBody>
                  <div className="chat-message-list mb-3">
                    <ul
                      className="list-unstyled chat-list chat-user-list users-list"
                      id="userList"
                    >
                      {userDataList &&
                        userDataList?.map((item, key) => {
                          return (
                            <li
                              className={`border mb-1 ${
                                JSON.stringify(activeChat) !== "{}" &&
                                activeChat.id === item._id
                                  ? "active"
                                  : ""
                              }`}
                              key={key}
                            >
                              <a
                                href="#"
                                onClick={() => {
                                  handleOpenChat(item._id);
                                  setActiveChat({
                                    id: item._id,
                                    username: item.username,
                                  });
                                }}
                              >
                                <div className="d-flex align-items-center">
                                  <div className="flex-grow-1 overflow-hidden">
                                    <p className="text-truncate mb-0 text-capitalize">
                                      {item.username}
                                    </p>
                                  </div>
                                </div>
                              </a>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                    action="#"
                  >
                    <div className="mb-3">
                      <Label className="form-label" htmlFor="roomId-input">
                        Room ID
                      </Label>
                      <div className="position-relative auth-pass-inputgroup mb-3">
                        <Input
                          name="roomId"
                          value={validation.values.roomId || ""}
                          type="number"
                          className="form-control pe-5"
                          placeholder="Enter room id"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.roomId &&
                            validation.errors.roomId
                              ? true
                              : false
                          }
                        />
                        {validation.touched.roomId &&
                        validation.errors.roomId ? (
                          <FormFeedback type="invalid">
                            {validation.errors.roomId}
                          </FormFeedback>
                        ) : null}
                        <button
                          className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                          type="button"
                          id="roomId-addon"
                        >
                          <i className="ri-eye-fill align-middle"></i>
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        color="success"
                        className="btn btn-success w-100"
                        type="submit"
                      >
                        Join Chat
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>

            <Col md={9}>
              <Card>
                <CardHeader className="border-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title mb-0">
                        {JSON.stringify(activeChat) !== "{}"
                          ? activeChat.username
                          : roomID !== ""
                          ? roomID
                          : "Chat"}
                      </h5>
                    </div>
                    <button
                      type="button"
                      className="chat-send waves-effect waves-light btn btn-danger"
                      onClick={exitChat}
                    >
                      <i className="ri-close-line align-bottom"></i>
                    </button>
                  </div>
                </CardHeader>
                <CardBody className=" pt-0 px-0">
                  <ScrollToBottom
                    id="chat-conversation"
                    className="scrollbar-container chat-conversation   overflow-y-auto "
                  >
                    <ul
                      className="list-unstyled chat-conversation-list px-3"
                      id="users-conversation"
                    >
                      {messageArray &&
                        messageArray?.map((item, key) => {
                          return (
                            <li
                              className={`chat-list ${
                                item.user.userName === logInUser
                                  ? "right"
                                  : "left"
                              }`}
                              key={key}
                              id={item._id}
                            >
                              <div className="conversation-list">
                                <div className="user-chat-content">
                                  <div className="ctext-wrap flex-wrap">
                                    <h6 className="w-100 text-muted">
                                      {item.user.userName}
                                    </h6>
                                    <div className="ctext-wrap-content">
                                      <p className="mb-0 ctext-content">
                                        {item.message}
                                      </p>
                                    </div>
                                    {item.user.userName === logInUser ? (
                                      <>
                                        <UncontrolledDropdown className="align-self-start message-box-drop">
                                          <DropdownToggle
                                            href="#"
                                            className="btn nav-btn"
                                            tag="a"
                                          >
                                            <i className="ri-more-2-fill"></i>
                                          </DropdownToggle>
                                          <DropdownMenu>
                                            <DropdownItem
                                              href=""
                                              onClick={(e) => {
                                                handleDeleteMessage(
                                                  e,
                                                  item._id
                                                );
                                              }}
                                            >
                                              <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                              Delete
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <div className="align-self-start message-box-drop dropdown">
                                          <div
                                            tabIndex="-1"
                                            role="menu"
                                            aria-hidden="true"
                                            className="dropdown-menu"
                                          ></div>
                                        </div>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="conversation-name">
                                    <small className="text-muted time">
                                      {item.time}
                                    </small>
                                    <span className="text-muted check-message-icon">
                                      <i className="ri-check-double-line align-bottom"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </ScrollToBottom>
                </CardBody>
                <CardFooter>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMsgValidation.handleSubmit();
                      return false;
                    }}
                    action="#"
                  >
                    <div>
                      <div className="g-0 align-items-center row">
                        <div className="col">
                          <Input
                            name="message"
                            className="form-control"
                            placeholder="Enter user name"
                            type="text"
                            onChange={sendMsgValidation.handleChange}
                            // onBlur={(e) => {
                            //   setIsTyping(false);
                            // }}
                            // onFocus={(e) => {
                            //   setIsTyping(true);
                            // }}
                            value={sendMsgValidation.values.message || ""}
                            invalid={
                              sendMsgValidation.touched.message &&
                              sendMsgValidation.errors.message
                                ? true
                                : false
                            }
                          />
                          {sendMsgValidation.touched.message &&
                          sendMsgValidation.errors.message ? (
                            <FormFeedback type="invalid">
                              {sendMsgValidation.errors.message}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="col-auto">
                          <div className="chat-input-links ms-2">
                            <div className="links-list-item">
                              <button
                                type="submit"
                                className="chat-send waves-effect waves-light btn btn-success"
                              >
                                <i className="ri-send-plane-2-fill align-bottom"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Chat;
