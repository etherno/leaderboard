import React, { Component } from "react";
import styled from 'styled-components';
// import { withI18next } from '../lib/withI18next';
import initFirebase from '../lib/initFirebase';

initFirebase();

const MainImage = styled.div`
  padding: 2rem;
  margin: 1rem;
  border: solid black 1px;
  border-radius: .5rem;
  text-align: center;
`

const Field = styled.div`
  margin: 1rem;
`

const FieldTitle = styled.p`
  margin: 0;
  font-size: 20px;
`

const FieldText = styled.p`
  margin-top: .5rem;
  font-size: 16px;
  color: grey;
`

export default class App extends Component {
  static async getInitialProps({ query }) {
    return query;
  }

  render() {
    return (
      <div>
        <MainImage>
          PICTURE
        </MainImage>
        <Field>
          <FieldTitle>Title</FieldTitle>
          <FieldText>Donation Leaderboard</FieldText>
        </Field>
        <Field>
          <FieldTitle>About</FieldTitle>
          <FieldText>
            This leaderboard project is a way for people to generate their own donation leaderboards
            so they can easily share their generated donation page and get people to donate.
          </FieldText>
        </Field>
        <Field>
          <FieldTitle>Extra</FieldTitle>
          <FieldText>
            You should be able to generate as many fields as you like. (title, about and extra are all fields)
          </FieldText>
        </Field>
      </div>
    )
  }
}
