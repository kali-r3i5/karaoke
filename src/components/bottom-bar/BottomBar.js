import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const BottomBar = () => {
  const navigate = useNavigate();

  return (
    <Flex
      pos="fixed"
      bottom={0}
      w={{ base: 'full', md: '3xl' }}
      justifyContent="space-between"
      px={{ base: 5, md: 10 }}
      py={6}
      bgColor="white"
    >
      <Button
        border="solid 1px black"
        onClick={() => navigate('/')}
        color="black"
      >
        Home
      </Button>
      <Button
        color="black"
        border="solid 1px black"
        rounded="full"
        onClick={() => navigate(-1)}
      >
        <AiOutlineArrowLeft />
      </Button>
    </Flex>
  );
};

export default BottomBar;
