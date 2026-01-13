import { Card, Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const Page1 = () => {
  return (
    <Card title="Page 1" headerLine={true}>
      <Title heading={3}>Page 1 Content</Title>
      <Paragraph>
        This is the content for Page 1. You can add any components or forms here.
      </Paragraph>
      <Paragraph>
        This page demonstrates nested navigation in the sidebar menu.
      </Paragraph>
    </Card>
  );
};

export default Page1;