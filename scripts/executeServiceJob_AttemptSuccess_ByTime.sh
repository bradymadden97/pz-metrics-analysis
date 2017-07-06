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
