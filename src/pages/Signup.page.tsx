import { Button, DatePicker, DatePickerProps, Form, Input } from "antd";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import apiService from "../service/apiService";
import { UserContext } from "../context/user.context";

interface SignupFormValues {
  name: string;
  surname: string;

  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
}

const Signup: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const {} = useContext(UserContext);

  const validatePassword = (_: any, value: string) => {
    if (value && value.length < 8) {
      return Promise.reject(
        new Error(t("password_must_be_at_least_8_characters"))
      );
    }
    if (!/\d/.test(value)) {
      return Promise.reject(
        new Error(t("password_must_contain_at_least_one_number"))
      );
    }
    if (!/[a-zA-Z]/.test(value)) {
      return Promise.reject(
        new Error(t("password_must_contain_at_least_one_letter"))
      );
    }
    return Promise.resolve();
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    
  };
  

  const onFinish = async (values: SignupFormValues) => {
    try {
      const user = await apiService.signUp(values);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/login");
  };

  return (
    <Form
      layout="vertical"
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        margin: "auto",
      }}
      onFinish={onFinish}
    >
      <h1>{t("signup")}</h1>

      <Form.Item
        label={t("name")}
        name="name"
        style={{ marginBottom: "1rem" }}
        rules={[
          {
            required: true,
            message: t("please_enter_your_name"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("surname")}
        name="surname"
        style={{ marginBottom: "1rem" }}
        rules={[
          {
            required: true,
            message: t("please_enter_your_surname"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("email")}
        name="email"
        style={{ marginBottom: "1rem" }}
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
        style={{ marginBottom: "1rem" }}
        rules={[
          {
            required: true,
            message: t("please_enter_your_password"),
          },
          {
            validator: validatePassword,
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label={t("confirm_password")}
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: t("please_confirm_your_password"),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(t("password_do_not_match"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Doğum Tarihi"
        name="birthday"
        rules={[
          {
            required: true,
            message: t("please_enter_your_birthday"),
          },
        ]}
      >
        <DatePicker onChange={onChange} />
      </Form.Item>

      <Form.Item style={{ marginBottom: "1rem" }}>
        <Button type="primary" htmlType="submit">
          {t("signup")}
        </Button>
      </Form.Item>

      <p>
        {t("have_an_account_already")} <Link to="/login">{t("login")}</Link>
      </p>
    </Form>
  );
};

export default Signup;
