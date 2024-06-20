import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { searchPostsQuery } from '../../../utils/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { term } = req.query; // Get the id passed in from the details page

    const query = searchPostsQuery(term); // Get the query from the queries file

    const data = await client.fetch(query);

    res.status(200).json(data);
  }
}
