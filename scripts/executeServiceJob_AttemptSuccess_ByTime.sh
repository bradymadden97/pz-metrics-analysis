#!/bin/bash

TIME_RANGE_START=1498660277088 `#Enter range start time in epoch_millis here`
TIME_RANGE_END=1498663877088 `#Enter range end tiem in epoch_millis here`
INTERVAL="1h" `#Enter interval of timeStamp here`

{
  "query": {
    "filtered": {
      "query": {
        "query_string": {
          "analyze_wildcard": true,
          "query": "*"
        }
      },
      "filter": {
        "bool": {
          "must": [
            {
              "range": {
                "timeStamp": {
                  "gte":'$TIME_RANGE_START',
                  "lte":'$TIME_RANGE_END',
                  "format": "epoch_millis"
                }
              }
            }
          ],
          "must_not": []
        }
      }
    }
  },
  "size": 0,
  "aggs": {
    "2": {
      "date_histogram": {
        "field": "timeStamp",
        "interval":"'$INTERVAL'",
        "time_zone": "America/New_York",
        "min_doc_count": 1,
        "extended_bounds": {
          "min":'$TIME_RANGE_START',
          "max":'$TIME_RANGE_END'
        }
      },
      "aggs": {
        "3": {
          "filters": {
            "filters": {
              "ExecuteServiceJob Attempts": {
                "query": {
                  "query_string": {
                    "query": "auditData.action='executeService'",
                    "analyze_wildcard": true
                  }
                }
              },
              "ExecuteServiceJob Success": {
                "query": {
                  "query_string": {
                    "query": "auditData.action='executeServiceWorkflowEventCreated'",
                    "analyze_wildcard": true
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
