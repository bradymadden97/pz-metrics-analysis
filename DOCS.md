# Pz-Metrics Docs

# Table of Contents
* [Using Dashboard](#using-dashboard)
    * [Requirements](#requirements)
    * [Setup Locally](#setup-locally)
        * [Environment Setup](#environment-setup)
        * [Dashboard Setup](#dashboard-setup)
    * [Run Locally](#run-locally)
    * [Use Dashboard](#use-dashboard)
    * [Addedum on PCF Use](#addedum-on-pcf-use)
* [Developing Dashboard](#developing-dashboard)
   * [Dashboard Overview](#dashboard-overview)
   * [Endpoints](#endpoints)
      * [View Endpoints](#view-endpoints)
      * [API Endpoints](#api-endpoints)
   * [Add a New Graph](#add-a-new-graph)
      * [Writing a Graph Logs Query](#writing-a-graph-logs-query)



# Using Dashboard

## Requirements
- Kibana version `4.4`
- Elasticsearch version `2.2.0`
- Node.js version `4.8.4`


## Setup Locally

### Environment Setup
Of the three components, Kibana, Elasticsearch, and the Node dashboard, there are a few relationships that must be satisfied.
 - Kibana knows:
    - Elasticsearch port
      - Default: `9200`
      - Configured outside scope of this project, in kibana, in `kibana.yml`
 - Elasticsearch knows:
    - Nothing
 - Node dashboard knows:
    - Elasticsearch port
      - Default: `9200`
      - Set in [config.json](/config/config.json) file
    - Elasticsearch index and ES Javascript API version
      - Default: `pzlogger5` and version  `2.4`
      - Set in [config.json](/config/config.json) file
    - Kibana port
      - Default: `5601`
      - Set in [config.json](/config/config.json) file
    - Piazza space
      - Default: `int`
      - Set in [config.json](/config/config.json) file under `authentication`
    - Dashboard port
      - Default: `8000`
      - Set in [config.json](/config/config.json) file
      
### Dashboard Setup
Use the [package.json](/package.json) file to let [npm](https://www.npmjs.com/) manage dependencies. Run ` npm install ` to install all the project dependencies.
      
## Run Locally
* Tunnel into your chosen Elasticsearch instance and point it at the port you specified in `kibana.yml` and the [config.json](/config/config.json) file. 
* Start your local Kibana instance, which defaults to port `5601`, but should run on whatever port you specified in the query links in the [data.json](/config/data.json) file.
* Run `node app.js` which will start up the node server on the port you specified in [config.json](/config/config.json).

## Use Dashboard
Pz-Metrics Dashboard has two main capabilities- view logs and view Kibana graphs of logs. 

To access the dashboard you will need a Piazza API key for the current Piazza `space` referred to above. After authenticating, you will stay authenticated for 30 minutes before needing to reauthenticate, and your API key will be saved for up to 30 days for quick reauthentication. 

Once you're authenticated, you can access various Kibana graphs that visualize specific Elasticsearch log queries. On a graph page, you can also view the specific logs associated with that graph by clicking `Logs` at the bottom of the page. In addition to viewing Kibana graphs, Dashboard also serves an updated stream of all the logs sorted by _most recent_.

## Addedum on PCF Use
Pz-Metrics Dashboard is currently hosted at [pz-metrics.int.geointservices.io](https://pz-metrics.int.geointservices.io). Displaying Kibana graph views is still in development and right now requires manual authorization to our internal Kibana instance.



# Developing Dashboard

## Dashboard Overview
The metrics dashboard follows the following directory structure:

* **app**: 
   * [authenticate.js](/authenticate.js) - Authenticates API key with Pz-gateway to allow access to Pz-metrics dashboard.
   * [routes.js](/routes.js) - Functions behind each route for the dashboard server to pass data to the views.
* **config**:
   * [config.json](/config/config.json) - Specifies port and space information. Can be altered to use environment variables instead in of a json in the future.
   * [data.json](/config/data.json) - The data that dashboard uses to render specific graph and log queries. Each graph title is a key in the json file.
* **public**:
   * Holds the client-side javascript and css in respective subdirectories. 
   * Scripts for specific graph parameters, such as `timeInterval` or `timeRange` are located inside `../public/js/parameters`
* **queries**:
   * Holds elasticsearch and kibana scripts for reference.
* **views**:
   * Pz-metrics dashboard uses [handlebars.js](http://handlebarsjs.com/) to template its views.
   * Handlebars looks inside `../views/layouts` for the main template, called [main.handlebars](/views/layouts/main.handlebars), and then inserts a template from `../views` inside the `{{{body}}}` tag.
   * The template is specified when the view is being rendered by [routes.js](/app/routes.js).
   * Handlebars also supports partial templates, basically pieces inserted inside a larger view. Pz-metrics dashboard makes use of partials for the graph parameters, among other things. Based on parameters included in [data.json](/config/data.json), the graph view can loop through the partials listed and include each parameter's partial.
   * This use of partials makes it simple to add new graphs and parameters without changing existing code.
* [**app.js**](app.js):
   * The main node server.
   
   
## Endpoints
The dashboard uses a REST structure to make it simple to access the data you seek. The current dashboard endpoints are as follows:

### View Endpoints
**GET**&nbsp;&nbsp;&nbsp;`/`
   * Description:
      * Homepage of Pz-Metrics Dashboard. Holds links to graph views and log stream.
         
**GET**&nbsp;&nbsp;&nbsp;`/graph/{graphName}`
   * Description:
      * Graph view of a specific Kibana graph.
         
**GET**&nbsp;&nbsp;&nbsp;`/logs`
   * Description:
      * View of most recent Elasticsearch logs.
         
**GET**&nbsp;&nbsp;&nbsp;`/login`
   * Description:
      * Page to authenticate with Piazza API key.
         
         
### API Endpoints     
**GET**&nbsp;&nbsp;&nbsp;`/api/logs`
   * Description:
      * Returns JSON of Elasticsearch log stream ordered by most recent.
   * Query Parameters:
      * count: Number of logs to return
      * page: Page of logs, beginning at 0, to return
         
**GET**&nbsp;&nbsp;&nbsp;`/api/logs/{graphName}`
   * Description:
      * Returns JSON of Elasticsearch logs associated with that graph's query. Query is specified in data.json.
   * Query Parameters:
      * count: Number of logs to return
      * page: Page of logs, beginning at 0, to return
      * {extraParameters}: Custom parameters for specific graphs, such as `timeRange`

**GET**&nbsp;&nbsp;&nbsp;`/api/logs/mapping`
   * Description:
      * Returns JSON of Elasticsearch mappings for index specified in  config.json file.
         
**GET**&nbsp;&nbsp;&nbsp;`/api/data`
   * Description:
      * Returns JSON from data.json file.
      
**GET**&nbsp;&nbsp;&nbsp;`/api/data/{graphName}`
   * Description:
      * Returns JSON for specified graph from data.json file.
         
**POST**&nbsp;&nbsp;&nbsp;`/api/login`
   * Description:
      * Authenticates API key with Pz-gateway. Starts session and saves "api" cookie on success.
   * Query Parameters:
      * returnTo: Dashboard to redirect to after successful authentication
   * Body:
      ```
      {
         "api": "{$PZ_API_KEY}"
      }
      ```

## Add a New Graph
The template design of the Dashboard makes it simple to add a new graph to the list that has a customized Kibana view and related logs. 
The graph pages use a main [graph view](/views/graph.handlebars), with multiple partial views embedded inside as hilighted below. Each graph parameter, which are stacked at the top of the view, is its own partial, which allows graph views to be customized to easily insert only the parameters they need. 
![ScreenShot](https://user-images.githubusercontent.com/16962017/29088777-399bf802-7c48-11e7-8926-cab5769ddc65.PNG)
<br><br>
All the parameters, queries, and other data needed to display custom graph and log views is sourced from [data.json](config/data.json). To create a new graph view, your entry into data.json should be structured as follows:
```
{
   "<graphName>": {
      "graph": {
         "link": "<Custom Kibana graph link>",
         "params": [ "<graphParameterName>", "<anotherGraphParameterName>" ],
         "default": {
            "<variableName>": "<defaultValue>",
            "<anotherVariableName>": "<defaultValue>"
         },
         "scripts": [ "<scriptToInclude.js>" ]
      },
      "logs": {
         "body": { <Elasticsearch Query> }
      }
   }
}
```
There are some guidelines to follow regarding data inside this structure. 
*  Remove the domain from the Kibana link, whether it's `localhost:5601` or `https://mykibana.amazonaws.com`. It will be added dynamically later.

*  Your Kibana link will be customized with the parameter values selected on the dashboard. This is done through string templating in Javascript. Therefore, your Kibana link must have `${ variableName }` inserted in locations that you want to depend on parameter changes to `variableName`.

*  ` params ` are the Handlebars partials you want to be included as parameters for your graph. You don't need the `.handlebars` when listing the partials

*  ` default ` sets default values for variables you use in your Kibana link, and are altered by your parameters.

*  ` scripts ` is a list of Javascripts from the [parameters](/public/js/parameters) folder to include in this graph view. It is useful to break up your scripts for each parameter and only include ones needed in that graph view.

*  The `Elasticsearch Query` is the customized query used with the Elasticsearch Javascript API to populate the logs partial on the graph view.

### Writing a Graph Logs Query
The specific Elasticsearch logs queries for each graph are located in `"logs" --> "body"` in [data.json](/config/data.json). These should be able to be written like normal Elasticsearch queries, but consult with the Elasticsearch Javascript [API](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference-2-4.html). 

Parameters for the logs, such as `count` and `page` are appended as query strings to the AJAX request to `/api/logs/{graphName}`. Other parameters can be added, but their interaction with the query must be handled in [routes.js](/app/routes.js).

