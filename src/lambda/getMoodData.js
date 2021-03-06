import { request } from 'graphql-request'

const url = process.env.api;

exports.handler = async (_, context) => {
  const { user } = context.clientContext;
  const query = `{
    moodData(user: "${user.email}") {
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