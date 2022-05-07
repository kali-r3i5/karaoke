import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function SongList() {
  const { uri } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState();

  let credentials = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  };

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          btoa(credentials.clientId + ':' + credentials.clientSecret),
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    }).then(tokenResponse => {
      axios(`https://api.spotify.com/v1/artists/${uri}/top-tracks?market=US`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + tokenResponse.data.access_token,
        },
      }).then(list => {
        console.log(list.data.tracks);
        setList(list?.data?.tracks);
      });
    });
  }, [uri, credentials.clientId, credentials.clientSecret]);

  return (
    <Container maxW={'3xl'} py={'2rem'}>
      <Flex
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'100vh'}
      >
        <Box w="full" pt={'15rem'}>
          <Flex
            flexDir={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            w="full"
          >
            {list && (
              <>
                <Image src={list[0]?.album?.images[0]?.url} w={100} h={100} />
                <Box fontSize={32}>{list[0]?.artists[0]?.name}</Box>
              </>
            )}
          </Flex>
          <TableContainer w="full" mt={10}>
            <Table variant="striped" colorScheme="gray" border="1px solid gray">
              <Thead>
                <Tr>
                  <Th>Música</Th>
                  <Th>Código</Th>
                </Tr>
              </Thead>
              <Tbody>
                {list?.map(songs => (
                  <Tr
                    _hover={{ cursor: 'pointer' }}
                    onClick={() =>
                      navigate(
                        `/international/songs/${songs?.name}/${songs?.artists[0].name}`
                      )
                    }
                  >
                    <Td>{songs?.name}</Td>
                    <Td>{songs?.id}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
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
        </Box>
      </Flex>
    </Container>
  );
}

export default SongList;
