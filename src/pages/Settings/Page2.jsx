import { Card, Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const Page2 = () => {
  return (
    <Card title="Page 2" headerLine={true}>
      <Title heading={3}>Page 2 Content</Title>
      <Paragraph>
        This is the content for Page 2. You can add any components or forms here.
      </Paragraph>
      <Paragraph>
        This page is part of the nested Page menu structure.
      </Paragraph>
    </Card>
  );
};

export default Page2;