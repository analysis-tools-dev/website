import { Link, graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import "twin.macro"
import { Helmet } from "react-helmet"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allFile.edges
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Blog - Static analysis tools, linters, code quality</title>
        </Helmet>
        {posts.map(({ node }) => {
          const title =
            node.childMarkdownRemark.frontmatter.title ||
            node.childMarkdownRemark.fields.slug
          return (
            <div key={node.childMarkdownRemark.fields.slug}>
              <article tw="flex flex-col shadow my-4">
                <div tw="flex flex-col justify-start p-6">
                  <h1 tw="text-xl font-semibold pb-5">
                    <Link to={node.childMarkdownRemark.fields.slug}>
                      {title}
                    </Link>
                  </h1>
                  <small>{node.childMarkdownRemark.frontmatter.date}</small>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.childMarkdownRemark.excerpt,
                    }}
                  />
                </div>
              </article>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

// We have multiple post types with MarkdownRemark
// (blogs and language descriptions).
// Therefore we have to filter the blog posts here.
// One way is to look at all file nodes and filter the
// ones with instance name "blog".
// https://stackoverflow.com/a/49716206/270334
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      sort: { order: DESC, fields: childMarkdownRemark___frontmatter___date }
      filter: {
        internal: { mediaType: { eq: "text/markdown" } }
        sourceInstanceName: { eq: "blog" }
      }
    ) {
      edges {
        node {
          sourceInstanceName
          childMarkdownRemark {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
            }
          }
        }
      }
    }
  }
`
