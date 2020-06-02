import React from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';

const AvatarGroup = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`

const AvatarDetails = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: left;
  -webkit-box-align: left;
  -ms-flex-align: left;
  align-items: left;
  justify-content: flex-start;
  flex-direction: column;

  margin-left: 12px;

  p {
    margin-bottom: 0;
    font-size: 14px;
  }
`

type ArticleAuthorProps = { 
  article: any;
}

const ArticleAuthor = ({ article }: ArticleAuthorProps) => { 
  
  const readingTime = require('reading-time');

  return (
    <AvatarGroup>
      <Avatar src={article.user.avatar.media.url} alt={article.user.avatar.alt} size="large"/>
      <AvatarDetails>
        <p>{article.user.username}</p>
        <p>{`${new Date(article.published_at).toLocaleDateString("fr-FR")} - ${Math.ceil(readingTime(article.content).minutes)} min`}</p>
      </AvatarDetails>
    </AvatarGroup>
  );
};

export default ArticleAuthor;