import React from "react";
import styled, { css } from "styled-components";

import { Container, Grid, TextField } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import axios from "axios";

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

const RegisterForm = (props) => {
  const [joinParam, setjoinParam] = React.useState({
    userId: "",
    password: "",
    passwordCheck: "",
    family_count: "",
    fb_token: null,
  });

  const onChange = (e) => {
    setjoinParam({
      ...joinParam,
      [e.target.name]: e.target.value,
    });
  };

  console.log(props.history);

  const onSubmit = (e) => {
    e.preventDefault();
    const nextjoinParam = { ...joinParam };
    delete nextjoinParam.passwordCheck;
    setjoinParam(nextjoinParam);

    console.log(joinParam);
    axios
      .post(
        "http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/join",
        JSON.stringify(joinParam),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      )
      .then((res) => {
        alert(res.data + "님 환영합니다.");
      });
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
                value={joinParam.userId}
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
                value={joinParam.password}
                onChange={(e) => {
                  onChange(e);
                }}
                style={{ width: "100%", marginTop: "1rem" }}
              />
              <TextField
                autoComplete="new-password"
                name="passwordCheck"
                placeholder="비밀번호 확인"
                type="password"
                value={joinParam.passwordCheck}
                onChange={(e) => {
                  onChange(e);
                }}
                style={{ width: "100%", marginTop: "1rem" }}
              />
              <TextField
                name="family_count"
                placeholder="가구 인원수"
                value={joinParam.family_count}
                onChange={(e) => {
                  onChange(e);
                }}
                style={{ width: "100%", marginTop: "1rem" }}
              />

              <Button cyan fullWidth style={{ marginTop: "1rem" }}>
                회원가입
              </Button>
            </form>
            <Footer>
              <NavLink to="/auth/login">로그인</NavLink>
            </Footer>
          </WhiteBox>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterForm;
