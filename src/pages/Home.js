import { Box, Grid } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../components/color-mode-switcher/ColorModeSwitcher';
import Hero from '../components/hero/Hero';

function Home() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Hero />
      </Grid>
    </Box>
  );
}

export default Home;
