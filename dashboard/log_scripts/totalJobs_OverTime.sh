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


TIME_RANGE_START="now-7d" `#Enter range start here`
TIME_RANGE_END="now" `#Enter range end here`

curl localhost:9200/pzlogger5/LogData/_search?pretty -d'
{
	"query": {
		"bool": {
			"must": [
					{				
						"match": {
							"auditData.action": "relayedJobCreation"
						}
					},
					{
						"range": {
							"timeStamp": {
								"gte": "'$TIME_RANGE_START'",
								"lte": "'$TIME_RANGE_END'",
								"time_zone": "+04:00"
							}
						}
					}
			]
		}
	},
	"size": 20
}		
'
