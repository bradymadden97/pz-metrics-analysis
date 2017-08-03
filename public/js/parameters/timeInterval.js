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


var timeInterval_default = timeInterval;
var timeIntervalCustom = "2h";

document.getElementById("ti-" + timeInterval).classList.add("paramselected");

addClassListener(document.getElementsByClassName('ti'), 'click', timeintervalselect);
addClassListener(document.getElementsByClassName('ti-op'), 'click', function(){var t=this;customoptionselect(t, 'ti-op', 'ti');});
addClassListener(document.getElementsByClassName('custom'), 'click', customselect);

document.getElementById('ti-cancel-cust').addEventListener('click', function(){cancelcustom('ti');});
document.getElementById('ti-cust-options-input').addEventListener('blur', function(){customcombine('ti');});
