import { request } from 'graphql-request'

const url = process.env.api;

exports.handler = async event => {
  const user = event.body
  
  const query = `{
    moodData(user: "${user}") {
      entryDate
      status
    }
  }`
  try {
    const response = await request(url, query)
  
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (e) {
    console.error('error', e)
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    }
  }
}