# Incase of schema changes

run this command and commit the updated codegen
```bash
GALILEO_TOKEN=<user-token> npm run codegen
```

publish package
```bash
npm publish --access=public
```


# Explanation
`gpe-api.ts` contains the entry point

GRS consumes `gpe.grafanaChart`

This function essentially mocks grafana runtime

Then 3 major steps are

query

transform

visualize

You can see each of these steps in the GPE class there will be a corresponding function for each

# Query
graphql queries are written in `sr/client/queries/`

The result is proessed in `src/client/to-dataframes`

# Transform
Uses grafana's open source transforms
`src/utils/execute-transforms`

# Visualize
Using Highcharts - Generate a highcharts options object from dataframes and user options

main code is found in `src/panel-to-highchart` (Should be renamed to build-highcharts or dataframes-to-highcharts)

The main function is `src/panel-to-highchart/highchart-object-from-data-panel-options.ts`

This function then calls the smaller functions that translate the dataframes into a certain highchart type, typically one of `line` or `pie`

Then styles and formatting are generally applied based on user settings like fonts, titles and colors.

Then the result is passed as the return and rendered in either grs or grafana














