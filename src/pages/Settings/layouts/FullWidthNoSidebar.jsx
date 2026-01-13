import { Card, Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const FullWidthNoSidebar = () => {
  return (
    <Card title="Full Width Layout - No Sidebar" headerLine={true}>
      <Title heading={3}>Full Width Layout without Sidebar</Title>
      <Paragraph>
        This layout spans the entire width of the container without any sidebars.
      </Paragraph>
      <Paragraph>
        Perfect for dashboards, reports, or content that needs maximum space.
      </Paragraph>
    </Card>
  );
};

export default FullWidthNoSidebar;