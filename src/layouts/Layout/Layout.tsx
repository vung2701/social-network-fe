import {  Layout } from 'antd';
import AppHeader from '../Header/Header';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export default function AppLayout() {
  return (
    <Layout >
      {/* <Sider width="25%" style={siderStyle}>
        Sider
      </Sider> */}
      <Layout>
        <AppHeader />
        <Content> <Outlet /></Content>
        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </Layout>
    </Layout>
  );
}
