#!/bin/bash

TIME_RANGE_START=1498509256958 `#Enter range start time in epoch_millis here`
TIME_RANGE_END=1498595656958 `#Enter range end time in epoch_millis here`

curl -X POST localhost:9200/pzlogger5/LogData/_search?pretty -d'
{
  "query": {
    "filtered": {
      "query": {
        "query_string": {
          "query": "auditData.action=\"relayedJobCreation\"",
          "analyze_wildcard": true
        }
      },
      "filter": {
        "bool": {
          "must": [
            {
              "range": {
                "timeStamp": {
                  "gte": '$TIME_RANGE_START',
                  "lte": '$TIME_RANGE_END',
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
  "aggs": {}
}
'

