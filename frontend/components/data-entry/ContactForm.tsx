import { Row, Col,Form, Input, Select,Button, Checkbox } from 'antd';

const { Option } = Select;

const ContactForm = () => {
  const onFinish = values => {
    console.log('Success:', values);
    fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
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
      <Row justify="center" align="middle">
        <Col xs={24} md={{ span: 11 }}>
          <Form.Item
            name="compagnyName"
            rules={[
              {
                required: true,
                message: 'Veuillez entrer le nom de votre entreprise',
              },
            ]}
          >
            <Input 
              placeholder="Nom de l'entreprise"
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
      <Row justify="center" align="middle">
        <Col xs={24} md={{ span: 11 }}>
          <Form.Item
            name="compagnySize"
          >
            <Select placeholder="Nombre d'employés">
              <Option value="50">moins de 50</Option>
              <Option value="50-500">entre 50-500</Option>
              <Option value="500-1000">entre 500-1000</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={{ span: 11, offset: 2 }}>
          <Form.Item
            name="website"
            rules={[
              {
                required: true,
                message: 'Veuillez entrer le site de votre entreprise',
              },
            ]}
          >
            <Input 
              placeholder="Site web"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>J'accepte d'être contacté par Kernn</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Envoyer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm