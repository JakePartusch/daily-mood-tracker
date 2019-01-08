import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { FaCheckCircle } from 'react-icons/fa';
import { IconContext } from "react-icons";

import styled from '@emotion/styled'
import netlifyIdentity from "netlify-identity-widget"

const Header = styled.h1`
  text-align: center;
  color: #666;
`

const EmojiButton = styled.button`
  font-size: 46px;
  width: 20%;
  height: 52px;
  padding: 0;
  margin: 0;
  text-align: center;
  line-height: 46px;
  background: none;
  border: none;
  ${props =>
    props.selected ? 'border-radius: 5px; border: 2px solid #0675B8;' : ''}
`

const EmojiWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 1em;
`

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  background-color: #0675b8;
  padding: 10px 5px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 5px solid #0675b8;
  box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.15);
  transition: all 0.15s ease 0s;
  :hover {
    background-color: #fff;
    color: #0675b8;
    font-weight: bold;
  }
`

const SuccessContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5em;
`

const options = [
  { emoji: '😩', label: 'bad' },
  { emoji: '😔', label: 'worse than normal' },
  { emoji: '😐', label: 'normal' },
  { emoji: '🙂', label: 'better than normal' },
  { emoji: '😄', label: 'good' },
]

class IndexPage extends React.Component {
  state = {}

  componentDidMount() {
    window.netlifyIdentity = netlifyIdentity
    // You must run this once before trying to interact with the widget
    netlifyIdentity.init({
      container: "#netlify-identity-modal" // defaults to document.body,
    });
    netlifyIdentity.open(); // open the modal

    const currentUser = netlifyIdentity.currentUser();
    if(currentUser) {
      this.setState({authenticated: true});
    }

    netlifyIdentity.on("init", user => console.log(user));
    netlifyIdentity.on("login", user => this.setState({authenticated: true}));
  }

  onButtonSelected = index => () => {
    this.setState({ index })
  }

  onSubmit = index => async () => {
    this.setState({ loading: true })
    const { email } = netlifyIdentity.currentUser();
    let isNew = false;
    let entry = await this.getMoodsForUser(email);
    if(!entry ) {
      isNew = true;
      entry = {
        allMoodData: {},
        user: email
      }
    }
    entry = this.addUpdatedData(entry, index);
    if(isNew) {
      await this.createMoodData(entry);
    } else {
      await this.updateMoodData(entry);
    }
    this.setState({ loading: false, submitted: true, index: undefined });
    setTimeout(() => this.setState({ submitted: false }), 1000);
  }

  addUpdatedData = (entry, index) => {
    const newEntry = { ...entry };
    newEntry.allMoodData[new Date().toLocaleDateString()] = index
    newEntry.timestamp = new Date().toISOString();
    return newEntry;
  }

  async getMoodsForUser(user) {
    const response = await fetch('/.netlify/functions/getMoodData', {
      body: user,
      method: 'POST',
    })

    const { data } = await response.json()
    return data;
  }

  async updateMoodData(data) {
    const response = await fetch('/.netlify/functions/updateMoodData', {
      body: JSON.stringify(data),
      method: 'POST',
    })

    return response.json()
  }

  async createMoodData(data) {
    const response = await fetch('/.netlify/functions/createMoodData', {
      body: JSON.stringify(data),
      method: 'POST',
    })

    return response.json()
  }

  render() {
    const { index, loading, submitted, authenticated } = this.state;
    
    if(!authenticated) {
      return <div id="netlify-identity-modal"/>
    }
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        { submitted && 
          <IconContext.Provider value={{ color: "green", size: '10em'}}>
            <SuccessContainer>
              <FaCheckCircle />
            </SuccessContainer>
          </IconContext.Provider>
        }
        { loading && <div></div> }
        { !loading && !submitted &&
          <React.Fragment>
            <Header>How was today?</Header>
            <EmojiWrapper>
              {options.map((option, i) => (
                <EmojiButton
                  key={option.label}
                  selected={index === i}
                  onClick={this.onButtonSelected(i)}
                >
                  <span role="img" aria-label={option.label}>
                    {option.emoji}
                  </span>
                </EmojiButton>
              ))}
            </EmojiWrapper>
            <ButtonWrapper>
              <SubmitButton type="button" onClick={this.onSubmit(index)}>
                Submit
              </SubmitButton>
            </ButtonWrapper>
          </React.Fragment>
        }
      </Layout>
    )
  }
}

export default IndexPage
