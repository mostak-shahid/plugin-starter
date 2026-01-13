import { Layout } from '@douyinfe/semi-ui';

const { Header, Sider, Content } = Layout;

const RightSidebarLayout = ({ children, sidebar }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <h3>Semi Design App</h3>
      </Header>
      <Layout>
        <Content style={{ padding: '24px' }}>
          {children}
        </Content>
        <Sider style={{ backgroundColor: 'var(--semi-color-bg-2)' }}>
          {sidebar}
        </Sider>
      </Layout>
    </Layout>
  );
};

export default RightSidebarLayout;