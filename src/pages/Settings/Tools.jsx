import { Card, Typography, List } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const Tools = () => {
  const tools = [
    'Database Optimizer',
    'Cache Manager',
    'Debug Mode',
    'Performance Monitor',
    'Error Logger',
  ];

  return (
    <Card title="Tools" headerLine={true}>
      <Title heading={3}>System Tools</Title>
      <Paragraph>
        Access various system tools and utilities to manage your application.
      </Paragraph>
      
      <List
        dataSource={tools}
        renderItem={item => <List.Item>{item}</List.Item>}
        style={{ marginTop: '24px' }}
      />
    </Card>
  );
};

export default Tools;