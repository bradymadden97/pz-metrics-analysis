# Pz-Metrics Docs

## Table of Contents
* [Using Dashboard](#using-dashboard)
    * [Requirements](#requirements)
    * [Setup Locally](#setup-locally)
        * [Environment Setup](#environment-setup)
        * [Dashboard Setup](#dashboard-setup)
    * [Run Locally](#run-locally)
    * [Use Dashboard](#use-dashboard)
* [Developing Dashboard](#developing-dashboard)
   * [Dashboard Overview](#dashboard-overview)
   * [Endpoints](#endpoints)
      * [View Endpoints](#view-endpoints)
      * [API Endpoints](#api-endpoints)


## Using Dashboard

### Requirements
- Kibana version `4.4.0`
- Elasticsearch version `2.2.0`
- Node.js version `4.2.6`


### Setup Locally

#### Environment Setup
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
      - Set in [config.json](/dashboard/config/config.json) file
    - Elasticsearch index and ES Javascript API version
      - Default: `pzlogger5` and version  `2.4`
      - Set in [config.json](dashboard/config/config.json) file
    - Kibana port
      - Default: `5601`
      - Written in each kibana link query in [data.json](/dashboard/config/data.json) file
    - Piazza space
      - Default: `int`
      - Set in [config.json](/dashboard/config/config.json) file under `authentication`
    - Dashboard port
      - Default: `8000`
      - Set in [config.json](/dashboard/config/config.json) file
      
#### Dashboard Setup
Use the [package.json](/dashboard/package.json) file to let [npm](https://www.npmjs.com/) manage dependencies. Enter the `dashboard` subdirectory and run ` npm install ` to install all the project dependencies.
      
### Run Locally
* Tunnel into Elasticsearch and point it at the port you specified in `kibana.yml` and the [config.json](/dashboard/config/config.json) file. 
* Start Kibana, which defaults to port `5601`, but should run on whatever port you specified in the query links in the [data.json](/dashboard/config/data.json) file.
* Enter the `dashboard` subdirectory of this repository and run `node app.js` which will start up the node server on the port you specified in [config.json](/dashboard/config/config.json).

### Use Dashboard
Pz-Metrics Dashboard has two main capabilities- view logs and view Kibana graphs of logs. 

To access the dashboard you will need a Piazza API key for the current Piazza `space` referred to above. After authenticating, you will stay authenticated for 30 minutes before needing to reauthenticate, and your API key will be saved for up to 30 days for quick reauthentication. 

Once you're authenticated, you can access various Kibana graphs that visualize specific Elasticsearch log queries. On a graph page, you can also view the specific logs associated with that graph by clicking `Logs` at the bottom of the page. In addition to viewing Kibana graphs, Dashboard also serves an updated stream of all the logs sorted by _most recent_.



## Developing Dashboard

### Dashboard Overview
The metrics dashboard lives inside the `dashboard` subdirectory. Resources outside the `dashboard` subdirectory are not used by the application and are mostly included for documentation, such as the `data` and `queries` subdirectories.

The `dashboard` directory structure is outlined below:
* **app**: 
   * [authenticate.js](/dashboard/app/authenticate.js) - Authenticates API key with Pz-gateway to allow access to Pz-metrics dashboard.
   * [routes.js](/dashboard/app/routes.js) - Functions behind each route for the dashboard server to pass data to the views.
* **config**:
   * [config.json](/dashboard/config/config.json) - Specifies port and space information. Can be altered to use environment variables instead in of a json in the future.
   * [data.json](/dashboard/config/data.json) - The data that dashboard uses to render specific graph and log queries. Each graph title is a key in the json file.
* **public**:
   * Holds the client-side javascript and css in respective subdirectories. 
   * Scripts for specific graph parameters, such as `timeInterval` or `timeRange` are located inside `../public/js/parameters`
* **views**:
   * Pz-metrics dashboard uses [handlebars.js](http://handlebarsjs.com/) to template its views.
   * Handlebars looks inside `../views/layouts` for the main template, called [main.handlebars](/dashboard/views/layouts/main.handlebars), and then inserts a template from `../views` inside the `{{{body}}}` tag.
   * The template is specified when the view is being rendered by [routes.js](/dashboard/app/routes.js).
   * Handlebars also supports partial templates, basically pieces inserted inside a larger view. Pz-metrics dashboard makes use of partials for the graph parameters, among other things. Based on parameters included in [data.json](/dashboard/config/data.json), the graph view can loop through the partials listed and include each parameter's partial.
   * This use of partials makes it simple to add new graphs and parameters without changing existing code.
* [**app.js**](/dashboard/app.js):
   * The main node server.
   
   
### Endpoints
The dashboard uses a REST structure to make it simple to access the data you seek. The current dashboard endpoints are as follows:

#### View Endpoints
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
         
         
#### API Endpoints     
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
