import React, { useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { css } from "@emotion/core";
import Button from "components/Button";
import ActionButton from "components/ActionButton";
import Preloader from "components/Preloader";
import { useUser } from "./index.js";
import Link from "next/link";
import * as Yup from "yup";

const SIGN_IN = "signin";
const SIGN_UP = "signup";

function AuthDialog({ onClose, ...otherProps }) {
  const [mode, setMode] = useState(SIGN_IN);
  const { signInWithCreds, signUp } = useUser();

  const isSignIn = mode === SIGN_IN;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordconfirm: "",
    },
    onSubmit: async ({ email, password }, actions) => {
      const action = isSignIn ? signInWithCreds : signUp;
      actions.setSubmitting(true);

      try {
        await action(email, password);
        onClose();
      } catch (error) {
        alert(error);
        console.error(error);
      }
      actions.setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email")
        .required("Enter an email address."),
      password: Yup.string()
        .min(8, "Min length is 8")
        .max(20, "Max length is 20")
        .required("Please enter a password."),
      passwordconfirm: !isSignIn
        ? Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords do not match")
            .required("Please confirm password.")
        : undefined,
    }),
  });

  const handleChangeMode = (nextMode) => {
    formik.resetForm();
    setMode(nextMode);
  };

  return (
    <Modal
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: "rgba(10,10,10,.5)",
        },
        content: {
          top: "50%",
          left: "50%",
          width: "400px",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          padding: "44px 24px 32px",
          backgroundColor: "#faf9f8",
          border: "none",
          borderRadius: 0,
        },
      }}
      {...otherProps}
    >
      <div
        css={{
          position: "absolute",
          right: "20px",
          top: "20px",
        }}
      >
        <ActionButton icon={{ name: "cross", size: 16 }} onClick={onClose} />
      </div>
      <form
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div css={{ textAlign: "center", marginBottom: "1rem" }}>
          <b css={{ fontSize: "1.2rem" }}>Sign in</b>
          <p css={{ fontSize: "0.8rem" }}>
            Become a Member — you'll enjoy exclusive deals, offers, invites and
            rewards.
          </p>
        </div>
        <div css={[fieldCSS, formik.errors.email ? invalidFieldCSS : null]}>
          <label css={labelCSS} htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            css={inputCSS}
          />
          {formik.errors.email && <span>{formik.errors.email}</span>}
        </div>
        <div css={[fieldCSS, formik.errors.password ? invalidFieldCSS : null]}>
          <label css={labelCSS} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            css={inputCSS}
          />
          {formik.errors.password && <span>{formik.errors.password}</span>}
        </div>
        {!isSignIn && (
          <div
            css={[
              fieldCSS,
              formik.errors.passwordconfirm ? invalidFieldCSS : null,
            ]}
          >
            <label css={labelCSS} htmlFor="passwordconfirm">
              Confirm Password
            </label>
            <input
              id="passwordconfirm"
              name="passwordconfirm"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.passwordconfirm}
              css={inputCSS}
            />
            {formik.errors.passwordconfirm && (
              <span>{formik.errors.passwordconfirm}</span>
            )}
          </div>
        )}
        {!isSignIn && (
          <div
            css={css`
              font-size: 0.7rem;
              color: #707070;
              margin: 1rem 0;
            `}
          >
            By clicking ‘Become a member’, I agree to the H&M Membership{" "}
            <Link href="/terms">
              <a
                css={{
                  textDecoration: "underline",
                }}
              >
                Terms and conditions
              </a>
            </Link>
            .
            <br />
            <br />
            To give you the full membership experience, we will process your
            personal data in accordance with the H&M's{" "}
            <Link href="privacy">
              <a
                css={{
                  textDecoration: "underline",
                }}
              >
                Privacy Notice
              </a>
            </Link>
            .
          </div>
        )}
        <div css={{ textAlign: "center" }}>
          <Button
            css={{
              display: "block",
              width: "100%",
              marginTop: "1rem",
            }}
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting && <Preloader />}{" "}
            {isSignIn ? "sign in" : "become a member"}
          </Button>

          {isSignIn && (
            <Button
              css={{
                display: "block",
                width: "100%",
                marginTop: "1rem",
              }}
              secondary
              onClick={() => handleChangeMode(SIGN_UP)}
              disabled={formik.isSubmitting}
            >
              become a member
            </Button>
          )}

          {!isSignIn && (
            <Button
              css={{
                marginTop: "1rem",
              }}
              link
              onClick={() => handleChangeMode(SIGN_IN)}
              disabled={formik.isSubmitting}
            >
              Back to sign in
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}

const inputCSS = css`
  width: 100%;
  padding: 0.8rem 0.6rem;
  border: none;
  background-color: #eaeaea;
  border-radius: 4px;
`;

const labelCSS = css`
  display: block;
  width: 100%;
  font-size: 0.8rem;
  color: #222;
  margin-bottom: 0.4rem;
  font-weight: 700;
`;

const fieldCSS = css`
  display: block;
  margin-bottom: 0.8rem;
`;

const invalidFieldCSS = css`
  span {
    color: #ef2727;
    font-size: 0.8rem;
  }

  input {
    border: 1px solid #ef2727;
    background-color: rgba(239, 39, 39, 0.1);
    margin-bottom: 0.4rem;
  }
`;

export default AuthDialog;
