#!/bin/bash

TIME_RANGE_START=1497862138809 `#Enter range start time in epoch_millis here`
TIME_RANGE_END=1497905338809 `#Enter range end time in epoch_millis here`
INTERVAL="1h" `#Enter interval of timeStamp here`

curl -X POST localhost:9200/pzlogger5/LogData/_search?pretty -d'
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
              "AccessJob Attempts": {
                "query": {
                  "query_string": {
                    "query": "auditData.action='"relayedJobCreation"' && '"AccessJob"'",
                    "analyze_wildcard": true
                  }
                }
              },
              "AccessJob Success": {
                "query": {
                  "query_string": {
                    "query": "auditData.action='"accessData"' && '"Geoserver Deployment success"'",
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
'
