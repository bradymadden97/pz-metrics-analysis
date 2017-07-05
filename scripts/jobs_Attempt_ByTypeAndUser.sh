#!/bin/bash

# Copyright 2017, RadiantBlue Technologies, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

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
