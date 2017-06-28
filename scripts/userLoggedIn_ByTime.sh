#!/bin/bash

TIME_RANGE_START=1498078699071 `#Enter range start time in epoch_millis here`
TIME_RANGE_END=1498683499071 `#Enter range end time in epoch_millis here`
INTERVAL="1h" `#Enter interval of timeStamp here`

{
  "query": {
    "filtered": {
      "query": {
        "query_string": {
          "query": "*",
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
  "aggs": {
    "2": {
      "date_histogram": {
        "field": "timeStamp",
        "interval": "'$INTERVAL'",
        "time_zone": "America/New_York",
        "min_doc_count": 1,
        "extended_bounds": {
          "min": '$TIME_RANGE_START',
          "max": '$TIME_RANGE_END'
        }
      },
      "aggs": {
        "3": {
          "filters": {
            "filters": {
              "User Logged In": {
                "query": {
                  "query_string": {
                    "query": "auditData.action='userLoggedIn'",
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
