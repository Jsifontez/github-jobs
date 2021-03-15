import styles from '../styles/JobCard.module.css'

const JobCard = (props) => {
  return (
    <article className={styles.job}>
      <img className={styles.job__img} src="" />
      <section className={styles.job__info}>
        <p className={styles.job__company}>{ props.job.company }</p>
        <h3 className={styles.job__title}>{ props.job.title }</h3>
        <div className={styles.job__related}>
          <span className={styles.job__type}>{ props.job.type }</span>
          <div>
            <span className={styles.job__location}>{ props.job.location }</span>
            <span className={styles.job__date}>{ props.job.date }</span>
          </div>
        </div>
      </section>
    </article>
  )
}

export default JobCard
