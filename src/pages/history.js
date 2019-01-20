import React, { Component } from 'react'
import Layout from '../components/layout'
import HistoryGrid from '../components/history/historyGrid';
import moment from 'moment';

export default class History extends Component {
  render() {
    return (
      <Layout>
        <h2>{moment().format('MMMM - YYYY')}</h2>
        <HistoryGrid />
      </Layout>
    )
  }
}
