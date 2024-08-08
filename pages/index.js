import Head from 'next/head';
import Pantry from '../components/Pantry';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Pantry App</title>
        <meta name="description" content="A simple pantry management app using Next.js, Firebase, and Material UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h2" component="h1" gutterBottom>
          My Pantry
        </Typography>
        <Pantry />
      </main>
    </Container>
  );
}
