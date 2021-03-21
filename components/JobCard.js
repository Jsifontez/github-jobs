import styles from '../styles/JobCard.module.css'

const JobCard = (props) => {
  return (
    <article className={styles.job}>
      <div className={styles.img__container}>
        <img className={styles.job__img} src={props.logo} alt={`${props.company} logo`} />
      </div>
      <section className={styles.job__info}>
        <p className={styles.job__company}>{ props.company }</p>
        <h3 className={styles.job__title}>{ props.title }</h3>
        <div className={styles.job__related}>
          <span className={styles.job__type}>{ props.type }</span>
          <div>
            <span className={styles.job__location}>{ props.location }</span>
            <span className={styles.job__date}>{ props.date }</span>
          </div>
        </div>
      </section>
    </article>
  )
}

export default JobCard
