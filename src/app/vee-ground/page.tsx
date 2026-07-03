import Count from '@/views/vee-ground/Count';
import OnOff from '@/views/vee-ground/OnOff';
import Layout from '@/views/share/Layout';

const VeeCount = () => {
  return (
    <Layout title='Vee Ground' direction='col'>
      <OnOff />
      <Count />
    </Layout>
  );
};

export default VeeCount;
