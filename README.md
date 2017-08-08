# Pz-Metrics
## Dashboard
The dashboard is a node tool used to view and edit components of pre-made Kibana graphs, as well as track Elasticsearch logs. Graph data and log queries are stored in the [data.json](/config/data.json) file.


## Queries
The queries section holds elasticsearch queries and kibana links for the graphs and logs shown in Dashboard. This allows for use of the same queries outside the Dashboard.



## Metrics
**accessJob_AttemptSuccess_ByTime** [\[elastic\]](queries/elastic/accessJob.sh) [\[kibana\]](queries/kibana/visualizationLinks.md#accessjob_attemptsuccess_bytime)
* Graph of Access Jobs initiated and Access Jobs successfully completed per unit time.

**executeServiceJob_AttemptSuccess_ByTime** [\[elastic\]](queries/elastic/executeServiceJob.sh) [\[kibana\]](queries/kibana/visualizationLinks.md#executeservicejob_attemptsuccess_bytime)
* Graph of ExecuteService Jobs initiated and ExecuteService Jobs successfully completed per unit time.

**ingestJob_AttemptSuccess_ByTime** [\[elastic\]](queries/elastic/ingestJob.sh) [\[kibana\]](queries/kibana/visualizationLinks.md#ingestjob_attemptsuccess_bytime)
* Graph of Ingest Jobs initiated and Ingest Jobs successfully completed per unit time.

**jobs_Attempt_ByTypeAndUser** [\[elastic\]](queries/elastic/jobAttempt_ByUser.sh) [\[kibana\]](queries/kibana/visualizationLinks.md#jobs_attempt_bytypeanduser)
* Graph of Access Jobs, ExecuteService Jobs and Ingest Jobs initiated by a user during a set time period.

**total_Jobs_OverTime** [\[elastic\]](queries/elastic/totalJobs_OverTime.sh) [\[kibana\]](queries/kibana/visualizationLinks.md#total_jobs_overtime)
* Simple numeric metric on total number of jobs over a period of time.

**userLoggedIn_ByTime** [\[elastic\]](queries/elastic/userAuthenticate.sh) [\[kibana\]](queries/kibana/visualizationLinks.md#userloggedin_bytime)
* Line graph of numbers of GeoAxis authorizations over a period of time.

**workflow_ObjectCreation_ByTime** [\[elastic\]](queries/elastic/workflowObjectCreation.sh) [\[kibana\]](queries/kibana/visualizationLinks.md#workflow_objectcreation_bytime)
* Line graph on number of Alerts, Events, EventTypes, and Triggers created per unit time over time.



## Documentation
Documentation for the dashboard can be found in [DOCS.md](DOCS.md).

