import { Layout, Menu, Dropdown, Avatar, Space } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, MessageOutlined, UserOutlined, LogoutOutlined, AppstoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth } from '../../hooks';

const { Header } = Layout;

export default function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // menu chính
  const mainMenu: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Feed</Link>
    },
    {
      key: '/chat',
      icon: <MessageOutlined />,
      label: <Link to="/chat">Chat</Link>
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>
    }
  ];

  // dropdown user menu
  const userMenu: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">My Profile</Link>
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <span onClick={() => {
        logout(); // Clear authentication state
        navigate('/login'); // Redirect to login page
      }}>Logout</span>
    }
  ];

  return (
    <Header
      style={{
        background: '#fff',
        boxShadow: '0 2px 8px #f0f1f2'
      }}
    >
      <div
        className="inner"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#1890ff' }}>Social App</div>

        {/* Menu */}
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={mainMenu}
          style={{ flex: 1, marginLeft: '24px' }}
        />

        <Dropdown menu={{ items: userMenu }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
}
