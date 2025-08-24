import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'Về chúng tôi', href: '/about' },
      { label: 'Tuyển dụng', href: '/careers' },
      { label: 'Tin tức', href: '/news' },
      { label: 'Liên hệ', href: '/contact' }
    ],
    support: [
      { label: 'Trung tâm trợ giúp', href: '/help' },
      { label: 'Hướng dẫn sử dụng', href: '/guide' },
      { label: 'Báo cáo vấn đề', href: '/report' },
      { label: 'FAQ', href: '/faq' }
    ],
    legal: [
      { label: 'Điều khoản sử dụng', href: '/terms' },
      { label: 'Chính sách bảo mật', href: '/privacy' },
      { label: 'Chính sách cookie', href: '/cookies' },
      { label: 'Quyền riêng tư', href: '/privacy-rights' }
    ]
  };

  const socialLinks = [
    { icon: <FacebookOutlined />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <TwitterOutlined />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <InstagramOutlined />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <LinkedinOutlined />, href: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <Footer
      style={{
        background: '#001529',
        color: '#fff',
        padding: '48px 24px 24px',
        marginTop: 'auto'
      }}
    >
      <div className='inner'>
        {/* Main Footer Content */}
        <Row gutter={[32, 32]} style={{ marginBottom: '32px' }}>
          {/* Company Info */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
              Social App
            </Title>
            <Paragraph style={{ color: '#8c8c8c', marginBottom: '16px' }}>
              Kết nối mọi người, chia sẻ khoảnh khắc đáng nhớ trong cuộc sống của bạn.
            </Paragraph>
            <Space size="large">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#8c8c8c', fontSize: '20px' }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </Space>
          </Col>

          {/* Company Links */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>
              Công ty
            </Title>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {footerLinks.company.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  style={{ 
                    color: '#8c8c8c', 
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8c8c8c'}
                >
                  {link.label}
                </Link>
              ))}
            </Space>
          </Col>

          {/* Support Links */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>
              Hỗ trợ
            </Title>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {footerLinks.support.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  style={{ 
                    color: '#8c8c8c', 
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8c8c8c'}
                >
                  {link.label}
                </Link>
              ))}
            </Space>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>
              Liên hệ
            </Title>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Space size="small">
                <MailOutlined style={{ color: '#8c8c8c' }} />
                <Text style={{ color: '#8c8c8c' }}>contact@socialapp.com</Text>
              </Space>
              <Space size="small">
                <PhoneOutlined style={{ color: '#8c8c8c' }} />
                <Text style={{ color: '#8c8c8c' }}>+84 123 456 789</Text>
              </Space>
              <Space size="small">
                <EnvironmentOutlined style={{ color: '#8c8c8c' }} />
                <Text style={{ color: '#8c8c8c' }}>Hà Nội, Việt Nam</Text>
              </Space>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#303030', margin: '24px 0' }} />

        {/* Bottom Footer */}
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <Text style={{ color: '#8c8c8c' }}>
              © {currentYear} Social App. Tất cả quyền được bảo lưu.
            </Text>
          </Col>
          <Col xs={24} sm={12}>
            <Space size="large" style={{ justifyContent: 'flex-end', width: '100%' }}>
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  style={{ 
                    color: '#8c8c8c', 
                    textDecoration: 'none',
                    fontSize: '12px',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8c8c8c'}
                >
                  {link.label}
                </Link>
              ))}
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  );
}
