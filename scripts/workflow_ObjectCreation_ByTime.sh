#!/bin/bash


TIME_RANGE_START=1497359650479 `#Enter range start time in epoch_millis here`
TIME_RANGE_END=1497964450479 `#Enter range end time in epoch_millis here`
INTERVAL="1h" `#Enter interval of timeStamp here`

curl -X POST localhost:9200/pzlogger5/LogData/_search?pretty -d'
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
              "Alert": {
                "query": {
                  "query_string": {
                    "query": "auditData.action='"createdAlert"' && '"successfully created alert"'",
                    "analyze_wildcard": true
                  }
                }
              },
              "Trigger": {
                "query": {
                  "query_string": {
                    "query": "auditData.action='"createdTrigger"' && '"successfully created trigger"'",
                    "analyze_wildcard": true
                  }
                }
              },
              "Event": {
                "query": {
                  "query_string": {
                    "query": "auditData.action='"createdEvent"' && '"successfully created event"'",
                    "analyze_wildcard": true
                  }
                }
              },
              "EventType": {
                "query": {
                  "query_string": {
                    "query": "auditData.action='"createdEventType"' && '"successfully created eventType"'",
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
