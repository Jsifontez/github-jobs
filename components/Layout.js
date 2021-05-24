const Layout = ({ children }) => {
  return (
    <section className="global__container">
      <header>
        <h2 className="title">Github Jobs</h2>
      </header>

      {children}

      {/* <footer>
        code with ❤️ by {' '}
        <a
          href="https://twitter.com/jsifontez_"
          target="_blank"
          rel="noopener noreferrer"
        >
          @jsifontez
        </a>
      </footer> */}
    </section>
  )
}

export default Layout
