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
