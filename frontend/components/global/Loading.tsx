import React from 'react';
import { Row, Button } from 'antd';

const Loading = () => {
   
  return (
    <Row justify="center" align="middle" style={{height: "100vh"}}>
      <Button type="primary" size="large" loading>
        Chargement
      </Button>
    </Row>
  )
};

export default Loading;