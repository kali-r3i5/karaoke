import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchByLetter from './pages/SearchByLetter';
import ArtistList from './pages/ArtistList';
import SongList from './pages/SongList';
import Lyrics from './pages/Lyrics';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="national">
          <Route index element={<SearchByLetter type={'Nacionais'} />} />
          <Route path=":slug" element={<ArtistList market="BR" />} />
        </Route>
        <Route path="international">
          <Route index element={<SearchByLetter type={'Internacionais'} />} />
          <Route path=":slug" element={<ArtistList market="US" />} />
          <Route path="songs">
            <Route index path=":uri" element={<SongList />} />
            <Route index path=":songName/:artistName/" element={<Lyrics />} />
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
