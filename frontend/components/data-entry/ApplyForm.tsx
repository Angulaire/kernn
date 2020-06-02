import { Row, Col,Form, Input, Select, Button, Checkbox, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const ApplyForm = () => {

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="apply"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row justify="center" align="middle">
        <Col xs={24} md={{ span: 11 }}>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Veuillez entrer votre prénom',
              },
            ]}
          >
            <Input 
              placeholder="Prénom"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={{ span: 11, offset: 2 }}>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Veuillez entrer votre nom',
              },
            ]}
          >
            <Input 
              placeholder="Nom"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={24} md={{ span: 11 }}>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: "Votre email est incorrect",
              },
              {
                required: true,
                message: 'Veuillez entrer votre email',
              },
            ]}
          >
            <Input 
              placeholder="Email"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={{ span: 11, offset: 2 }}>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: 'Veuillez entrer votre numéro de téléphone',
              },
            ]}
          >
            <Input 
              placeholder="Téléphone"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item 
        name="motivation"
      >
        <TextArea 
          rows={4} 
          placeholder="Expliquez votre motivation en quelques lignes"
        />
      </Form.Item>
      <Form.Item 
        name="resume"
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Importez votre CV</p>
        </Dragger>
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>J'accepte d'être contacté par Kernn</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Postuler
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ApplyForm