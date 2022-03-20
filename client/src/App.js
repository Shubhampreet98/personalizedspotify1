import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { accessToken, logout } from './spotify';
import { GlobalStyle } from './styles';
import { Login, Profile, TopArtists, TopTracks, Playlists, Playlist } from './pages';
import styled from 'styled-components/macro';

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, [])

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
      {!token ? (
          < Login />
        ) : (
        <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Profile/>}></Route>
          </Routes>
          <Routes>
            <Route path="/topartists" element={<TopArtists/>}></Route>
          </Routes>
          <Routes>
            <Route path="/toptracks" element={<TopTracks/>}></Route>
          </Routes>
          <Routes>
            <Route path="/playlists/:id" element={<Playlist/>}></Route>
          </Routes>
          <Routes>
            <Route path="/playlists" element={<Playlists/>}></Route>
          </Routes>
          <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
        </BrowserRouter>
        </>
        )}
      </header>
    </div>
  );
}

export default App;
