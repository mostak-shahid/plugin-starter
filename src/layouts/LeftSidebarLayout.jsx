import { Layout } from '@douyinfe/semi-ui';

const { Header, Sider, Content } = Layout;

const LeftSidebarLayout = ({ children, sidebar }) => {
  return (
      <Layout>
        <Sider style={{ backgroundColor: 'var(--semi-color-bg-2)' }}>
          {sidebar}
        </Sider>
        <Content style={{ padding: '24px' }}>
          {children}
        </Content>
      </Layout>
  );
};

export default LeftSidebarLayout;