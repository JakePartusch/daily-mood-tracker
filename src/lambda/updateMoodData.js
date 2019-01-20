import { request } from 'graphql-request'

const url = process.env.api;

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  const { user } = context.clientContext;
  console.log(context)
  const { entry } = data;
  const query = `mutation {
    updateMoodData(user: "${user.id}", moodData: ${JSON.stringify(entry.moodData).replace(/"([^(")"]+)":/g,"$1:")}) {
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
