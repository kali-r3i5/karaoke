import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ArtistSearch from './pages/ArtistSearch';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/national" element={<ArtistSearch type={'nacional'} />} />
        <Route
          path="/international"
          element={<ArtistSearch type={'international'} />}
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
