import type { NextApiRequest, NextApiResponse } from 'next'
import redis from "../../lib/redis";
import random from "../../lib/random";

type Data = {
    shortenedLink?: string,
    error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    let shortened = await random(5);
    let newLink = new RegExp("^(http|https)://", "i").test(req.body.link)
                ? req.body.link
                : `https://${req.body.link}`;

    await redis.hset("links", shortened, newLink);

    return res.status(200).json({ shortenedLink: shortened });
}
