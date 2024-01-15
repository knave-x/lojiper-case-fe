import { Button, Checkbox, Form, Input, message, Space } from "antd";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, UserContext } from "../context/user.context";
import { useTranslation } from "react-i18next";
import apiService from "../service/apiService"
import React from "react";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const redirectTo = location.search.replace("?redirectTo=", "");

  const redirectNow = () => {
    navigate(redirectTo ? redirectTo : "/");
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const user:User = await apiService.signIn(values);
      console.log("user", user);
      if (user.accessToken) {
        localStorage.setItem("token", user.accessToken);
        redirectNow();
      }
    } catch (error:any) {
      if (error.response && error.response.status === 403) {
        message.error(t("user_not_approved_yet"));
      } else {
        message.error(t("username_or_password_is_wrong"));
      }
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      <h1>{t("login")}</h1>
      <Form.Item
        label={t("email")}
        name="email"
        rules={[
          {
            type: "email",
            message: t("the_input_is_not_a_valid_email_address"),
          },
          {
            required: true,
            message: t("please_enter_your_email"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("password")}
        name="password"
        rules={[
          {
            required: true,
            message: t("please_enter_your_password"),
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={onSubmit}>
          {t("login")}
        </Button>
      </Form.Item>

      <p>
        {t("dont_have_an_account")} <Link to="/signup">{t("signup")}</Link>
      </p>

      <p>
        <Link to="/changepassword"> {"Şifremi unuttum"}</Link>
      </p>
    </Form>
  );
};

export default Login;
