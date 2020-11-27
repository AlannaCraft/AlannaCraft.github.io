require('dotenv').config({
  path: `.env`,
});

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.API_URL || 'http://localhost:1337',
        contentTypes: ['article', 'category', 'writer'],
        singleTypes: [`homepage`, `global`],
        queryLimit: 10000,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alanna Craft's Blog`,
        short_name: `Alanna Craft`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'articles',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allStrapiArticle(
              filter: {status: {eq: "published"}}
            ) {
              nodes {
                title
                description
                content
                slug
                publishedAt
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'slug',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['title', 'description', 'content'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['title', 'slug', 'publishedAt'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allStrapiArticle.nodes.map(node => ({
            title: node.title,
            description: node.description,
            content: node.content,
            slug: node.slug,
            publishedAt: node.publishedAt,
          })),
      },
    },
    'gatsby-plugin-offline',
  ],
};
