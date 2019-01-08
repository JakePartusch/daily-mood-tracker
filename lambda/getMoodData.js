const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET,
})

exports.handler = async event => {
  const user = event.body

  try {
    const response = await client.query(q.Paginate(q.Match(q.Index("daily_moods_by_user"), user)))
    const item = await client.query(q.Get(response.data[0]));
  
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    }
  } catch (e) {
    console.error('error', e)
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    }
  }
}