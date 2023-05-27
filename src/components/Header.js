import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Scsss/Header.scss";
import { useGetDetailsQuery } from "../app/services/auth/authService";
import { logout, setCredentials } from "../features/auth/authSlice";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineLock,
} from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";

import { Link } from "react-router-dom";
const Header = () => {
  const {userInfo} = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <header>
      <div className="header-parent">
        <div className="contact-parent"></div>

        <div className="search-parent">
          <div style={{ margin: "auto" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#FF5B37" }}>
              <h2 style={{ marginLeft: "-150px", marginTop: "10px" }}>IGAP</h2>
            </Link>
          </div>
          <div className="pages-section">
            <li>
              <Link to="" className="link-page">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="link-page">
                Getjobs
              </Link>
            </li>
            <li>
              <Link to="" className="link-page">
                About us
              </Link>
            </li>
            <li>
              <Link to="" className="link-page">
                Contact us
              </Link>
            </li>
          </div>
          <nav className="container navigation">
            <div className="login">
              <div className="icon">
                <span>
                  <AiOutlineUser style={{ color: "#FF5B37" }} />
                </span>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  <span>Login</span>
                </Link>
              </div>
              <div className="icon">
                <span>
                  <GiArchiveRegister style={{ color: "#FF5B37" }} />
                </span>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  <span>Register</span>{" "}
                </Link>
              </div>
              {(userInfo && userInfo?.role==="Buyer") && <div className="icon">
                <span>
                  <GiArchiveRegister style={{ color: "#FF5B37" }} />
                </span>
                <Link
                  to="/create"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  <span>Create</span>{" "}
                </Link>
              </div>
              }
              {userInfo && <div className="icon">
                <span>
                  <AiOutlineUser style={{ color: "#FF5B37" }} />
                </span>
                <Link
                  to="/user-profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span>Profile</span>{" "}
                </Link>
              </div>}
              {userInfo && <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                  borderWidth: 1,
                  borderColor: "green",
                }}
                className="icon"
                onClick={handleLogout}
              >
                <span>
                  <AiOutlineLock />
                </span>
                <span style={{ color: "black" }}>
                  <span>Logout</span>{" "}
                </span>
              </div>}
              {userInfo && (
                <div className="icon">
                  <span style={{}}>Role: </span>
                  <span style={{ textDecoration: "none", color: "black" }}>
                    {" "}
                    <span>{userInfo?.role}</span>{" "}
                  </span>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
