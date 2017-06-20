#!/bin/bash

`# Kibana URL:`
` # http://localhost:5601/app/kibana#/visualize/edit/workflowObjectCreation?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-7d,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(spy:(mode:(fill:!f,name:request)),vis:(colors:(Alert:%23BF1B00,Event:%237EB26D,EventType:%23584477,Trigger:%2365C5DB))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:timeStamp,interval:h,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:'auditData.action%3D!'createdAlert!'%20%26%26%20!'successfully%20created%20alert!''))),label:Alert),(input:(query:(query_string:(analyze_wildcard:!t,query:'auditData.action%3D!'createdTrigger!'%20%26%26%20!'successfully%20created%20trigger!''))),label:Trigger),(input:(query:(query_string:(analyze_wildcard:!t,query:'auditData.action%3D!'createdEvent!'%20%26%26%20!'successfully%20created%20event!''))),label:Event),(input:(query:(query_string:(analyze_wildcard:!t,query:'auditData.action%3D!'createdEventType%20%26%26%20!'successfully%20created%20eventType!''))),label:EventType))),schema:group,type:filters)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:9,scale:linear,setYExtents:!f,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:()),title:workflowObjectCreation,type:line))
`

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
