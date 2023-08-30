import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', 'POST').status(405).json({})
  }

  const SENDINBLUE_LIST_ID = process.env.SENDINBLUE_LIST_ID
  const SENDINBLUE_API_KEY = process.env.SENDINBLUE_API_KEY

  if (!SENDINBLUE_API_KEY || !SENDINBLUE_LIST_ID) {
    return res.status(500).json({
      error: 'Environment variables are not specified',
    })
  }

  const email = req.body.email

  if (typeof email !== 'string') {
    return res.status(400).json({})
  }

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': SENDINBLUE_API_KEY,
    },
    body: JSON.stringify({
      email,
      listIds: [Number(SENDINBLUE_LIST_ID)],
    }),
  })

  if (!response.ok) {
    return res.status(500).json({
      error: 'Something went wrong just don t panic',
    })
  }

  return res.status(201).json({})
}

export default handler
