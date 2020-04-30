import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rgb(12, 124, 177)`,
      marginBottom: `3.5rem`,
    }}
  >
    <div
      style={{
        marginLeft: "30vw",
        marginRight: "30vw",
        maxWidth: 960,
        padding: `0.5rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0, textAlign:"center"}}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
