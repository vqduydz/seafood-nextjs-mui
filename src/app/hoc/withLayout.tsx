import React from 'react';
import DefaultLayout from '../ShareLayout/DefaultLayout';

const withLayout = (WrappedComponent: React.FC, Layout = DefaultLayout) => {
  const WithLayout: React.FC = (props: any) => (
    <Layout>
      <WrappedComponent {...props} />
    </Layout>
  );

  return WithLayout;
};

export default withLayout;
