import Head from 'next/head';
import Pantry from '../components/Pantry';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pantry App</title>
      </Head>
      <main>
        <h1>My Pantry</h1>
        <Pantry />
      </main>
    </div>
  );
}
