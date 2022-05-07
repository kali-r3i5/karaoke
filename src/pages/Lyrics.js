import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';
import Musixmatch from 'musixmatch';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function Lyrics() {
  const { songName, artistName } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

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
        console.log(err.stack);
      });
  }, [songName, artistName, credentials.apiKey]);

  return (
    <Container maxW={'2xl'}>
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
        {data ? (
          <Text color="white">{data}</Text>
        ) : (
          <Text color="white">
            Suas Fichas se esgotaram , aguarde 1 hora para ganhar mais fichas .
          </Text>
        )}
      </Box>
      <Flex w="full" justifyContent="space-between" py={12}>
        <Button border="solid 1px black" onClick={() => navigate('/')}>
          Home
        </Button>
        <Button
          border="solid 1px black"
          rounded="full"
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft />
        </Button>
      </Flex>
    </Container>
  );
}

export default Lyrics;
