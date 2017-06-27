# pz-metrics-analysis
## Dashboard
The dashboard is a node tool used to view and edit components of pre-made Kibana graphs. Graph data is stored in the [graph_data.json](dashboard/graph_data.json) file, and Kibana queries are edited using string templating.



## Data
The data section includes analysis about runtimes of asynchronous vs. synchronous logging in [pz-workflow](https://github.com/venicegeo/pz-workflow).



## Scripts
The scripts section holds elastic search queries for the Kibana graphs shown in Dashboard. This allows the same data to be accessed through the terminal in JSON format.



## Metrics
[accessJob_AttemptSuccess_ByTime](scripts/accessJob_AttemptSuccess_ByTime.sh):
* Graph of Access Jobs initiated and Access Jobs successfully completed per unit time.

[ingestJob_AttemptSuccess_ByTime](scripts/ingestJob_AttemptSuccess_ByTime.sh):
* Graph of Ingest Jobs initiated and Ingest Jobs successfully completed per unit time.

[jobs_Attempt_ByTypeAndUser](scripts/jobs_Attempt_ByTypeAndUser.sh):
* Graph of Access Jobs, ExecuteService Jobs and Ingest Jobs initiated by a user during a set time period.

[pz-workflow_AsyncLogging_Analysis](data/pz-workflow_AsyncLogging_Analysis.md):
* Data on logging runtime when executed synchronously vs. asynchronously in pz-workflow.

[workflow_ObjectCreation_ByTime](scripts/workflow_ObjectCreation_ByTime.sh):
* Line graph on number of Alerts, Events, EventTypes, and Triggers created per unit time over time.
