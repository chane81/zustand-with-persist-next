import Card from '@/views/context-ground/Card';
import Layout from '@/views/share/Layout';

const contextGround = () => {
  return (
    <Layout title='Context Ground' direction='row'>
      <Card title='Provider 1' initState={{ isOn: true, count: 11 }} />
      <Card title='Provider 2' initState={{ isOn: false }} />
    </Layout>
  );
};

export default contextGround;
