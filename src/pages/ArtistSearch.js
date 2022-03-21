import { Container, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import RoundLetter from '../components/round-letter/RoundLetter';
import { letters } from '../constants/letters';

function ArtistSearch({ type }) {
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
            />
          ))}
        </SimpleGrid>
      </Container>
    </Flex>
  );
}

export default ArtistSearch;
