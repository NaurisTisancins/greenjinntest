// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  revalidate: true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  for (const url of req.body) {
    await res.revalidate(url);
  }
  res.status(200).json({ revalidate: true });
}
