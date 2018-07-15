import React, { Component } from 'react'
import styled from 'styled-components'
// import { withI18next } from '../lib/withI18next';
import initFirebase from '../lib/initFirebase'
import Web3Local from 'web3'
import BigNumber from 'bignumber.js'
import Emojify from 'react-emojione'

const web3local = new Web3Local(
  new Web3Local.providers.WebsocketProvider('wss://mainnet.infura.io/_ws'),
)

initFirebase()

const MainImage = styled.div`
  padding: 2rem;
  margin: 1rem;
  border: 1px solid rgba(70, 48, 235, 0.4);
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
`

const Field = styled.div`
  margin: 1rem;
`

const FieldTitle = styled.p`
  margin: 0;
  font-size: 18px;
  font-family: 'Lekton';
  color: rgba(0, 0, 32, 0.9);
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
  border: 1px solid rgba(70, 48, 235, 0.4);
  border-radius: 0.5rem;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-top: 1rem;
  font-family: 'Lekton';
  display: flex;
`

const LeaderboardCardLoading = LeaderboardCard.extend`
  justify-content: center;
`

const CardText = styled.div`
  font-family: 'Lekton';
  display: inline-block;
  margin-right: 1rem;
`

const Address = styled.a`
  font-family: 'Open Sans';
  font-size: 14px;
  padding: 0.125rem 0.25rem;
  background: rgba(70, 48, 235, 0.1);
  border: 1px solid rgba(70, 48, 235, 0.4);
  border-radius: 4px;
  color: #4630eb;
  display: inline-block;
  overflow-x: auto;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
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
  margin-top: 0.5rem;
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
  margin-top: 0.5rem;
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
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  height: 3rem;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  padding-left: 1rem;
  box-sizing: border-box;
  font-family: 'Open Sans';
  &:focus {
    outline: none;
  }
`
const DonationItemImg = styled.img`
  width: 10rem;
  border: 1px solid rgba(70, 48, 235, 0.4);
  border-radius: 0.5rem;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
`

const DonateSection = styled.div`
  text-align: center;
  margin-top: 2.5rem;
`

const DonationItem = styled.div`
  margin: 1rem 0;
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover {
    transform: translateY(-0.5rem);
  }
`
const GeneralABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'sender', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
    ],
    name: 'FundsSent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'sender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Deposit',
    type: 'event',
  },
]

const getEventsFromAddress = async address => {
  const Contract = new web3local.eth.Contract(GeneralABI, address)
  const firstEvents = await Contract.getPastEvents('FundsSent', {
    fromBlock: '4000000',
    toBlock: 'latest',
  })

  if (firstEvents.length) {
    return firstEvents
  }

  const secondEvents = await Contract.getPastEvents('Deposit', {
    fromBlock: '4000000',
    toBlock: 'latest',
  })

  if (secondEvents.length) {
    return secondEvents
  }
  return false
}

function formatAmount(amount) {
  const splittedAmount = (amount + '').split('.')
  if (splittedAmount[1]) {
    return splittedAmount[0] + '.' + splittedAmount[1].slice(0, 2)
  }

  return splittedAmount[0]
}

const getLeaderboardList = async (address) => {
  const pastEvents = await getEventsFromAddress(address)
  const eventsWithMessage = await Promise.all(
    pastEvents.map(event => {
      return web3local.eth
        .getTransaction(event.transactionHash)
        .then(txData => {
          event.message = txData.input.length
            ? web3local.utils.hexToAscii(txData.input)
            : ''
          return event
        })
    }),
  )
  const normalizedEvents = eventsWithMessage.reduce((acc, event) => {
    const currentAddress = event.returnValues[0]
    const currentAmount = web3local.utils.fromWei(
      event.returnValues[1],
      'ether',
    )
    if (!acc[currentAddress]) {
      acc[currentAddress] = {
        address: '',
        amount: 0,
        message: '',
        txHashes: [],
      }
    }
    const oldAmount = acc[currentAddress].amount
    acc[currentAddress].address = currentAddress
    acc[currentAddress].amount = oldAmount
      ? parseFloat(currentAmount) + oldAmount
      : parseFloat(currentAmount)
    acc[currentAddress].message = event.message
    acc[currentAddress].txHashes.push(event.transactionHash)
    return acc
  }, {})
  return Object.getOwnPropertyNames(normalizedEvents).map(
    address => normalizedEvents[address],
  )
}

// const etherscanApiLinks = {
//   extTx:   "https://api.etherscan.io/api?module=account&action=txlistinternal&address=" +
//     donationAddress +
//     "&startblock=0&endblock=99999999&sort=asc&apikey=6DIUB7X6S92YJR6KXKF8V8ZU55IXT5PN2S",
//   intTx: "https://api.etherscan.io/api?module=account&action=txlist&address=" +
//     donationAddress +
//     "&startblock=0&endblock=99999999&sort=asc&apikey=6DIUB7X6S92YJR6KXKF8V8ZU55IXT5PN2S"
// }

// console.log(data.reduce((acc, test) => new BigNumber(test.returnValues.amount).plus(acc), 0).toString()
// 0x5adf43dd006c6c36506e2b2dfa352e60002d22dc
// TODO:
// Desktop UI
// Parse events
// List addresses with respective amounts
// Get total amount
// Loading state
// Info Modals
// Authentication
// Add/Remove/Edit fields
// Picture uploading/removal

export default class App extends Component {
  static async getInitialProps({ query }) {
    return query
  }

  state = {
    leaderboardList: [],
    currentDonationAddress: '0x5adf43dd006c6c36506e2b2dfa352e60002d22dc',
  }

  async componentDidMount() {
    const leaderboardList = await getLeaderboardList(this.state.currentDonationAddress)
    if (leaderboardList) {
      this.setState({ leaderboardList })
    }
  }

  handleAddressSubmit = async (e) => {
    if (e.keyCode === 13) {
      const value = e.target.value
      if (value.length === 42) {
        this.setState({ loading: true })
        const leaderboardList = await getLeaderboardList(value)
        if (leaderboardList) {
          this.setState({
            leaderboardList,
            loading: false,
            currentDonationAddress: value,
          })
          // clear input field
        }
      }
      // Check if e.target.value is an address
    }
  }

  render() {
    const { currentDonationAddress, leaderboardList, loading } = this.state

    return (
      <div>
        {/* <MainImage>PICTURE</MainImage>
        <Field>
          <FieldTitle>Title</FieldTitle>
          <FieldText>Donation Leaderboard</FieldText>
        </Field>
        <Field>
          <FieldTitle>About</FieldTitle>
          <FieldText>
            This leaderboard project is a way for people to generate their own
            donation leaderboards so they can easily share their generated
            donation page and get people to donate.
          </FieldText>
        </Field>
        <Field>
          <FieldTitle>Extra</FieldTitle>
          <FieldText>
            You should be able to generate as many fields as you like. (title,
            about and extra are all fields)
          </FieldText>
        </Field> */}
        <DonateSection>
          <LeaderboadTitle>Ways to Donate to {currentDonationAddress.slice(0,6) + '..' + currentDonationAddress.slice(-4)}</LeaderboadTitle>
          <DonationItem>
            <DonationItemImg src="/static/images/metamask.svg" />
            <FieldTitleCenter>MetaMask</FieldTitleCenter>
          </DonationItem>
          <DonationItem>
            <DonationItemImg src="/static/images/giveth-qr.svg" />
            <FieldTitleCenter>Scan QR Code</FieldTitleCenter>
          </DonationItem>
        </DonateSection>
        <LeaderboadSection>
          {(!leaderboardList.length || loading) && (
            <LeaderboardCardLoading>Loading...</LeaderboardCardLoading>
          )}
          {leaderboardList
            .sort((a, b) => b.amount - a.amount)
            .map(({ amount, address, message }, idx) => (
              <LeaderboardCard>
                <FirstHalf>
                  <div>
                    <FirstHalfText>Rank #{idx + 1}</FirstHalfText>
                    <FirstHalfText>{formatAmount(amount)} ETH</FirstHalfText>
                  </div>
                </FirstHalf>
                <SecondHalf>
                  <CardField>
                    <CardText>Address</CardText>
                    <Address
                      target="_blank"
                      href={'https://etherscan.io/address/' + address}
                    >
                      {address}
                    </Address>
                  </CardField>
                  <CardField>
                    <CardText>Message</CardText>
                    <Address>
                      <Emojify>{message || '-'}</Emojify>
                    </Address>
                  </CardField>
                </SecondHalf>
              </LeaderboardCard>
            ))}
        </LeaderboadSection>
        <AddressInputContainer>
          <AddressInput
            placeholder="Enter address.."
            onKeyUp={this.handleAddressSubmit}
          />
        </AddressInputContainer>
      </div>
    )
  }
}
