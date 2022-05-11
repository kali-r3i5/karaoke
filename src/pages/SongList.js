import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import BottomBar from '../components/bottom-bar/BottomBar';
import { FaArrowRight } from 'react-icons/fa';

function SongList() {
  const { uri } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState();

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  let credentials = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  };

  const SONGS = {
    'Bohemian Rhapsody - Remastered 2011': 18024,
    Creep: 18644,
    'Another One Bites The Dust - Remastered 2011': 18333,
    "Don't Stop Me Now - Remastered 2011": 18660,
    'Under Pressure - Remastered 2011': 18335,
    'Dias De Luta, Dias De Gloria': 7944,
    Evidências: 3094,
    'Só os Loucos Sabem': 1520,
    'Ela Vai Voltar (Todos Os Defeitos De Uma Mulher Perfeita)': 7591,
    'Céu Azul (Ao Vivo)': 2846,
    'Zóio De Lula': 4340,
    'Lugar Ao Sol': 6378,
    'Meu Novo Mundo': 15256,
    'Só Por Uma Noite': 31012,
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
        <Modal
          motionPreset="slideInBottom"
          onClose={onClose}
          isOpen={isOpen}
          size={'xl'}
        >
          <ModalOverlay />
          <ModalContent pb={5}>
            <ModalHeader color="red">ATENÇÃO!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Esse projeto utiliza de APIs publicas com limitação de acesso.
                Para acessar as letras das musicas você deve clicar no botão
                abaixo e fechar esse aviso para conseguir selecionar a música
                desejada:
                <iframe
                  title="cors"
                  width="100%"
                  src="https://cors-anywhere.herokuapp.com/corsdemo"
                />
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box w="full" pt={{ base: 0, md: '15rem' }}>
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
                    <Td>{SONGS[songs?.name] || songs?.id}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <BottomBar />
        </Box>
      </Flex>
    </Container>
  );
}

export default SongList;
