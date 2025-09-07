import { useState } from 'react';
import { 
  Form, 
  Button, 
  Card, 
  Typography, 
  Divider, 
  Space, 
  message,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  GoogleOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AppInput from '../../components/Input/AppInput';
import AppButton from '../../components/Button/AppButton';
import { useAuth } from '../../hooks';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login, state: authState } = useAuth();

  const onFinish = async (values: any) => {
    setLoading(true);
    
    try {
      await login(values.email, values.password);
      message.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    message.info('Tính năng đăng nhập Google sẽ được phát triển sau');
  };

  const handleFacebookLogin = () => {
    message.info('Tính năng đăng nhập Facebook sẽ được phát triển sau');
  };

  const handleForgotPassword = () => {
    message.info('Tính năng quên mật khẩu sẽ được phát triển sau');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <Row justify="center" style={{ width: '100%', maxWidth: '1200px' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Card
            style={{
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.95)'
            }}
          >
            <Title level={1} style={{ textAlign: 'center' }}>
              Đăng nhập
            </Title>

            <Form
              form={form}
              name="login"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              size="large"
              validateTrigger={['onSubmit']}
            >
              <AppInput
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Nhập email của bạn"
                autoFocus
              />

              <AppInput
                name="password"
                label="Mật khẩu"
                type="password"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                ]}
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Nhập mật khẩu của bạn"
                iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />

              <Form.Item>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Button type="link" onClick={handleForgotPassword} style={{ padding: 0 }}>
                      Quên mật khẩu?
                    </Button>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                <AppButton
                  type="primary"
                  htmlType="submit"
                  loading={loading || authState.isLoading}
                  children={'Đăng nhập'}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Form>

            <Divider>hoặc</Divider>

            <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }} size="large">
              <AppButton
                icon={<GoogleOutlined />}
                size="large"
                onClick={handleGoogleLogin}
                iconBtn={true}
                style={{
                  border: '1px solid #d9d9d9'
                }}
              />

              <AppButton
                icon={<FacebookOutlined />}
                size="large"
                onClick={handleFacebookLogin}
                iconBtn={true}
                style={{
                  background: '#1877f2',
                  borderColor: '#1877f2',
                  color: '#fff'
                }}
              />
            </Space>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Text style={{ color: '#666' }}>Chưa có tài khoản? </Text>
              <Link to="/register" style={{ fontWeight: '600' }}>
                Đăng ký ngay
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}