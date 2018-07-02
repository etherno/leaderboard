import React, { Component } from "react";
import styled from 'styled-components';
// import { withI18next } from '../lib/withI18next';
import initFirebase from '../lib/initFirebase';

initFirebase();

const MainImage = styled.div`
  padding: 2rem;
  margin: 1rem;
  border: 1px solid rgba(70, 48, 235, .4);
  border-radius: .5rem;
  text-align: center;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, .1);
`

const Field = styled.div`
  margin: 1rem;
`

const FieldTitle = styled.p`
  margin: 0;
  font-size: 18px;
  font-family: 'Lekton';
  color: rgba(0,0,32,.9);
`

const FieldText = styled.p`
  margin-top: 2px;
  font-size: 14px;
  color: grey;
  font-family: 'Open Sans';
`

const LeaderboadSection = styled.div`
  margin-top: 4rem;
  padding: 1rem;
`

const LeaderboadTitle = FieldTitle.extend`
  font-size: 24px;
  text-align: center;
`

const LeaderboardCard = styled.div`
  border: 1px solid rgba(70, 48, 235, .4);
  border-radius: .5rem;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, .1);
  padding: 1rem;
  margin-top: 1rem;
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
        <LeaderboadSection>
          <LeaderboadTitle>Leaderboard</LeaderboadTitle>
          <LeaderboardCard>
            Rank #1
          </LeaderboardCard>
          <LeaderboardCard>
            Rank #2
          </LeaderboardCard>
          <LeaderboardCard>
            Rank #3
          </LeaderboardCard>
        </LeaderboadSection>
      </div>
    )
  }
}
