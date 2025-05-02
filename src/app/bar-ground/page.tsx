import Count from '@/views/bar-ground/Count';
import LinkFooGround from '@/views/bar-ground/LinkFooCount';
import Layout from '@/views/share/Layout';

const BarGround = () => {
  return (
    <Layout title='Bar Ground'>
      <Count />
      <LinkFooGround />
    </Layout>
  );
};

export default BarGround;
