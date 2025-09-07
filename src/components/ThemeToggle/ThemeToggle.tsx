import React from 'react';
import { Button, Space, Typography } from 'antd';
import { SunOutlined, MoonOutlined, DesktopOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts';

const { Text } = Typography;

/**
 * Component để toggle theme (light/dark/system)
 * Hiển thị button để chuyển đổi giữa các theme modes
 */
const ThemeToggle: React.FC = () => {
  const { state, setTheme, toggleTheme, setSystemTheme } = useTheme();

  /**
   * Handler để chuyển sang light theme
   */
  const handleLightTheme = () => {
    setTheme('light');
  };

  /**
   * Handler để chuyển sang dark theme
   */
  const handleDarkTheme = () => {
    setTheme('dark');
  };

  /**
   * Handler để sử dụng system theme
   */
  const handleSystemTheme = () => {
    setSystemTheme(true);
  };

  return (
    <Space direction="vertical" size="small">
      <Text strong>Theme Settings</Text>
      <Space wrap>
        <Button
          type={state.theme === 'light' && !state.isSystemTheme ? 'primary' : 'default'}
          icon={<SunOutlined />}
          onClick={handleLightTheme}
          size="small"
        >
          Light
        </Button>
        <Button
          type={state.theme === 'dark' && !state.isSystemTheme ? 'primary' : 'default'}
          icon={<MoonOutlined />}
          onClick={handleDarkTheme}
          size="small"
        >
          Dark
        </Button>
        <Button
          type={state.isSystemTheme ? 'primary' : 'default'}
          icon={<DesktopOutlined />}
          onClick={handleSystemTheme}
          size="small"
        >
          System
        </Button>
        <Button
          icon={state.theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          size="small"
        >
          Toggle
        </Button>
      </Space>
      <Text type="secondary" style={{ fontSize: '12px' }}>
        Current: {state.isSystemTheme ? 'System' : state.theme} mode
      </Text>
    </Space>
  );
};

export default ThemeToggle;
