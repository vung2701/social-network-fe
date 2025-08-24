import {  Layout } from 'antd';
import AppHeader from '../Header/Header';
import { Outlet } from 'react-router-dom';
import AppFooter from '../Footer/Footer';

const { Content } = Layout;

export default function AppLayout() {
  return (
      <Layout>
        <AppHeader />
        <Content
          style={{
            minHeight: "calc(100vh - 364px)",
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
  );
}
