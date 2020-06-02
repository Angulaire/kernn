import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Router from "next/router";

export const setToken = token => {
  if (!process.browser) {
    return;
  }
  Cookies.set("username", token.user.username);
  Cookies.set("jwt", token.jwt);
  Cookies.set("id", token.user.id);

  if (Cookies.get("username")) {
    Router.push("/me");
  }
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  Cookies.remove("jwt");
  Cookies.remove("username");
  Cookies.remove("id")

  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};

export const getUserFromServerCookie = req => {
  if (!req.headers.cookie || "") {
    return undefined;
  }

  let username = req.headers.cookie
    .split(";")
    .find(user => user.trim().startsWith("username="));
  if (username) {
    username = username.split("=")[1];
  }

  const jwtCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwtDecode(jwt), username;
};

export const getUserFromLocalCookie = () => {
  return Cookies.get("username");
};