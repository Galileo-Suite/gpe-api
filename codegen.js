module.exports =  {
  "schema": [
    {
      [process.env.ORIGIN]: {
        "headers": {
          "X-Galileo-Token": process.env.GALILEO_TOKEN
        }
      }
    }
  ],
  "generates": {
    "./src/types/schema.ts": {
      "plugins": [
        "typescript",
        "typescript-operations",
        "typed-document-node"
      ]
    },
    "./src/client/queries/queries.ts": {
      "documents": "./src/client/queries/**/*.graphql",
      "plugins": [
        "typescript",
        "typescript-operations",
        "typed-document-node"
      ]
    }
  }
}
