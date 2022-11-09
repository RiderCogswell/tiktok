import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'

import { uuid } from 'uuidv4';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body;

    const data = 
      like ? await client // if like, then add like
        .patch(postId)
        .setIfMissing({ likes: [] })
        .insert('after', 'likes[-1]', [
          {
            _key: uuid(),
            _ref: userId,
          }
        ])
        .commit()
      : await client // if unlike, then remove like
        .patch(postId)
        .unset([`likes[_ref=="${userId}"]`])
        .commit();

      res.status(200).json(data); // return updated post
  }
}
