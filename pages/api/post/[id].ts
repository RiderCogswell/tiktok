import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4';
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
  } else if (req.method === 'PUT') {
    const { comment, userId } = req.body; // Get the comment and user id from the body
    const { id }: any = req.query; // Get the id passed in from the details page

    const data = await client 
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          _key: uuid(),
          postedBy: { _type: 'postedBy', _ref: userId },
        }
      ])
      .commit()

    res.status(200).json(data); // return comment
  }
}
