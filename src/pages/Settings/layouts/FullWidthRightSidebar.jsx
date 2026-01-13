import { Card, Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const FullWidthRightSidebar = () => {
  return (
    <Card title="Full Width Layout - Right Sidebar" headerLine={true}>
      <Title heading={3}>Full Width Layout with Right Sidebar</Title>
      <Paragraph>
        This layout spans full width with a right sidebar for secondary content.
      </Paragraph>
      <Paragraph>
        Provides maximum content space while keeping related information accessible.
      </Paragraph>
    </Card>
  );
};

export default FullWidthRightSidebar;