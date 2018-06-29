import React, { Component } from "react";
import styled from 'styled-components';
import { withI18next } from '../lib/withI18next';
import initFirebase from '../lib/initFirebase';

initFirebase();

const Header = styled.div`
  padding: 2rem;
  margin: 0 auto;
  max-width: 48rem;
`

class App extends Component {
  static async getInitialProps({ query }) {
    return query;
  }

  render() {

    return (
      <div>
        <Header>
          Leaderboard
        </Header>
      </div>
    )
  }
}

export default withI18next(['common', 'navigation'])(App);
