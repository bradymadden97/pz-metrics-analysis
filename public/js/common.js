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

function addClassListener(group, action, func){
	for(var i = 0; i < group.length; i++){
		group[i].addEventListener(action, func);
	}
};

function addClassToGroup(group, name){
	for(var i = 0; i < group.length; i++){
		group[i].classList.add(name);
	}
};

function removeClassFromGroup(group, name){
	for(var i = 0; i < group.length; i++){
		group[i].classList.remove(name);
	}
};

function toggleClassesGroup(group, class_rm, class_add){
	for(var i = 0; i < group.length; i++){
		toggleClasses(group[i], class_rm, class_add);
	}
};

function toggleClasses(element, class_rm, class_add){
	element.classList.remove(class_rm);
	element.classList.add(class_add);
};
