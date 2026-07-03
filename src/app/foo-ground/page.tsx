import Count from '@/views/foo-ground/Count';
import OnOff from '@/views/foo-ground/OnOff';
import Layout from '@/views/share/Layout';

export default function FooGround() {
  return (
    <Layout title='Foo Ground' direction='col'>
      <OnOff />
      <Count />
    </Layout>
  );
}
