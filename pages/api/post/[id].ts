import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { postDetailQuery } from '../../../utils/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query; // Get the id passed in from the details page

    const query = postDetailQuery(id); // Get the query from the queries file 

    const data = await client.fetch(query);

    res.status(200).json(data[0]); // return first post, hence [0]
  }
}
