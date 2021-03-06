import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser';
import styles from '../../styles/Id.module.css'

export default function Position () {
  const router = useRouter()
  const [job, setJob] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=> {

    const fetchJob = async () => {
      const URL = `${process.env.NEXT_PUBLIC_API}/positions/${router.query.id}.json`;

      const res = await fetch(URL)
      const data = await res.json()

      setJob(data)
      setIsLoading(false)
    }

    fetchJob()
  }, [])

  function date (created) {
    const createdD = new Date(job.created_at)
    const today = new Date()
    const tYMD = today.getFullYear() * 1e4 + today.getMonth() * 1e2 + today.getDate()
    const cYMD = createdD.getFullYear() * 1e4 + createdD.getMonth() * 1e2 + createdD.getDate()

    const date = tYMD - cYMD > 0 ? `${tYMD - cYMD} days ago` : createdD.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) + ' hours ago'

    return date
  }

  if (isLoading) return <div>Loading...</div>
  return (
    <>
      <Head>
        <title>GitHub Jobs Position — {job.title} | {job.company}</title>
      </Head>
      <main className="main">
        <aside className={styles.job__info}>
          <Link href="/">
            <a className={styles.link}>Back to search</a>
          </Link>
          <h3 className={styles.job__link}>how to apply</h3>
          { ReactHtmlParser(job.how_to_apply) }
        </aside>
        <article className={styles.job}>
          <header className={styles.job__header}>
            <h1 className={styles.job__title}>
              {job.title}
            </h1>
            <span className={styles.job__type}>{job.type}</span>
            <small className={styles.company__location}> {date(job.created_at)} </small>
          </header>
          <section className={styles.company}>
            <img className={styles.company__logo} src={job.company_logo} />
            <div>
              <h2 className={styles.company__name}>{job.company}</h2>
              <p className={styles.company__location}>
                <small className={styles.location}>{job.location}</small>
              </p>
            </div>
          </section>
          <section className={styles.job__description}>
            { ReactHtmlParser(job.description) }
          </section>
        </article>
      </main>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const paths = [
//     { params: { id: '1' } },
//     { params: { id: '2' } }
//   ]

//   return {
//     paths,
//     fallback: true
//   }
// }

// export const getStaticProps = async ({ params}) => {
//   try {
//     const res = await fetch(`https://jobs.github.com/positions/${params.id}.json?markdown=true`)
//     const job = await res.json()

//     return {
//       props: { job }
//     }

//   } catch (e) {
//     console.log('Error happened here!')
//     console.log(e)

//     return {
//       notFound: true
//     }
//   }
// }