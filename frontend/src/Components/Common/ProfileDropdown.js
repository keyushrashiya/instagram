import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => ({
    user: state.Profile.user,
  }));
  const [userName, setUserName] = useState("Admin");
  
  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));
      setUserName(obj.user.username);
    }
  }, [userName, user]);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={avatar1}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {userName}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                Founder
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {userName}!</h6>
          <Link to="/profile" className="dropdown-item">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Profile</span>
          </Link>

          <Link to="/apps-chat" className="dropdown-item">
            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Messages</span>
          </Link>
          <Link to="/" className="dropdown-item">
            <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Taskboard</span>
          </Link>
          <Link to="/pages-faqs" className="dropdown-item">
            <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Help</span>
          </Link>
          <div className="dropdown-divider"></div>
          <Link to="/pages-profile" className="dropdown-item">
            <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">
              Balance : <b>$5971.67</b>
            </span>
          </Link>
          <Link to="/pages-profile-settings" className="dropdown-item">
            <span className="badge bg-soft-success text-success mt-1 float-end">
              New
            </span>
            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Settings</span>
          </Link>
          <Link to="/auth-lockscreen-basic" className="dropdown-item">
            <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Lock screen</span>
          </Link>
          <Link to="/logout" className="dropdown-item">
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
