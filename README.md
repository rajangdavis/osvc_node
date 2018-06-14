# OSvCNode

A Node library for using the [Oracle Service Cloud REST API](https://docs.oracle.com/cloud/latest/servicecs_gs/CXSVC/) influenced by the [ConnectPHP API](http://documentation.custhelp.com/euf/assets/devdocs/november2016/Connect_PHP/Default.htm)

[![Maintainability](https://api.codeclimate.com/v1/badges/85f3765473ab32f49832/maintainability)](https://codeclimate.com/github/rajangdavis/osvc_node/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/85f3765473ab32f49832/test_coverage)](https://codeclimate.com/github/rajangdavis/osvc_node/test_coverage)
[![Build Status](https://travis-ci.org/rajangdavis/osvc_node.svg?branch=master)](https://travis-ci.org/rajangdavis/osvc_node)
[![npm version](https://badge.fury.io/js/osvc_node.svg)](https://badge.fury.io/js/osvc_node)
[![Known Vulnerabilities](https://snyk.io/test/github/rajangdavis/osvc_node/badge.svg)](https://snyk.io/test/github/rajangdavis/osvc_node)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frajangdavis%2Fosvc_node.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Frajangdavis%2Fosvc_node?ref=badge_shield)

## Installing Node (for Windows)
[This link has installation downloads for both Node and NPM.](https://nodejs.org/en/download/)

[This link has instructions for adding Node to your PATH.](https://stackoverflow.com/a/8768567/2548452)

[Make sure to install Windows Build Tools if you are using Windows 10.](https://github.com/nodejs/node-gyp/issues/307#issuecomment-250912623) This is not something necessarily needed to run this package, but it will help with Node development on Windows in general.

## Installation

Install with npm:

    $ npm install osvc_node -g

## Compatibility

The library is tested against Oracle Service Cloud 18A using Node v8.9.1

All of the HTTP methods should work on any version of Oracle Service Cloud since version May 2015; however, there maybe some issues with querying items on any version before May 2016. This is because ROQL queries were not exposed via the REST API until May 2016.

## Basic Usage
The basic formula for this library is the following:
	
	<require library or specific modules from library> - This specifies which parts of the library you want to use
	<require other node libraries> - You can use other node packages with this library

	<create a client> - This specifies which site to connect, what type of authentication will use, and which version of CCOM should be used

	<create an options object> - This specifies which URL to use, what kind of data needs to be sent up, and sets option headers

	<module to run>(options).then(data => {
		If there is a success, do something here;
	}).catch(error => {
		If there is a error, do something here;
	})

The basic features that work to date are as follows:

1. [HTTP Methods](#http-methods)
	1. [Create => Post](#post)
	2. [Read => Get](#get)
	3. [Update => Patch](#patch)
	4. [Destroy => Delete](#delete)
	4. [Options](#options)
2. Running ROQL queries [either 1 at a time](#oscnodequeryresults-example) or [multiple queries in a set](#oscnodequeryresultsset-example)
3. [Running Reports](#oscnodeanalyticsreportsresults)
<!-- 4. [Optional Settings](#optional-settings) -->

Here are the _spicier_ (more advanced) featuress:

1. [Bulk Delete](#bulk-delete)
<!-- 2. [Running multiple ROQL Queries in parallel](#running-multiple-roql-queries-in-parallel) -->
2. [Performing Session Authentication](#performing-session-authentication)

## Authentication:

An OSvCNode.Client class lets the library know which credentials and interface to use for interacting with the Oracle Service Cloud REST API.
This is helpful if you need to interact with multiple interfaces or set different headers for different objects.

```node

// Configuration is as simple as requiring the package
// and passing in an object

const {Client} = require('osvc_node');

// Configuration Client
var rnClient = Client({
	
	// Interace to connect with 
	interface: env['OSC_SITE'],
	
	// Basic Authentication
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],

	// Session Authentication
	// session: <session ID>,

	// OAuth Token Authentication
	// oauth: <oauth token>,

	// Optional Client Settings
	demo_site: true,			// Changes domain from 'custhelp' to 'rightnowdemo'
	version: 'v1.4',	 		// Changes REST API version, default is 'v1.3'
	no_ssl_verify: true,				// Turns off SSL verification
	suppress_rules: true			// Supresses Business Rules
});


```
## Performing Session Authentication

1. Create a custom script with the following code and place in the "Custom Scripts" folder in the File Manager:

```php
<?php

// Find our position in the file tree
if (!defined('DOCROOT')) {
$docroot = get_cfg_var('doc_root');
define('DOCROOT', $docroot);
}
 
/************* Agent Authentication ***************/
 
// Set up and call the AgentAuthenticator
require_once (DOCROOT . '/include/services/AgentAuthenticator.phph');

// get username and password
$username = $_GET['username'];
$password = $_GET['password'];
 
// On failure, this includes the Access Denied page and then exits,
// preventing the rest of the page from running.
echo json_encode(AgentAuthenticator::authenticateCredentials($username,$password));

```
2. Create a node script similar to the following and it should connect:

```node
// Require necessary libraries
const {Client, Connect} = require('osvc_node');
const axios = require('axios');
const env = process.env;

// Create an asynchronous function to grab the session data
const fetchSessionId = async () =>{
	try{
		let result = await axios.get(`https://${env['OSC_SITE']}.custhelp.com/cgi-bin/${env['OSC_CONFIG']}.cfg/php/custom/login_test.php?username=${env['OSC_ADMIN']}&password=${env['OSC_PASSWORD']}`);
		return result.data.session_id;
	}catch(err){
		console.log(err);
		return;
	}
}

// Create an asynchronous function to make a get request for the URL that you wish to fetch data from
const getRequest = async (url) => {
	let finalUrl = url == undefined ? '' : url;
	let sessionID = await fetchSessionId();
	let options = {
		client: new Client({
			session: sessionID,
			interface: env['OSC_SITE'],
			url: finalUrl 
		}),
	};
	return await Connect.get(options);
}

// Run the function; it will return a promise based on whether the connection worked or not
getRequest('incidents').then( data=>{
	console.log(data);
}).catch( err=>{
	console.log(err);
})

```
## HTTP Methods

To use various HTTP Methods to return raw response objects, use the "Connect" object

### POST
```node
//// OSvCNode.Connect.post(options)
//// returns a Promise

// Here's how you could create a new ServiceProduct object
// using Node variables and objects (sort of like JSON)

const {Client, Connect} = require('osvc_node');
const env = process.env;

// Create an OSvCNode.Client object
var rnClient = Client({
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
	client: rnClient,
	url:'serviceProducts',
	json: newProduct
}

Connect.post(options).then((res)=>{
	console.log(res)
}).catch(function (error) {
	console.log(error);
});

```

### GET
```node
//// OSvCNode.Connect.get(options)
//// returns a Promise
// Here's how you could get an instance of ServiceProducts

const {Client, Connect} = require('osvc_node');
const env = process.env;

// Create an OSvCNode.Client object
var rnClient = Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});

var options = {
	client: rnClient,
	url:'serviceProducts/168'
};

Connect.get(options).then((res)=>{
	console.log(res)
}).catch(function (error) {
	console.log(error);
});
```

### PATCH
```node
//// OSvCNode.Connect.patch(options)
//// returns callback
// Here's how you could update an Answer object
// using JSON objects
// to set field information

const {Client, Connect} = require('osvc_node');
const env = process.env;

// Create an OSvCNode.Client object
var rnClient = Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});

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

var patchOptions = {
	client: rnClient,
	url:'serviceProducts/170',
	json: productUpdated
}

Connect.patch(patchOptions).then((res)=>{
	console.log(res)
}).catch(function (error) {
	console.log(error);
});


```

### DELETE
```node
//// OSvCNode.Connect.delete(options)
//// returns callback
// Here's how you could delete a serviceProduct object

const {Client, Connect} = require('osvc_node');
const env = process.env;

// Create an OSvCNode.Client object
var rnClient = Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});


var deleteOptions = {
 	client: rnClient,
 	url: "incidents/24922"
}

Connect.delete(deleteOptions).then((res)=>{
 	console.log(res)
}).catch(function (error) {
 	console.log(error);
});

```
### OPTIONS
```node
//// OSvCNode.Connect.options(options)
//// returns headers or a raw Response object on error
// Here's how you can fetch options for incidents

const {Client, Connect} = require('osvc_node');
const env = process.env;

// Create an OSvCNode.Client object
var rnClient = Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});


var checkOptions = {
 	client: rnClient,
 	url: "incidents"
}

Connect.options(checkOptions).then((res)=>{
 	console.log(res)
}).catch(function (error) {
 	console.log(error);
});

```


## OSvCNode.QueryResults example

This is for running one ROQL query. Whatever is allowed by the REST API (limits and sorting) is allowed with this library.

OSvCNode.QueryResults only has one function: 'query', which takes an OSvCNode.Client object and string query (example below).

```node
const {Client, QueryResults} = require('osvc_node');
const env = process.env;

var rnClient = Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
});

var options = {
	client: rnClient,
	query: `DESCRIBE CONTACTS`
}

QueryResults.query(options).then(data =>{
	console.log(data)
}).catch(err => {
	console.log(err);
});


```
## OSvCNode.QueryResultsSet example

This is for running multiple queries and assigning the results of each query to a key for further manipulation.

OSvCNode.QueryResultsSet only has one function: 'query_set', which takes an OSvCNode.Client object and multiple query hashes (example below).

```node
// Pass in each query into a hash
	// set query: to the query you want to execute
	// set key: to the value you want the results to of the query to be referenced to

const { Client, QueryResultsSet } = require('osvc_node');
const env = process.env;

var rnClient = Client({
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
	client: rnClient,
	queries: multipleQueries
}

QueryResultsSet.query_set(options).then(data=>{ 
	console.log(data.answerSchema);
	console.log(data.answers);
	console.log(data.categoriesSchema);
	console.log(data.categories);
	console.log(data.productsSchema);
	console.log(data.products);
})

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

Pass in the 'id', 'lookupName', and 'filters' in the options data object to set the report and any filters. 
```node
const {Client, AnalyticsReportResults} = require('osvc_node');
const env = process.env;

var rnClient = Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
});

var options = {
	client: rnClient,
	json: {id: 176, limit: 1, filters:[{ name: "search_ex", values: ['returns']}]},
}

AnalyticsReportResults.run(options).then((results) => {
	results.map((result)=>{
		console.log(`Columns: ${Object.keys(result).join(", ")}`);
		console.log(`Values: ${Object.values(result).join(", ")}`);
	})
}).catch((error)=>{
	console.log(error);
})

```

## Bulk Delete
This library makes it easy to use the Bulk Delete feature within the latest versions of the REST API. 

You can either use a QueryResults or QueryResultsSet object in order to run bulk delete queries.

Before you can use this feature, make sure that you have the [correct permissions set up for your profile](https://docs.oracle.com/en/cloud/saas/service/18b/cxsvc/c_osvc_bulk_delete.html#BulkDelete-10689704__concept-212-37785F91).

Here is an example of the how to use the Bulk Delete feature: 
```node
const {Client, QueryResults} = require('osvc_node');
const env = process.env;

var rnClient = Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	version: "latest"
});

var options = {
	client: rnClient,
	query: `DELETE FROM INCIDENTS LIMIT 10`,
	annotation: "Delete example"
}

QueryResults.query(options).then(data =>{
	console.log(data)
}).catch(err => {
	console.log(err);
});
```


<!-- ## Running multiple ROQL Queries in parallel
Instead of running multiple queries in with 1 GET request, you can run multiple GET requests and combine the results

	$ osvc-rest query --parallel "SELECT * FROM INCIDENTS LIMIT 20000" "SELECT * FROM INCIDENTS Limit 20000 OFFSET 20000" "SELECT * FROM INCIDENTS Limit 20000 OFFSET 40000" "SELECT * FROM INCIDENTS Limit 20000 OFFSET 60000" "SELECT * FROM INCIDENTS Limit 20000 OFFSET 80000" -u $OSC_ADMIN -p $OSC_PASSWORD -i $OSC_SITE -v latest -a "Fetching a ton of incidents info" -->


<!-- ## Optional Settings:
	access-token (string) 	Adds an access token to ensure quality of service
	demosite              	Change the domain from 'custhelp' to 'rightnowdemo'
	
	annotate (string)     	Adds a custom header that adds an annotation (CCOM version must be set to "v1.4" or "latest"); limited to 40 characters
	debug                 	Prints request headers for debugging
	exclude-null          	Adds a custom header to excludes null from results
	next-request (int)      	Number of milliseconds before another HTTP request can be made; this is an anti-DDoS measure
	no-ssl-verify         	Turns off SSL verification
	schema                	Sets 'Accept' header to 'application/schema+json'
	suppress-rules        	Adds a header to suppress business rules
	utc-time              	Adds a custom header to return results using Coordinated Universal Time (UTC) format for time (Supported on November 2016+)
	version (string)      	Changes the CCOM version (default "v1.3")
 -->
## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frajangdavis%2Fosvc_node.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Frajangdavis%2Fosvc_node?ref=badge_large)