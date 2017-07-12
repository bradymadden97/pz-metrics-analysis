# pz-metrics-analysis
## Dashboard
The dashboard is a node tool used to view and edit components of pre-made Kibana graphs. Graph data is stored in the [data.json](dashboard/data.json) file, and Kibana queries are edited using string templating.



## Data
The data section includes analysis about runtimes of asynchronous vs. synchronous logging in [pz-workflow](https://github.com/venicegeo/pz-workflow).



## Queries
The queries section holds elasticsearch queries and kibana links for the graphs and logs shown in Dashboard. This allows for use of the same queries outside the Dashboard.



## Metrics
**accessJob_AttemptSuccess_ByTime** [\[elastic\]](queries/elastic/accessJob.sh) [\[kibana\]](queries/kibana/visualizationLinks.md)
* Graph of Access Jobs initiated and Access Jobs successfully completed per unit time.

**executeServiceJob_AttemptSuccess_ByTime** [\[elastic\]](queries/elastic/executeServiceJob.sh) [\[kibana\]](queries/kibana/visualizationLinks.md)
* Graph of ExecuteService Jobs initiated and ExecuteService Jobs successfully completed per unit time.

**ingestJob_AttemptSuccess_ByTime** [\[elastic\]](queries/elastic/ingestJob.sh) [\[kibana\]](queries/kibana/visualizationLinks.md)
* Graph of Ingest Jobs initiated and Ingest Jobs successfully completed per unit time.

**jobs_Attempt_ByTypeAndUser** [\[elastic\]](queries/elastic/jobAttempt_ByUser.sh) [\[kibana\]](queries/kibana/visualizationLinks.md)
* Graph of Access Jobs, ExecuteService Jobs and Ingest Jobs initiated by a user during a set time period.

**pz-workflow_AsyncLogging_Analysis** [\[data\]](data/pz-workflow_AsyncLogging_Analysis.md)
* Data on logging runtime when executed synchronously vs. asynchronously in pz-workflow.

**total_Jobs_OverTime** [\[elastic\]](queries/elastic/totalJobs_OverTime.sh) [\[kibana\]](queries/kibana/visualizationLinks.md)
* Simple numeric metric on total number of jobs over a period of time.

**userLoggedIn_ByTime** [\[elastic\]](queries/elastic/userLoggedIn.sh) [\[kibana\]](queries/kibana/visualizationLinks.md)
* Line graph of numbers of GeoAxis authorizations over a period of time.

**workflow_ObjectCreation_ByTime** [\[elastic\]](queries/elastic/workflowObjectCreation.sh) [\[kibana\]](queries/kibana/visualizationLinks.md)
* Line graph on number of Alerts, Events, EventTypes, and Triggers created per unit time over time.



## Run Dashboard Locally
1) `cd dashboard` and `npm install`

2) Point Elasticsearch to port `9200` and Kibana to port `5601`

3) Run `node app.js` and view at `localhost:8000`


