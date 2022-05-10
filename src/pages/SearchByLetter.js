import { Button, Container, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoundLetter from '../components/round-letter/RoundLetter';
import { letters } from '../constants/letters';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function SearchByLetter({ type }) {
  const navigate = useNavigate();

  return (
    <Flex justifyContent={'center'} alignItems={'center'} h={'100vh'}>
      <Container maxW={'sm'}>
        <Text fontSize={28} textAlign="center" py={8}>
          {type}
        </Text>
        <SimpleGrid columns={4} spacing={4}>
          {letters.map(letter => (
            <RoundLetter
              alignSelf={'center'}
              justifySelf={'center'}
              letter={letter}
              onClick={() =>
                navigate(
                  type === 'Nacionais'
                    ? `/national/${letter.toLocaleLowerCase()}`
                    : `/international/${letter.toLocaleLowerCase()}`
                )
              }
            />
          ))}
        </SimpleGrid>
        <Button
          pos="absolute"
          right={{ sm: 10, md: 480 }}
          bottom={10}
          border="solid 1px black"
          rounded="full"
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft />
        </Button>
      </Container>
    </Flex>
  );
}

export default SearchByLetter;
