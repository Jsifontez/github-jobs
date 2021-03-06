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
      </main>
    </>
  )
}
