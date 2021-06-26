import type { NextApiRequest, NextApiResponse } from 'next'
import redis from "../../lib/redis";
import random from "../../lib/random";

type Data = {
    shortenedLink: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    let shortened = await random(5);

    await redis.hset("links", shortened, req.body.link);

    return res.status(200).json({ shortenedLink: shortened });
}
