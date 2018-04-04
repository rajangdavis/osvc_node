# OSvCNode

[![Maintainability](https://api.codeclimate.com/v1/badges/85f3765473ab32f49832/maintainability)](https://codeclimate.com/github/rajangdavis/osvc_node/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/85f3765473ab32f49832/test_coverage)](https://codeclimate.com/github/rajangdavis/osvc_node/test_coverage)
[![Build Status](https://travis-ci.org/rajangdavis/osvc_node.svg?branch=master)](https://travis-ci.org/rajangdavis/osvc_node)
[![npm version](https://badge.fury.io/js/osvc_node.svg)](https://badge.fury.io/js/osvc_node)
[![Known Vulnerabilities](https://snyk.io/test/github/rajangdavis/osvc_node/badge.svg)](https://snyk.io/test/github/rajangdavis/osvc_node)

An (under development) Node library for using the [Oracle Service Cloud REST API](https://docs.oracle.com/cloud/latest/servicecs_gs/CXSVC/) influenced by the [ConnectPHP API](http://documentation.custhelp.com/euf/assets/devdocs/november2016/Connect_PHP/Default.htm)

## Todo
I am looking to implement the following items soon:
1. Convenience Methods for Analytics Filters and Date Time
2. Test suite (in progress)
3. Documentation


## Compatibility

The library is being tested against Oracle Service Cloud May 2017 using Node v8.2.1

All of the HTTP methods should work on any version of Oracle Service Cloud since version May 2015; however, there maybe some issues with querying items on any version before May 2016. This is because ROQL queries were not exposed via the REST API until May 2016.


## Use Cases
You can use this Node Library for basic scripting and microservices.

The main features that work to date are as follows:

1. [Simple configuration](#client-configuration)
2. Running ROQL queries [either 1 at a time](#oscnodequeryresults-example) or [multiple queries in a set](#oscnodequeryresultsset-example)
3. [Running Reports](#oscnodeanalyticsreportsresults)
<!-- 4. Convenience methods for Analytics filters and setting dates
	1. ['arrf', an analytics report results filter](#arrf--analytics-report-results-filter)
	2. ['dti', converts a date string to ISO8601 format](#dti--date-to-iso8601) -->
4. Basic CRUD Operations via HTTP Methods
	1. [Create => Post](#create)
	2. [Read => Get](#read)
	3. [Update => Patch](#update)
	4. [Destroy => Delete](#delete)

## Installing Node (for Windows)
[This link has installation downloads for both Node and NPM.](https://nodejs.org/en/download/)

[This link has instructions for adding Node to your PATH.](https://stackoverflow.com/a/8768567/2548452)

[Make sure to install Windows Build Tools if you are using Windows 10.](https://github.com/nodejs/node-gyp/issues/307#issuecomment-250912623) This is not something necessarily needed to run this package, but it will help with Node development on Windows in general.

## Installation

Install with npm:

    $ npm install osvc_node -g


## Client Configuration

An OSvCNode.Client class lets the library know which credentials and interface to use for interacting with the Oracle Service Cloud REST API.
This is helpful if you need to interact with multiple interfaces or set different headers for different objects.

```node

// Configuration is as simple as requiring the package
// and passing in an object

const OSvCNode = require('osvc_node');

// Configuration Client
var rn_client = OSvCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],

	// Optional Configuration Settings
	demo_site: true,			// Changes domain from 'custhelp' to 'rightnowdemo'
	change_version: 'v1.4', 		// Changes REST API version, default is 'v1.3'
	ssl_off: true,				// Turns off SSL verification
	suppress_rules: true			// Supresses Business Rules
});


```

## OSvCNode.QueryResults example

This is for running one ROQL query. Whatever is allowed by the REST API (limits and sorting) is allowed with this library.

OSvCNode.QueryResults only has one function: 'query', which takes an OSvCNode.Client object and string query (example below).

```node
const OSvCNode = require('osvc_node');
const env = process.env;

var rn_client = OSvCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site:true
});

var contactsQuery = `DESCRIBE`

var options = {
	client: rn_client,
	query: contactsQuery
}

OSvCNode.QueryResults.query(options,(err,results) =>{
	results.map(function(result){
		console.log(result);
	})
});


```


## OSvCNode.QueryResultsSet example

This is for running multiple queries and assigning the results of each query to a key for further manipulation.

OSvCNode.QueryResultsSet only has one function: 'query_set', which takes an OSvCNode.Client object and multiple query hashes (example below).

```node
// Pass in each query into a hash
	// set query: to the query you want to execute
	// set key: to the value you want the results to of the query to be referenced to

const OSvCNode = require('osvc_node');
const env = process.env;

var rn_client = OSvCNode.Client({
  username: env['OSC_ADMIN'],
  password: env['OSC_PASSWORD'],
  interface: env['OSC_SITE'],
});

var multipleQueries = [
	{
		query:"DESCRIBE ANSWERS",
		key: "answerSchema"
	},
 	{
 		query:"SELECT * FROM ANSWERS LIMIT 1",
 		key: "answers"
 	},
 	{
 		query:"DESCRIBE SERVICECATEGORIES",
 		key: "categoriesSchema"
 	},
 	{
 		query:"SELECT * FROM SERVICECATEGORIES",
 		key:"categories"
 	},
 	{
 		query:"DESCRIBE SERVICEPRODUCTS",
 		key: "productsSchema"
 	},
 	{
 		query:"SELECT * FROM SERVICEPRODUCTS",
 		key:"products"
 	}
];
					 
var options = {
	client: rn_client,
	queries: multipleQueries
}

OSvCNode.QueryResultsSet.query_set(options,(err, data) =>{
	console.log(data.answerSchema);
	console.log(data.answers);
	console.log(data.categoriesSchema);
	console.log(data.categories);
	console.log(data.productsSchema);
	console.log(data.products);
});

//  Results for "DESCRIBE ANSWERS"
// 
//  [
//   {
//     "Name": "id",
//     "Type": "Integer",
//     "Path": ""
//   },
//   {
//     "Name": "lookupName",
//     "Type": "String",
//     "Path": ""
//   },
//   {
//     "Name": "createdTime",
//     "Type": "String",
//     "Path": ""
//   }
//   ... everything else including customfields and objects...
// ]

//  Results for "SELECT * FROM ANSWERS LIMIT 1"
// 
//  [
//   {
//     "id": 1,
//     "lookupName": 1,
//     "createdTime": "2016-03-04T18:25:50Z",
//     "updatedTime": "2016-09-12T17:12:14Z",
//     "accessLevels": 1,
//     "adminLastAccessTime": "2016-03-04T18:25:50Z",
//     "answerType": 1,
//     "expiresDate": null,
//     "guidedAssistance": null,
//     "keywords": null,
//     "language": 1,
//     "lastAccessTime": "2016-03-04T18:25:50Z",
//     "lastNotificationTime": null,
//     "name": 1,
//     "nextNotificationTime": null,
//     "originalReferenceNumber": null,
//     "positionInList": 1,
//     "publishOnDate": null,
//     "question": null,
//     "solution": "<HTML SOLUTION WITH INLINE CSS>",
//     "summary": "SPRING IS ALMOST HERE!",
//     "updatedByAccount": 16,
//     "uRL": null
//   }
// ]

//  Results for "DESCRIBE SERVICECATEGORIES"
//  
// [
// ... skipping the first few ... 
//  {
//     "Name": "adminVisibleInterfaces",
//     "Type": "SubTable",
//     "Path": "serviceCategories.adminVisibleInterfaces"
//   },
//   {
//     "Name": "descriptions",
//     "Type": "SubTable",
//     "Path": "serviceCategories.descriptions"
//   },
//   {
//     "Name": "displayOrder",
//     "Type": "Integer",
//     "Path": ""
//   },
//   {
//     "Name": "endUserVisibleInterfaces",
//     "Type": "SubTable",
//     "Path": "serviceCategories.endUserVisibleInterfaces"
//   },
//   ... everything else include parents and children ...
// ]


//  Results for "SELECT * FROM SERVICECATEGORIES"
// 
//  [
//   {
//     "id": 3,
//     "lookupName": "Manuals",
//     "createdTime": null,
//     "updatedTime": null,
//     "displayOrder": 3,
//     "name": "Manuals",
//     "parent": 60
//   },
//   {
//     "id": 4,
//     "lookupName": "Installations",
//     "createdTime": null,
//     "updatedTime": null,
//     "displayOrder": 4,
//     "name": "Installations",
//     "parent": 60
//   },
//   {
//     "id": 5,
//     "lookupName": "Downloads",
//     "createdTime": null,
//     "updatedTime": null,
//     "displayOrder": 2,
//     "name": "Downloads",
//     "parent": 60
//   },
//   ... you should get the idea by now ...
// ]

```

## OSvCNode.AnalyticsReportsResults

You can create a new instance either by the report 'id' or 'lookupName'.

OSvCNode.AnalyticsReportsResults only has one function: 'run', which takes an OSvCNode.Client object.

OSvCNode.AnalyticsReportsResults have the following properties: 'id', 'lookupName', and 'filters'. <!-- More on filters and supported datetime methods are below this OSvCNode.AnalyticsReportsResults example script. -->
```node
const OSvCNode = require('osvc_node');
const env = process.env;

var rn_client = OSvCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
});

var options = {
	client: rn_client,
	id: 176
}

OSvCNode.AnalyticsReportResults.run(options,(err,data) =>{
	data.map((res)=>{
		console.log(`Columns: ${res.keys.join(',')}`);
		console.log(`Values: ${res.values.join(',')}`);
	})
})

```

<!-- 
### 'dti' => date to iso8601

dti lets you type in a date and get it in ISO8601 format. Explicit date formatting is best.

```node

dti("January 1st, 2014") # => 2014-01-01T00:00:00-08:00  # => 1200 AM, January First of 2014

dti("January 1st, 2014 11:59PM MDT") # => 2014-01-01T23:59:00-06:00 # => 11:59 PM Mountain Time, January First of 2014

dti("January 1st, 2014 23:59 PDT") # => 2014-01-01T23:59:00-07:00 # => 11:59 PM Pacific Time, January First of 2014

dti("January 1st") # => 2017-01-01T00:00:00-08:00 # => 12:00 AM, January First of this Year

```
 -->

## Basic CRUD operations

### CREATE
```node
//// OSvCNode.Connect.post(options, callback)
//// returns callback function

// Here's how you could create a new ServiceProduct object
// using Node variables and objects (sort of like JSON)

const OSvCNode = require('osvc_node');
const env = process.env;

// Create an OSvCNode.Client object
var rn_client = OSvCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});


// JSON object
// containing data
// for creating
// a new product 

var newProduct = {
  'names': [{
    'labelText': 'newProduct',
    'language': {
      'id': 1
    }
  }],
  'displayOrder': 4,
  'adminVisibleInterfaces': [{
    'id': 1
  }],
  'endUserVisibleInterfaces': [{
    'id': 1
  }]
};

var options = {
	client: rn_client,
	    url:'serviceProducts',
	json: newProduct
}

OSvCNode.Connect.post(options,(err,body,response) => {
	if(err){
		console.log(err);
	}else{
		console.log(response.statusCode); // 201
		console.log(JSON.stringify(body, null, 4)); // JSON representation
		// Do something here
		return body; // Callback
	}
});

```






### READ
```node
//// OSvCNode.Connect.get(options, callback)
//// returns callback function
// Here's how you could get an instance of ServiceProducts

const OSvCNode = require('osvc_node');
const env = process.env;

// Create an OSvCNode.Client object
var rn_client = OSvCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});

var options = {
	client: rn_client,
	url:'serviceProducts/168'
};

OSvCNode.Connect.get(options,(err,body,response) => {
	if(err){
		console.log(err);
	}else{
		console.log(response.statusCode); // 201
		console.log(JSON.stringify(body, null, 4)); // JSON representation
		return body;
	}
});
```






### UPDATE
```node
//// OSvCNode.Connect.patch(options, callback)
//// returns callback
// Here's how you could update an Answer object
// using JSON objects
// to set field information

// JSON Object
// With data for updating
var productUpdated = {
  'name': [{
    'labelText': 'newProduct UPDATED',
    'language': {
      'id': 1
    }
  }]
};


var options = {
	client: rn_client,
	url:'serviceProducts/170',
	json: productUpdated
}

OSvCNode.Connect.patch(options,(err,body,response) => {
	if(err){
		console.log(err);
	}else{
		console.log(response.statusCode); // 201
		console.log(body); // empty
		return body;
	}
});


```


 
### DELETE
```node
//// OSvCNode.Connect.delete(options, callback)
//// returns callback
// Here's how you could delete a serviceProduct object

 	var options = { 
		client: rn_client,
 	 	url:'serviceProducts/169'
 	}
  
	OSvCNode.Connect.delete(options,(err,body,response) => {
		if(err){
			console.log(err);
		}else{
			console.log(response.statusCode); // 200
			console.log(body); // Empty
			return body;
		}
	});

```