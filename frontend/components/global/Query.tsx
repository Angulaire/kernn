import React from 'react';
import { Row, Button } from 'antd';
import { useQuery } from "@apollo/react-hooks";
import Loading from './Loading'

const Query = ({ children, query, id=null, slug=null }) => {
   
  const { data, loading, error } = useQuery(query, {
    variables: { id: parseInt(id), slug: slug }
  });

  if (loading) return (
    <Loading />
  )
  if (error) return `Error! ${error.message}`;
  return children({ data });
};

export default Query;