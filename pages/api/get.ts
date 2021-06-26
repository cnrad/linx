import type { NextApiRequest, NextApiResponse } from 'next'
import redis from "../../lib/redis";

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    let response = await redis.hget("links", "test");

    res.status(200).json(response)
}
