import { Card, Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const BoxedLeftSidebar = () => {
  return (
    <Card title="Boxed Layout - Left Sidebar" headerLine={true}>
      <Title heading={3}>Boxed Layout with Left Sidebar</Title>
      <Paragraph>
        This layout demonstrates a boxed container with a left sidebar for navigation.
      </Paragraph>
      <Paragraph>
        Ideal for content that needs contextual navigation on the left side.
      </Paragraph>
    </Card>
  );
};

export default BoxedLeftSidebar;