import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ApolloProvider } from '@apollo/client';

import client from './apolloClient';
import LogoSvg from './assets/svg/curebase-logo.svg';
import NavMenu from './NavMenu';
import Participants from './participants/Participants';
import EnrollParticipant from './participants/Enroll';
import Trials from './trials/Trials';


const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Container>
          <Header>
            <Logo alt='curebase logo' src={LogoSvg}></Logo>
            <NavMenu></NavMenu>
          </Header>
          <Content>
            <Routes>
              <Route path="/participants" element={<Participants />} />
              <Route path="/participants/enroll" element={<EnrollParticipant />} />
              <Route path="/trials" element={<Trials />} />
            </Routes>
          </Content>
        </Container>
      </Router>
    </ApolloProvider>
  );
};


const Container = styled.div`
  font-family: 'Lato', sans-serif;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Logo = styled.img`
  max-height: 80px;
  @media (max-width: 500px) {
    width: 40%
  }
`;

const Content = styled.main`
  margin-top: 40px;
`;


export default App;
