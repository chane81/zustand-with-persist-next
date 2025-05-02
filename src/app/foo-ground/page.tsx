import Count from '@/views/foo-ground/Count';
import OnOff from '@/views/foo-ground/OnOff';
import LinkBarCount from '@/views/foo-ground/LinkBarGround';
import Layout from '@/views/share/Layout';

export default function FooGround() {
  return (
    <Layout title='Foo Ground'>
      <OnOff />
      <Count />
      <LinkBarCount />
    </Layout>
  );
}
