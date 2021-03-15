const Layout = ({ children }) => {
  return (
    <section className="global__container">
      <header>
        <h1 className="title">Github Jobs</h1>
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
