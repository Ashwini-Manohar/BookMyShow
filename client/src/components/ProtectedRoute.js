// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import {
// HomeOutlined,
// LogoutOutlined,
// ProfileOutlined,
// UserOutlined,
// } from "@ant-design/icons";
// import { GetCurrentUser } from "../api/users";
// import { SetUser } from "../redux/userSlice";
// import { message, Layout, Menu } from "antd";
// import { ShowLoading, HideLoading } from "../redux/loaderSlice";
// const ProtectedRoute = ({ children }) => {
// const { user } = useSelector((state) => state.users);
// const dispatch = useDispatch();
// const navigate = useNavigate();
// const { Header, Content, Footer, Sider } = Layout;
// const navItems = [
// {
// label: "Home",
// icon: <HomeOutlined />,
// },
// {
// label: `${user ? user.name : ""}`,
// icon: <UserOutlined />,
// children: [
// {
// label: (
// <span
// onClick={() => {
// if (user.role === "admin") {
// navigate("/admin");
// } else if (user.role === "partner") {
// navigate("/partner");
// } else {
// navigate("/profile");
// }
// }}
// >
// My Profile
// </span>
// ),
// icon: <ProfileOutlined />,
// },
// {
// label: (
// <Link
// to="/login"
// onClick={() => {
// localStorage.removeItem("token");
// }}
// >
// Log Out
// </Link>
// ),
// icon: <LogoutOutlined />,
// },
// ],
// },
// ];
// const getValidUser = async () => {
// try {
// dispatch(ShowLoading());
// const response = await GetCurrentUser();
// console.log(response);
// dispatch(SetUser(response.data));
// dispatch(HideLoading());
// // Hide Loader
// } catch (error) {
// dispatch(SetUser(null));
// message.error(error.message);
// }
// };
// // useEffect(() => {
// // if (localStorage.getItem("token")) {
// // getValidUser();
// // } else {
// // navigate("/login");
// // }
// // }, []);
// useEffect(() => {
// if (localStorage.getItem("token")) {
// navigate("/");
// }
// }, []);
// if(!user){
//     return null;
// }
// return (
// (
// <>
// <Layout>
// <Header
// className="d-flex justify-content-between"
// style={{
// position: "sticky",
// top: 0,
// zIndex: 1,
// width: "100%",
// display: "flex",
// alignItems: "center",
// }}
// >
// <h3 className="demo-logo text-white m-0" style={{ color:
// "white" }}>
// Book My Show
// </h3>
// <Menu theme="dark" mode="horizontal" items={navItems} />
// </Header>
// <div style={{ padding: 24, minHeight: 380, background: "#fff"
// }}>
// {children}
// </div>
// </Layout>
// </>
// )
// );
// };
// export default ProtectedRoute;

import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { GetCurrentUser } from "../api/users";
import { SetUser } from "../redux/userSlice";
import { message, Layout, Menu, Spin } from "antd";
import { ShowLoading, HideLoading } from "../redux/loaderSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.loaders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Header } = Layout;

  const getValidUser = useCallback(async () => {
    try {
      dispatch(ShowLoading());
    //   const response = await GetCurrentUser(); // { success, data }
    //   if (response?.success && response?.data) {
    //     dispatch(SetUser(response.data));
    //   } else {
    //     // invalid token or not logged in
    //     localStorage.removeItem("token");
    //     dispatch(SetUser(null));
    //     navigate("/login");
    //   }
    const response = await GetCurrentUser();
    if (response.success) {
    dispatch(SetUser(response.data));
    } else {
    dispatch(SetUser(null));
    message.error(response.message);
    navigate("/login");
    }

    } catch (error) {
      localStorage.removeItem("token");
      dispatch(SetUser(null));
      message.error(error?.response?.data?.message || error.message || "Auth failed");
      navigate("/login");
    } finally {
      dispatch(HideLoading());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, [getValidUser, navigate]);

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    {
      label: user ? user.name : "",
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user?.roles === "admin") navigate("/admin");
                else if (user?.roles === "partner") navigate("/partner");
                else navigate("/profile");
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(SetUser(null));
              }}
            >
              Log Out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  // While user is being fetched, show a centered loader
  if (!user) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin tip="Loading..." />
      </div>
    );
  }

  return (
    <Spin spinning={loading}>
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
            Book My Show
          </h3>
          <Menu theme="dark" mode="horizontal" items={navItems} />
        </Header>

        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </Layout>
    </Spin>
  );
};

export default ProtectedRoute;
