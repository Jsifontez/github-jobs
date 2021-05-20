import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import JobCard from '../components/JobCard'

export default function Home(props) {
  const [search, setSearch] = useState('')
  const [jobs, setJobs] = useState(props.jobs)
  const [isLoading, setIsLoading] = useState(false)
  // filters
  const [isFulltime, setIsFulltime] = useState(false)
  const [city, setCity] = useState('')

  useEffect( () => {
    if (!isLoading) return

    const fetchJobs = async () => {

      const URL = `${process.env.NEXT_PUBLIC_API}/positions.json?search=${search}&full_time=${isFulltime}&location=${city}`
      console.log(URL)
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

  const handleCheckbox = (e) => {
    // when we are sending a request to the api, the checkbox doesn't have to change
    if (isLoading) {
      e.target.checked = !e.target.checked
      return
    }

    setIsFulltime(e.target.checked)
    setIsLoading(true)
  }

  const handleRadioChange = e => {
    setCity(e.target.value)
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
            <input type="checkbox" id="full-time" onChange={handleCheckbox} />
            Full time
          </label>

          <label htmlFor="filter-search" className={styles.filter__location}>location
            <input id="filter-search" className={styles.filter__search}
              type="text"
              placeholder="City, state, zip code or country"
              onChange={handleRadioChange}
            />
          </label>

          <label htmlFor="london" className={styles.filter__radio}>
            <input
              type="radio"
              id="london"
              name="location"
              value="london"
              onChange={handleRadioChange}
            />
            London
          </label>

          <label htmlFor="amsterdam" className={styles.filter__radio}>
            <input
              type="radio"
              id="amsterdam"
              name="location"
              value="amsterdam"
              onChange={handleRadioChange}
              />
            Amsterdam
          </label>

          <label htmlFor="new-york" className={styles.filter__radio}>
            <input
              type="radio"
              id="new-york"
              name="location"
              value="new-york"
              onChange={handleRadioChange}
              />
            New York
          </label>

          <label htmlFor="berlin" className={styles.filter__radio}>
            <input
              type="radio"
              id="berlin"
              name="location"
              value="berlin"
              onChange={handleRadioChange}
            />
            Berlin
          </label>
        </form>

        <section className={styles.jobs}>
          {isLoading && <h4>Loading Jobs...</h4>}

          {jobs.map( job =>

            <Link key={job.id} href={`/positions/${job.id}`} >
              <a className={styles.job__link}>
                <JobCard
                  company={job.company}
                  title={job.title}
                  type={job.type}
                  location={job.location}
                  date={job.created_at}
                  logo={job.company_logo}
                />
              </a>
            </Link>

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
