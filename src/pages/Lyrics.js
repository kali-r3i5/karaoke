import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import Musixmatch from 'musixmatch';
import BottomBar from '../components/bottom-bar/BottomBar';

function Lyrics() {
  const { songName, artistName } = useParams();
  const [data, setData] = useState();
  const [err, setErr] = useState();

  let credentials = {
    apiKey: process.env.REACT_APP_API_KEY,
  };

  useEffect(() => {
    const msx = Musixmatch({
      apikey: credentials.apiKey,
      corsURL: 'https://cors-anywhere.herokuapp.com/',
    });

    msx
      .matcherLyrics({ q_track: songName, q_artist: artistName })

      .then(data => {
        setData(data.lyrics.lyrics_body);
      })
      .catch(err => {
        setErr(true);
      });
  }, [songName, artistName, credentials.apiKey]);

  return (
    <Container maxW={'3xl'}>
      <Flex justifyContent={'center'} alignItems={'center'} h={'30vh'}>
        <Flex
          flexDir={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          w="full"
        >
          <Box fontSize={32}>{artistName}</Box>
          <Box fontSize={32}>{songName}</Box>
        </Flex>
      </Flex>
      <Box bgColor="black">
        {!data && err ? (
          <Text color="white">
            Suas Fichas se esgotaram , aguarde 1 hora para ganhar mais fichas .
          </Text>
        ) : (
          <Text color="white">{data}</Text>
        )}
      </Box>
      <BottomBar />
    </Container>
  );
}

export default Lyrics;
