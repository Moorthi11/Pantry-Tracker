import Head from 'next/head';
import Pantry from '../components/Pantry';
import ImageClassifier from '../components/ImageClassifier';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pantry App</title>
      </Head>
      <main>
        <h1>My Pantry</h1>
        <Pantry />
        <h2>Image Classification</h2>
        <ImageClassifier />
      </main>
    </div>
  );
}

