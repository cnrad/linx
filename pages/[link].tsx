import redis from "../lib/redis";

export default function Home() {
    return (
        <div>redirecting...</div>
    )
}

export async function getServerSideProps(context: any) {

    const shortened = context.params.link;

    let response = await redis.hget("links", shortened);

    if (!response) {
      return {
        notFound: true,
      }
    }
  
    return {
        redirect: {
          destination: response,
          permanent: true,
        },
      }
  }
  