import { Card, Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const More = () => {
  return (
    <Card title="More Features" headerLine={true}>
      <Title heading={3}>More Features</Title>
      <Paragraph>
        Discover additional features and enhancements for your application.
      </Paragraph>
      <Paragraph>
        This section will contain various additional features and plugins.
      </Paragraph>
    </Card>
  );
};

export default More;