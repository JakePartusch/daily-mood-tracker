import React, { Component } from 'react'
import netlifyIdentity from "netlify-identity-widget"
import Layout from '../components/layout';

export default class Logout extends Component {
    componentDidMount() {
        netlifyIdentity.logout()
    }
  render() {
    return (
      <Layout>
        <div>You have been logged out successfully.</div>
      </Layout>
    )
  }
}
