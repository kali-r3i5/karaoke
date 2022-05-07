import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RoundLetter from '../components/round-letter/RoundLetter';
import axios from 'axios';
import {
  Button,
  Container,
  Divider,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function ArtistList({ market }) {
  const { slug } = useParams();
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
      axios(
        `https://api.spotify.com/v1/search?type=artist&q=${slug}&include_external=audio&market=${market}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + tokenResponse.data.access_token,
          },
        }
      ).then(list => {
        setList(list?.data?.artists?.items);
      });
    });
  }, [slug, credentials.clientId, credentials.clientSecret, market]);

  return (
    <Flex justifyContent={'center'} alignItems={'top'} py={'2rem'} h={'100vh'}>
      <Container maxW={'60%'}>
        <RoundLetter
          alignSelf={'center'}
          justifySelf={'center'}
          letter={slug.toUpperCase()}
        />
        <Divider />
        <TableContainer py={5}>
          <Table variant="striped" colorScheme="gray">
            <Tbody>
              {list?.map(artists => (
                <Tr
                  _hover={{ cursor: 'pointer' }}
                  onClick={() =>
                    navigate(
                      `/international/songs/${artists?.uri.replace(
                        'spotify:artist:',
                        ''
                      )}`
                    )
                  }
                >
                  <Td>
                    <Image src={artists?.images[0]?.url} h={200} />
                  </Td>
                  <Td fontSize={32}>{artists?.name}</Td>
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
      </Container>
    </Flex>
  );
}

export default ArtistList;
