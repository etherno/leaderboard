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

const FieldTitleCenter = FieldTitle.extend`
  text-align: center;
`

const FieldText = styled.p`
  margin-top: 2px;
  font-size: 14px;
  color: grey;
  font-family: 'Open Sans';
`

const LeaderboadSection = styled.div`
  margin-top: 2rem;
  margin-bottom: 4rem;
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
  font-family: 'Lekton';
  display: flex;
`

const CardText = styled.div`
  font-family: 'Lekton';
  display: inline-block;
  margin-right: 1rem;
`

const Address = styled.div`
  font-family: 'Open Sans';
  font-size: 14px;
  padding: .125rem .25rem;
  background: rgba(70,48,235,.1);
  border: 1px solid rgba(70,48,235,.4);
  border-radius: 4px;
  color: #4630eb;
  display: inline-block;
  overflow-x: auto;
`

const Amount = styled.div`
  font-family: 'Lekton';
  font-size: 30px;
  text-align: center;
  margin-top: 1rem;
`

const CardField = styled.div`
  white-space: nowrap;
  max-width: 100%;
  display: flex;
  align-items: center;
  margin-top: .5rem;
`

const FirstHalf = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  flex-direction: column;
`

const FirstHalfText = styled.p`
  margin: 0;
  margin-top: .5rem;
  font-size: 20px;
`

const SecondHalf = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AddressInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding 0 1rem 1rem 1rem;
`

const AddressInput = styled.input`
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, .1);
  height: 3rem;
  width: 100%;
  border: 1px solid #E6E6E6;
  border-radius: 3px;
  padding-left: 1rem;
  box-sizing: border-box;
  font-family: 'Open Sans';
`
const DonationItemImg = styled.img`
  width: 10rem;
  border: 1px solid rgba(70, 48, 235, .4);
  border-radius: .5rem;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, .1);
`

const DonateSection = styled.div`
  text-align: center;
  margin-top: 2.5rem;
`

const DonationItem = styled.div`
  margin: 1rem 0;
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
        <DonateSection>
          <LeaderboadTitle>Ways to Donate</LeaderboadTitle>
          <DonationItem>
            <DonationItemImg src="http://localhost:3000/static/images/metamask.svg" />
            <FieldTitleCenter>MetaMask</FieldTitleCenter>
          </DonationItem>
          <DonationItem>
            <DonationItemImg src="http://localhost:3000/static/images/giveth-qr.svg" />
            <FieldTitleCenter>Scan QR Code</FieldTitleCenter>
          </DonationItem>
        </DonateSection>
        <LeaderboadSection>
          <LeaderboadTitle>Leaderboard</LeaderboadTitle>
          <LeaderboardCard>
            <FirstHalf>
              <div>
                <FirstHalfText>Rank #1</FirstHalfText>
                <FirstHalfText>1234 ETH</FirstHalfText>
              </div>
            </FirstHalf>
            <SecondHalf>
              <CardField>
                <CardText>Address</CardText>
                <Address>0x5adf43dd006c6c36506e2b2dfa352e60002d22dc</Address>
              </CardField>
              <CardField>
                <CardText>Message</CardText>
                <Address>Hello this is a test message</Address>
              </CardField>
            </SecondHalf>
          </LeaderboardCard>
          <LeaderboardCard>
            <FirstHalf>
              <div>
                <FirstHalfText>Rank #2</FirstHalfText>
                <FirstHalfText>1234 ETH</FirstHalfText>
              </div>
            </FirstHalf>
            <SecondHalf>
              <CardField>
                <CardText>Address</CardText>
                <Address>0x5adf43dd006c6c36506e2b2dfa352e60002d22dc</Address>
              </CardField>
              <CardField>
                <CardText>Message</CardText>
                <Address>Hello this is a test message</Address>
              </CardField>
            </SecondHalf>
          </LeaderboardCard>
          <LeaderboardCard>
            <FirstHalf>
              <div>
                <FirstHalfText>Rank #3</FirstHalfText>
                <FirstHalfText>1234 ETH</FirstHalfText>
              </div>
            </FirstHalf>
            <SecondHalf>
              <CardField>
                <CardText>Address</CardText>
                <Address>0x5adf43dd006c6c36506e2b2dfa352e60002d22dc</Address>
              </CardField>
              <CardField>
                <CardText>Message</CardText>
                <Address>Hello this is a test message</Address>
              </CardField>
            </SecondHalf>
          </LeaderboardCard>
        </LeaderboadSection>
        <AddressInputContainer>
          <AddressInput placeholder="Enter address.." />
        </AddressInputContainer>
      </div>
    )
  }
}
