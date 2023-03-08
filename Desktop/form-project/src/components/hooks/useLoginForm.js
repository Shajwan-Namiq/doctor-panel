import React from "react";
import { useState } from "react";

export default function useLoginForm(callback) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //babe away pageka reload betawa formaka submit abe
    if (
      formData.username === "lima@gmail.com" &&
      formData.password === "1234"
    ) {
      setLoggedIn(true);
      setLoginError(false);
      callback();
    } else {
      setLoggedIn(false);
      setLoginError(true);
    }
  };

  return {
    loggedIn,
    setLoggedIn,
    handleSubmit,
    formData,
    setFormData,
    handleInput,
    loginError,
    setLoginError,
  };
}
