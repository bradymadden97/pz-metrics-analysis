/*
// Copyright 2017, RadiantBlue Technologies, Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
*/


var timeRange_default = timeRange;
document.getElementById("tr-" + timeRange).classList.add("paramselected");

addClassListener(document.getElementsByClassName('tr'), 'click', timerangeselect);
addClassListener(document.getElementsByClassName('tr-op'), 'click', function(){var t=this;customoptionselect(t, 'tr-op', 'tr');});
addClassListener(document.getElementsByClassName('custom'), 'click', customselect);

document.getElementById('tr-cancel-cust').addEventListener('click', function(){cancelcustom('tr');}); 
document.getElementById('tr-cust-options-input').addEventListener('blur', function(){customcombine('tr');});
