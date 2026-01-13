import { Card, Form, Button, Typography } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Feedback = () => {
  const handleSubmit = (values) => {
    console.log('Feedback submitted:', values);
  };

  return (
    <Card title="Feedback" headerLine={true}>
      <Title heading={3}>Send Us Your Feedback</Title>
      <Paragraph>
        We're constantly enhancing our product, and your feedback is key to staying ahead of the curve 
        and delivering a stronger, more reliable solution for you.
      </Paragraph>
      
      <Form 
        onSubmit={handleSubmit} 
        style={{ maxWidth: '600px', marginTop: '24px' }}
        labelPosition="top"
      >
        <Form.Input 
          field="subject" 
          label="Subject" 
          placeholder="Enter feedback subject" 
          rules={[{ required: true, message: 'Subject is required' }]}
        />
        
        <Form.Select 
          field="category" 
          label="Category"
          placeholder="Select category"
          rules={[{ required: true, message: 'Category is required' }]}
        >
          <Form.Select.Option value="bug">Bug Report</Form.Select.Option>
          <Form.Select.Option value="feature">Feature Request</Form.Select.Option>
          <Form.Select.Option value="improvement">Improvement</Form.Select.Option>
          <Form.Select.Option value="other">Other</Form.Select.Option>
        </Form.Select>
        
        <Form.TextArea 
          field="message" 
          label="Message" 
          placeholder="Enter your feedback" 
          rows={6}
          rules={[{ required: true, message: 'Message is required' }]}
        />
        
        <Button type="primary" htmlType="submit" size="large" style={{ marginTop: '8px' }}>
          Submit Feedback
        </Button>
      </Form>
    </Card>
  );
};

export default Feedback;