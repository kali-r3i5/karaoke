import { Box, Text } from '@chakra-ui/react';
import React from 'react';

function RoundLetter(props) {
  return (
    <Box
      bgColor={'black'}
      color={'white'}
      w={'40px'}
      h={'40px'}
      rounded={'full'}
      textAlign={'center'}
      {...props}
      _hover={{ cursor: 'pointer' }}
    >
      <Text fontSize={'22px'}> {props.letter} </Text>
    </Box>
  );
}

export default RoundLetter;
