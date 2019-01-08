import faunadb from 'faunadb';

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET,
})

exports.handler = async event => {
  const data = JSON.parse(event.body)

  const item = { data }

  try {
    const response = await client.query(q.Update(q.Ref('classes/Daily_Moods'), item))
    
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
