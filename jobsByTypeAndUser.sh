#!/bin/bash

`# Kibana URL:
http://localhost:5601/app/kibana#/visualize/edit/jobsbydateanduser?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-7d,mode:quick,to:now))&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,apply:!t,disabled:!f,index:pzlogger5,key:auditData.action,negate:!f,value:relayedJobCreation),query:(match:(auditData.action:(query:relayedJobCreation,type:phrase)))),('$state':(store:appState),meta:(alias:!n,apply:!t,disabled:!f,index:pzlogger5,key:auditData.actor,negate:!f,value:npetest008.gxaws.dev),query:(match:(auditData.actor:(query:npetest008.gxaws.dev,type:phrase))))),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(spy:(mode:(fill:!f,name:!n))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:AccessJob))),label:''),(input:(query:(query_string:(analyze_wildcard:!t,query:ExecuteServiceJob)))),(input:(query:(query_string:(analyze_wildcard:!t,query:IngestJob)))))),schema:segment,type:filters)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,spyPerPage:10,times:!(),yAxis:()),title:jobsbydateanduser,type:histogram))
`


USER="npetest008.gxaws.dev" `#Enter Actor here`
TIME_RANGE_START=1497295596832 `#Enter range start time in epoch_millis here`
TIME_RANGE_END=1497900396832 `#Enter range end time in epoch_millis here`

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
              "query": {
                "match": {
                  "auditData.action": {
                    "query": "relayedJobCreation",
                    "type": "phrase"
                  }
                }
              }
            },
            {
              "query": {
                "match": {
                  "auditData.actor": {
                    "query": "'$USER'",
                    "type": "phrase"
                  }
                }
              }
            },
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
      "filters": {
        "filters": {
          "AccessJob": {
            "query": {
              "query_string": {
                "query": "AccessJob",
                "analyze_wildcard": true
              }
            }
          },
          "ExecuteServiceJob": {
            "query": {
              "query_string": {
                "query": "ExecuteServiceJob",
                "analyze_wildcard": true
              }
            }
          },
          "IngestJob": {
            "query": {
              "query_string": {
                "query": "IngestJob",
                "analyze_wildcard": true
              }
            }
          }
        }
      }
    }
  }
}
'
