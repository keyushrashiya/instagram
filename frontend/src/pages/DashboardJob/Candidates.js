import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, CardBody, CardHeader, Row } from "reactstrap";

//SimpleBar
import SimpleBar from "simplebar-react";

import avtar10 from "../../assets/images/users/avatar-10.jpg";
import avtar1 from "../../assets/images/users/avatar-1.jpg";
import avtar9 from "../../assets/images/users/avatar-9.jpg";
import avtar2 from "../../assets/images/users/avatar-2.jpg";
import avtar5 from "../../assets/images/users/avatar-5.jpg";
import avtar8 from "../../assets/images/users/avatar-8.jpg";

const Candidates = () => {
  return (
    <React.Fragment>
      <Col className="col-xxl-4">
        <Card className="card">
          <CardHeader className="card-header">
            <div className="d-flex align-items-center">
              <h6 className="card-title mb-0 flex-grow-1">
                Popular Candidates
              </h6>
              <div className="flex-shrink-0">
                <Link
                  to="/apps-job-candidate-lists"
                  className="link-primary"
                >
                  View All <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </CardHeader>
          <Row className="row g-0">
            <Col className="col-lg-6">
              <CardBody className="card-body border-end">
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control bg-light border-light"
                    autoComplete="off"
                    id="searchList"
                    placeholder="Search candidate..."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
                <SimpleBar
                  data-simplebar
                  style={{ maxHeight: "190px" }}
                  className="px-3 mx-n3"
                >
                  <ul className="list-unstyled mb-0 pt-2" id="candidate-list">
                    <li>
                      <Link to="" className="d-flex align-items-center py-2">
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs">
                            <img
                              src={avtar10}
                              alt=""
                              className="img-fluid rounded-circle candidate-img"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-13 mb-1 text-truncate">
                            <span className="candidate-name">Tonya Noble</span>{" "}
                            <span className="text-muted fw-normal">@tonya</span>
                          </h5>
                          <div className="d-none candidate-position">
                            Web Developer
                          </div>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link to="" className="d-flex align-items-center py-2">
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs">
                            <img
                              src={avtar1}
                              alt=""
                              className="img-fluid rounded-circle candidate-img"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-13 mb-1 text-truncate">
                            <span className="candidate-name">
                              Nicholas Ball
                            </span>{" "}
                            <span className="text-muted fw-normal">
                              @nicholas
                            </span>
                          </h5>
                          <div className="d-none candidate-position">
                            Assistant / Store Keeper
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="d-flex align-items-center py-2">
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs">
                            <img
                              src={avtar9}
                              alt=""
                              className="img-fluid rounded-circle candidate-img"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-13 mb-1 text-truncate">
                            <span className="candidate-name">
                              Zynthia Marrow
                            </span>{" "}
                            <span className="text-muted fw-normal">
                              @zynthia
                            </span>
                          </h5>
                          <div className="d-none candidate-position">
                            Full Stack Engineer
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="d-flex align-items-center py-2">
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs">
                            <img
                              src={avtar2}
                              alt=""
                              className="img-fluid rounded-circle candidate-img"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-13 mb-1 text-truncate">
                            <span className="candidate-name">Cheryl Moore</span>{" "}
                            <span className="text-muted fw-normal">
                              @Cheryl
                            </span>
                          </h5>
                          <div className="d-none candidate-position">
                            Product Designer
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="d-flex align-items-center py-2">
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs">
                            <img
                              src={avtar5}
                              alt=""
                              className="img-fluid rounded-circle candidate-img"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-13 mb-1 text-truncate">
                            <span className="candidate-name">
                              Jennifer Bailey
                            </span>{" "}
                            <span className="text-muted fw-normal">
                              @Jennifer
                            </span>
                          </h5>
                          <div className="d-none candidate-position">
                            Marketing Director
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="d-flex align-items-center py-2">
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs">
                            <img
                              src={avtar8}
                              alt=""
                              className="img-fluid rounded-circle candidate-img"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-13 mb-1 text-truncate">
                            <span className="candidate-name">
                              Hadley Leonard
                            </span>{" "}
                            <span className="text-muted fw-normal">
                              @hadley
                            </span>
                          </h5>
                          <div className="d-none candidate-position">
                            Executive, HR Operations
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </SimpleBar>
              </CardBody>
            </Col>
            <Col className="col-lg-6">
              <CardBody className="card-body text-center">
                <div className="avatar-md mb-3 mx-auto">
                  <img
                    src={avtar10}
                    alt=""
                    id="candidate-img"
                    className="img-thumbnail rounded-circle shadow-none"
                  />
                </div>

                <h5 id="candidate-name" className="mb-0">
                  Tonya Noble
                </h5>
                <p id="candidate-position" className="text-muted">
                  Web Developer
                </p>

                <div className="d-flex gap-2 justify-content-center mb-3">
                  <button
                    type="button"
                    className="btn avatar-xs p-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Google"
                  >
                    <span className="avatar-title rounded-circle bg-light text-body">
                      <i className="ri-google-line"></i>
                    </span>
                  </button>

                  <button
                    type="button"
                    className="btn avatar-xs p-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Linkedin"
                  >
                    <span className="avatar-title rounded-circle bg-light text-body">
                      <i className="ri-linkedin-line"></i>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn avatar-xs p-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Dribbble"
                  >
                    <span className="avatar-title rounded-circle bg-light text-body">
                      <i className="ri-dribbble-fill"></i>
                    </span>
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    className="btn btn-success custom-toggle w-100"
                    data-bs-toggle="button"
                    aria-pressed="false"
                  >
                    <span className="icon-on">
                      <i className="ri-add-line align-bottom me-1"></i> Follow
                    </span>
                    <span className="icon-off">
                      <i className="ri-user-unfollow-line align-bottom me-1"></i>{" "}
                      Unfollow
                    </span>
                  </button>
                </div>
              </CardBody>
            </Col>
          </Row>
        </Card>
        <Card className="card overflow-hidden shadow-none">
          <CardBody className="card-body bg-soft-danger">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <div className="avatar-title bg-soft-danger text-danger rounded-circle fs-17">
                    <i className="ri-gift-line"></i>
                  </div>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="fs-16">Invite your friends to Velzon</h6>
                <p className="text-muted mb-0">
                  Nor again is there anyone who loves or pursues or desires to
                  obtain pain of itself, because it is pain, but because
                  occasionally.
                </p>
              </div>
            </div>
            <div className="mt-3 text-end">
              <Link to="#" className="btn btn-danger">
                Invite Friends
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Candidates;
