import { Card, Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const BoxedNoSidebar = () => {
  return (
    <Card title="Boxed Layout - No Sidebar" headerLine={true}>
      <Title heading={3}>Boxed Layout without Sidebar</Title>
      <Paragraph>
        This layout demonstrates a boxed container without any sidebars.
      </Paragraph>
      <Paragraph>
        Perfect for focused content that doesn't need additional navigation.
      </Paragraph>
    </Card>
  );
};

export default BoxedNoSidebar;