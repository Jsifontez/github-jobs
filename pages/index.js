import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import JobCard from '../components/JobCard'

export default function Home(props) {
  const [search, setSearch] = useState('')
  const [jobs, setJobs] = useState(props.jobs)
  const [isLoading, setIsLoading] = useState(false)

  useEffect( () => {
    if (!isLoading) return

    const fetchJobs = async () => {
      const URL = `${process.env.NEXT_PUBLIC_API}/positions.json?search=${search}`

      const res = await fetch(URL)
      const data = await res.json()

      setJobs(data)
      setIsLoading(false)
    }

    fetchJobs()
  }, [isLoading])


  const handleChange = e => {
    setSearch(e.target.value.toLocaleLowerCase())
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setIsLoading(true)
  }

  return (
    <>
      <Head>
        <title>Github Jobs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <form className={styles.form} onSubmit={handleSearch}>
          <input className={styles.search}
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Title, companies, expertise or benefits"
          />
          <input className={styles.btn} type="submit" value="Search"/>
        </form>

        <form className={styles.filters}>
          <label htmlFor="full-time" className={styles.filter__checkbox}>
            <input type="checkbox" id="full-time" />
            Full time
          </label>

          <label htmlFor="filter-search">LOCATION
            <input id="filter-search" className={styles.filter__search}
              type="text"
              placeholder="City, state, zip code or country"
            />
          </label>

          <label htmlFor="london">
            <input
              type="radio"
              id="london"
              name="location"
              value="london"
              checked
            />
            London
          </label>

          <label htmlFor="amsterdam">
            <input
              type="radio"
              id="amsterdam"
              name="location"
              value="amsterdam"
              checked
            />
            Amsterdam
          </label>

          <label htmlFor="new-york">
            <input
              type="radio"
              id="new-york"
              name="location"
              value="new-york"
              checked
            />
            New York
          </label>

          <label htmlFor="berlin">
            <input
              type="radio"
              id="berlin"
              name="location"
              value="berlin"
              checked
            />
            Berlin
          </label>
        </form>

        <section className={styles.jobs}>
          {isLoading && <h4>Loading Jobs...</h4>}
          {jobs.map( job =>
            <JobCard
              key={job.id}
              company={job.company}
              title={job.title}
              type={job.type}
              location={job.location}
              date={job.created_at}
              logo={job.company_logo}
            />
          )}
        </section>
      </main>
    </>
  )
}

export async function getStaticProps () {
  const res = await fetch("https://jobs.github.com/positions.json?location=san+francisco")
  const jobs = await res.json()

  return {
    props: { jobs }
  }
}
