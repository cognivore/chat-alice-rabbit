import React from 'react';

interface StaticPageProps {
  content: string;
}

const StaticPage: React.FC<StaticPageProps> = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);

export default StaticPage;
