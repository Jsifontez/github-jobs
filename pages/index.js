import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [search, setSearch] = useState('')

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
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
      </main>
    </>
  )
}
