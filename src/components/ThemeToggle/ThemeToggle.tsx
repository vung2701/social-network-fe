import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { SunOutlined, MoonOutlined, DesktopOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setTheme, toggleTheme, setSystemTheme, selectThemeState } from '../../store/slices/themeSlice';

/**
 * Component để toggle theme (light/dark/system)
 * Hiển thị button dropdown với các tùy chọn theme
 */
const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectThemeState);

  /**
   * Handler để chuyển sang light theme
   */
  const handleLightTheme = () => {
    dispatch(setTheme('light'));
  };

  /**
   * Handler để chuyển sang dark theme
   */
  const handleDarkTheme = () => {
    dispatch(setTheme('dark'));
  };

  /**
   * Handler để sử dụng system theme
   */
  const handleSystemTheme = () => {
    dispatch(setSystemTheme(true));
  };

  // Menu items cho dropdown
  const themeMenuItems: MenuProps['items'] = [
    {
      key: 'light',
      icon: <SunOutlined />,
      label: 'Light Mode',
      onClick: handleLightTheme,
    },
    {
      key: 'dark',
      icon: <MoonOutlined />,
      label: 'Dark Mode',
      onClick: handleDarkTheme,
    },
    {
      key: 'system',
      icon: <DesktopOutlined />,
      label: 'System Theme',
      onClick: handleSystemTheme,
    },
    {
      type: 'divider',
    },
    {
      key: 'toggle',
      icon: state.theme === 'dark' ? <SunOutlined /> : <MoonOutlined />,
      label: 'Toggle Theme',
      onClick: () => dispatch(toggleTheme()),
    },
  ];

  return (
    <Dropdown 
      menu={{ items: themeMenuItems }} 
      placement="bottomRight"
      trigger={['click']}
    >
      <Button
        type="text"
        icon={<SettingOutlined />}
        size="middle"
        style={{
          color: 'inherit',
          border: 'none',
          boxShadow: 'none',
        }}
        title="Theme Settings"
      />
    </Dropdown>
  );
};

export default ThemeToggle;
