import React from "react";
import styled, { css } from "styled-components";

import axios from "axios";
import { Container, Grid, TextField } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  background: white;
  border-radius: 2px;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: #868e96};
    text-decoration: underline;
    &:hover {
      color: #212529};
    }
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: "#343a40";
  &:hover {
    background: "#868e96";
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: #22b8cf};
      &:hover {
        background: #3bc9db};
      }
    `}
`;

const LoginForm = ({ setCookie }) => {
  const [loginParam, setLoginParam] = React.useState({
    userId: "",
    password: "",
  });

  const onChange = (e) => {
    setLoginParam({
      ...loginParam,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/login",
        JSON.stringify(loginParam),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      )
      .then((res) => {
        setCookie("Authorization", res.data.jwt, { path: "/" });
      })
      .catch((e) => alert("로그인 실패"));
  };

  return (
    <Container>
      <Grid
        container
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <WhiteBox>
            <h3>로그인</h3>
            <form
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <TextField
                name="userId"
                placeholder="이메일"
                value={loginParam.userId}
                onChange={(e) => {
                  onChange(e);
                }}
                style={{ width: "100%" }}
              />
              <TextField
                autoComplete="new-password"
                name="password"
                placeholder="비밀번호"
                type="password"
                value={loginParam.password}
                onChange={(e) => {
                  onChange(e);
                }}
                style={{ width: "100%", marginTop: "1rem" }}
              />

              <Button cyan fullWidth style={{ marginTop: "3rem" }}>
                로그인
              </Button>
            </form>
            <Footer>
              <NavLink to="/auth/join">회원가입</NavLink>
            </Footer>
          </WhiteBox>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
