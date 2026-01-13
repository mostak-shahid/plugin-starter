import { Card, Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const BoxedRightSidebar = () => {
  return (
    <Card title="Boxed Layout - Right Sidebar" headerLine={true}>
      <Title heading={3}>Boxed Layout with Right Sidebar</Title>
      <Paragraph>
        This layout demonstrates a boxed container with a right sidebar for additional information.
      </Paragraph>
      <Paragraph>
        Great for content with supplementary information or related links.
      </Paragraph>
    </Card>
  );
};

export default BoxedRightSidebar;