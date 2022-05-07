import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            h={'32vh'}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Karaokê <br />
            <Text as={'span'} size={'3x1'}>
              Night
            </Text>
          </Heading>

          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              onClick={() => navigate('/national')}
              variant={'link'}
              colorScheme={'black'}
              size={'sm'}
            >
              Nacionais
            </Button>
            <Button
              onClick={() => navigate('/international')}
              variant={'link'}
              colorScheme={'black'}
              size={'sm'}
            >
              Internacionais
            </Button>
            <Box h={'32vh'} alignItems={'end'}>
              <Button
                variant={'outline'}
                colorScheme={'black'}
                size={'sm'}
                rounded={0}
                mt={20}
              >
                Pesquisar Artista / Música
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Hero;
