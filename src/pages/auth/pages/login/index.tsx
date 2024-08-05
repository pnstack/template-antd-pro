import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Helmet, history, useIntl, useModel } from '@umijs/max';
import { message } from 'antd';
import { createStyles } from 'antd-style';
import Cookies from 'js-cookie';
import React from 'react';
import { flushSync } from 'react-dom';

import { StorageKeys } from '@/common/enums';
import { Footer } from '@/components';

import Settings from '../../../../../config/defaultSettings';
import { useLoginMutation } from '../../services/auth.query';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: "url('/backgroud.png')",
      backgroundSize: '100% 100%',
    },
  };
});
const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const { mutateAsync: doLogin } = useLoginMutation();
  const { styles } = useStyles();
  const intl = useIntl();
  const handleSubmit = async (values: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    console.log(values);

    if (!values.username || !values.password) return;
    try {
      //
      const res = await doLogin({
        username: values.username,
        password: values.password,
      });

      if (res.success) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Đăng nhập thành công',
        });
        // set token
        Cookies.set(StorageKeys.ACCRESS_TOKEN, res.data.access_token);

        if (res.data.user) {
          flushSync(() => {
            setInitialState((s) => ({
              ...s,
              currentUser: res.data.user,
            }));
          });
        }
        message.success(defaultLoginSuccessMessage);
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
      }
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Đăng nhập thất bại',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: 'Đăng nhnập',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          title="PNStack"
          subTitle="Đăng nhập hệ thống"
          initialValues={{
            autoLogin: true,
          }}
          actions={[]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Bạn vui lòng nhập tài khoản!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Bạn vui lòng nhập mật khẩu!"
                    />
                  ),
                },
              ]}
            />
          </>

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage
                id="pages.login.rememberMe"
                defaultMessage="Ghi nhớ tài khoản đăng nhập"
              />
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
