import React, {useState} from 'react';
import './LoginForm.scss';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Col } from 'antd';
// import history from '../../../history';

import axios from 'axios';
import Loader from '../../Loader';

const BASE_URL = 'http://localhost:7000';
const usersURL = '/users';


let LoginForm = ({form, history}) => {
  let [user, setUser] = useState();

	let  handleSubmit = async (e) => {
    e.preventDefault();
   await form.validateFields( async (err, values) => {
      if (!err) {
        await axios.post(`${BASE_URL}${usersURL}/login`, { email: values.email, password: values.password} ) // req.params.id
          .then((response) => {
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            history.push('/');
            // TODO: Redux Store here
          })
          .catch(err => {
            console.log(err)
          })
      }
    });
  };

	const { getFieldDecorator } = form;
	return (
		<Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Mot de passe oublié
          </a>
          <Col style={{ textAlign: 'center'}}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              S'Authentifier
            </Button>
          </Col>
        </Form.Item>
        <Form.Item >
          <Col style={{ textAlign: 'center'}}>
            <Button type="link" onClick={() => {history.push('/auth/register');}}> Créer un compte</Button>
          </Col>
        </Form.Item>
      </Form>
		);
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
export default WrappedLoginForm;