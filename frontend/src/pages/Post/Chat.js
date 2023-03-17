import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Col,
  Container,
  Row,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
} from "reactstrap";

import BreadCrumb from "../../Components/Common/BreadCrumb";

const Chat = () => {
  document.title = "Starter | Velzon - React Admin & Dashboard Template";

  const socket = new WebSocket("ws://localhost:3002");

  socket.addEventListener("open", (event) => {
    console.log(`socket connected`);
  });
  socket.addEventListener("message", (event) => {
    if (event.data instanceof Blob) {
      var reader = new FileReader();
      reader.onload = () => {
        console.log(reader);
        console.log("hy Result: " + reader.result);
      };
      reader.readAsText(event.data);
    } else {
      console.log("Result: " + event.data);
    }
  });
  const sendMessage = () => {
    const message = document.getElementById("chat-input").value;
    socket.send(message);
  };

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
                        <h5 className="card-title mb-0">Chat</h5>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className=" pt-0">
                  <div
                    id="chat-conversation"
                    className="scrollbar-container chat-conversation p-3 p-lg-4 ps"
                  >
                    <ul
                      className="list-unstyled chat-conversation-list"
                      id="users-conversation"
                    >
                      <li className="chat-list left">
                        <div className="conversation-list">
                          <div className="chat-avatar">
                            <img
                              src="/velzon/react/default/static/media/avatar-2.58874a6f667b9b04ce55.jpg"
                              alt=""
                            />
                          </div>
                          <div className="user-chat-content">
                            <div className="ctext-wrap">
                              <div className="ctext-wrap-content">
                                <p className="mb-0 ctext-content">
                                  Good morning 😊
                                </p>
                              </div>
                              <div className="align-self-start message-box-drop dropdown">
                                <div
                                  tabindex="-1"
                                  role="menu"
                                  aria-hidden="true"
                                  className="dropdown-menu"
                                ></div>
                              </div>
                            </div>
                            <div className="conversation-name">
                              <small className="text-muted time">
                                09:07 am
                              </small>
                              <span className="text-success check-message-icon">
                                <i className="ri-check-double-line align-bottom"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="chat-list right">
                        <div className="conversation-list">
                          <div className="user-chat-content">
                            <div className="ctext-wrap">
                              <div className="ctext-wrap-content">
                                <p className="mb-0 ctext-content">
                                  Good morning, How are you? What about our next
                                  meeting?
                                </p>
                              </div>
                              <div className="align-self-start message-box-drop dropdown">
                                <div
                                  tabindex="-1"
                                  role="menu"
                                  aria-hidden="true"
                                  className="dropdown-menu"
                                ></div>
                              </div>
                            </div>
                            <div className="conversation-name">
                              <small className="text-muted time">
                                09:07 am
                              </small>
                              <span className="text-success check-message-icon">
                                <i className="ri-check-double-line align-bottom"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="chat-list left">
                        <div className="conversation-list">
                          <div className="chat-avatar">
                            <img
                              src="/velzon/react/default/static/media/avatar-2.58874a6f667b9b04ce55.jpg"
                              alt=""
                            />
                          </div>
                          <div className="user-chat-content">
                            <div className="ctext-wrap">
                              <div className="ctext-wrap-content">
                                <p className="mb-0 ctext-content">
                                  Yeah everything is fine. Our next meeting
                                  tomorrow at 10.00 AM
                                </p>
                              </div>
                              <div className="align-self-start message-box-drop dropdown">
                                <div
                                  tabindex="-1"
                                  role="menu"
                                  aria-hidden="true"
                                  className="dropdown-menu"
                                ></div>
                              </div>
                            </div>
                            <div className="conversation-name">
                              <small className="text-muted time">
                                09:07 am
                              </small>
                              <span className="text-success check-message-icon">
                                <i className="ri-check-double-line align-bottom"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="chat-list left">
                        <div className="conversation-list">
                          <div className="chat-avatar">
                            <img
                              src="/velzon/react/default/static/media/avatar-2.58874a6f667b9b04ce55.jpg"
                              alt=""
                            />
                          </div>
                          <div className="user-chat-content">
                            <div className="ctext-wrap">
                              <div className="ctext-wrap-content">
                                <p className="mb-0 ctext-content">
                                  Hey, I'm going to meet a friend of mine at the
                                  department store. I have to buy some presents
                                  for my parents 🎁.
                                </p>
                              </div>
                              <div className="align-self-start message-box-drop dropdown">
                                <div
                                  tabindex="-1"
                                  role="menu"
                                  aria-hidden="true"
                                  className="dropdown-menu"
                                ></div>
                              </div>
                            </div>
                            <div className="conversation-name">
                              <small className="text-muted time">
                                09:07 am
                              </small>
                              <span className="text-success check-message-icon">
                                <i className="ri-check-double-line align-bottom"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="chat-list right">
                        <div className="conversation-list">
                          <div className="user-chat-content">
                            <div className="ctext-wrap">
                              <div className="ctext-wrap-content">
                                <p className="mb-0 ctext-content">
                                  Wow that's great
                                </p>
                              </div>
                              <div className="align-self-start message-box-drop dropdown">
                                <div
                                  tabindex="-1"
                                  role="menu"
                                  aria-hidden="true"
                                  className="dropdown-menu"
                                ></div>
                              </div>
                            </div>
                            <div className="conversation-name">
                              <small className="text-muted time">
                                09:07 am
                              </small>
                              <span className="text-success check-message-icon">
                                <i className="ri-check-double-line align-bottom"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </CardBody>
                <CardFooter>
                  <div>
                    <div className="g-0 align-items-center row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control chat-input bg-light border-light"
                          id="chat-input"
                          placeholder="Type your message..."
                        />
                      </div>
                      <div className="col-auto">
                        <div className="chat-input-links ms-2">
                          <div className="links-list-item">
                            <button
                              type="button"
                              onClick={sendMessage}
                              className="chat-send waves-effect waves-light btn btn-success"
                            >
                              <i className="ri-send-plane-2-fill align-bottom"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
