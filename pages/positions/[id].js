import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export const getStaticPaths = async () => {
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ]

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params}) => {
  try {
    const res = await fetch(`https://jobs.github.com/positions/${params.id}.json?markdown=true`)
    const job = await res.json()

    return {
      props: { job }
    }

  } catch (e) {
    console.log('Error happened here!')
    console.log(e)

    return {
      notFound: true
    }
  }
}

export default function Position (props) {
  const router = useRouter()

  if (router.isFallback) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>GitHub Job Position</title>
      </Head>
      <main className="main">
        <section >
          <Link href="/">
            <a>Home</a>
          </Link>
          <h4>how to apply</h4>
          <p>
            {router.query.id}
          </p>
        </section>
      </main>
    </>
  )
}
