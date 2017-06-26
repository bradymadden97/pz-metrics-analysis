#!/bin/bash

`# Kibana URL:
http://localhost:5601/app/kibana#/visualize/edit/ACCESS-per-hour-attempt-slash-success?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-12h,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(spy:(mode:(fill:!f,name:request)),vis:(colors:('AccessJob%20Attempts':%23F2C96D,'AccessJob%20Success':%23629E51,'auditData.action%3D!'accessData!'%20%26%26%20!'Geoserver%20Deployment%20successul!'':%23508642,'auditData.action%3D!'relayedJobCreation!'%20%26%26%20!'AccessJob!'':%23F2C96D))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:timeStamp,interval:h,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:'auditData.action%3D!'relayedJobCreation!'%20%26%26%20!'AccessJob!''))),label:'AccessJob%20Attempts'),(input:(query:(query_string:(analyze_wildcard:!t,query:'auditData.action%3D!'accessData!'%20%26%26%20!'Geoserver%20Deployment%20successul!''))),label:'AccessJob%20Success'))),schema:group,type:filters)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:grouped,scale:linear,setYExtents:!f,shareYAxis:!t,spyPerPage:10,times:!(),yAxis:()),title:'ACCESS%20per%20hour%20attempt%2Fsuccess',type:histogram))
`

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
                    "query": "auditData.action='"accessData"' && '"Geoserver Deployment successul"'",
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
