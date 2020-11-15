import React, { useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import Button from "components/Button";
import { useUser } from "./index.js";

function AuthDialog({ onClose, ...otherProps }) {
  const [mode, setMode] = useState("signin"); // signin | signup
  const { signInWithCreds } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await signInWithCreds(values.email, values.password);
        onClose();
      } catch (error) {
        alert(error);
        console.error(error);
      }
    },
  });

  return (
    <Modal
      style={{
        content: {
          top: "50%",
          left: "50%",
          width: "400px",
          height: "240px",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
        },
      }}
      {...otherProps}
    >
      <form
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
        }}
        onSubmit={formik.handleSubmit}
      >
        <div
          css={{
            display: "block",
            marginBottom: "0.8rem",
          }}
        >
          <label
            css={{
              display: "block",
              width: "100%",
              fontSize: "0.8rem",
              textTransform: "uppercase",
              color: "#999",
              marginBottom: "0.2rem",
            }}
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            css={{
              width: "100%",
              padding: "0.8rem 0.6rem",
              border: "none",
              backgroundColor: "#eaeaea",
              outline: "none",
              "&:focus": {},
            }}
          />
        </div>
        <div
          css={{
            display: "block",
            marginBottom: "0.8rem",
          }}
        >
          <label
            css={{
              display: "block",
              width: "100%",
              fontSize: "0.8rem",
              textTransform: "uppercase",
              color: "#999",
              marginBottom: "0.2rem",
            }}
            htmlFor="email"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            css={{
              width: "100%",
              padding: "0.8rem 0.6rem",
              border: "none",
              backgroundColor: "#eaeaea",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "auto",
          }}
        >
          <Button
            css={{
              display: "inline-block",
              width: "120px",
            }}
            type="submit"
          >
            sign in
          </Button>
          <Button
            css={{
              display: "inline-block",
              width: "120px",
              marginLeft: "0.5rem",
            }}
            onClick={onClose}
          >
            close
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AuthDialog;
