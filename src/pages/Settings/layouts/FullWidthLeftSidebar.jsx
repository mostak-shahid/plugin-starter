import { Card, Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const FullWidthLeftSidebar = () => {
  return (
    <Card title="Full Width Layout - Left Sidebar" headerLine={true}>
      <Title heading={3}>Full Width Layout with Left Sidebar</Title>
      <Paragraph>
        This layout spans full width with a left sidebar for primary navigation.
      </Paragraph>
      <Paragraph>
        Combines spacious content area with accessible navigation.
      </Paragraph>
    </Card>
  );
};

export default FullWidthLeftSidebar;