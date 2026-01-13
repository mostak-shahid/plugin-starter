import { Card, Typography, Button, Space } from '@douyinfe/semi-ui';
import { IconUpload, IconDownload } from '@douyinfe/semi-icons';

const { Title, Paragraph } = Typography;

const ImportExport = () => {
  const handleExport = () => {
    console.log('Exporting settings...');
  };

  const handleImport = () => {
    console.log('Importing settings...');
  };

  return (
    <Card title="Import & Export" headerLine={true}>
      <Title heading={3}>Import & Export Settings</Title>
      <Paragraph>
        Export your current settings to a file or import settings from a previously saved file.
      </Paragraph>
      
      <Space style={{ marginTop: '24px' }}>
        <Button 
          type="primary" 
          icon={<IconDownload />}
          onClick={handleExport}
        >
          Export Settings
        </Button>
        <Button 
          type="secondary" 
          icon={<IconUpload />}
          onClick={handleImport}
        >
          Import Settings
        </Button>
      </Space>
    </Card>
  );
};

export default ImportExport;