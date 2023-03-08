import React, { useState } from "react";
import useLoginForm from "./hooks/useLoginForm";
const Login = () => {
  const submitForm = () => {
    alert(
      "Form submitted successfully!" +
        "\n" +
        formData.username +
        "\n" +
        formData.password
    );
  };

  const { loggedIn, handleSubmit, formData, handleInput, loginError } =
    useLoginForm(submitForm);

  return (
    <section>
 

      {loggedIn ? (
        <h1 className="text-center text-6xl max-h-screen">You're logged in!</h1>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="p-5 flex flex-col space-y-5 justify-center items-center"
          >
            <h1>Login Form</h1>
            <div>
              <input
                placeholder="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInput}
                className="border-2 p-3"
              />
            </div>
            <div>
              <input
                placeholder="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInput}
                className="border-2 p-3"
              />
            </div>
            <button
              className="bg-red-500 p-2 w-52"
              type="submit"
              disabled={loggedIn}
            >
              {loggedIn ? "Logging in..." : "Login"}
            </button>
          </form>
          {loginError && (
            <p className="text-center" style={{ color: "red" }}>
              Invalid username or password.
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default Login;
