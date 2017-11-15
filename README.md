# OSCNode

[![Maintainability](https://api.codeclimate.com/v1/badges/8b1c155f9d02491e656b/maintainability)](https://codeclimate.com/github/rajangdavis/osc_node/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8b1c155f9d02491e656b/test_coverage)](https://codeclimate.com/github/rajangdavis/osc_node/test_coverage)
[![Build Status](https://travis-ci.org/rajangdavis/osc_node.svg?branch=master)](https://travis-ci.org/rajangdavis/osc_node)
[![Known Vulnerabilities](https://snyk.io/test/github/rajangdavis/osc_node/badge.svg)](https://snyk.io/test/github/rajangdavis/osc_node)

An (under development) Node library for using the [Oracle Service Cloud REST API](https://docs.oracle.com/cloud/latest/servicecs_gs/CXSVC/) influenced by the [ConnectPHP API](http://documentation.custhelp.com/euf/assets/devdocs/november2016/Connect_PHP/Default.htm)

## Todo
I am looking to implement the following items soon:
1. OSCNode.QueryResultsSet, an object for performing multiple ROQL queries
2. OSCNode.AnalyticsReportResults, an object for running Analytics Reports
3. Convenience Methods for Analytics Filters and Date Time
4. Test suite (in progress)
5. Documentation


## Compatibility

The library is being tested against Oracle Service Cloud May 2017 using Node v8.2.1

TravisCI to be set up soon!

All of the HTTP methods should work on any version of Oracle Service Cloud since version May 2015; however, there maybe some issues with querying items on any version before May 2016. This is because ROQL queries were not exposed via the REST API until May 2016.


## Use Cases
You can use this Node Library for basic scripting and microservices. 

# Please use this as a server side library *only*.
While it is theoretically possible to utilize this library in a browser, it is not recommended as a matter of security.

The main features that work to date are as follows:

1. [Simple configuration](#client-configuration)
2. Basic CRUD Operations via HTTP Methods
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

    $ npm install osc_node -g


## Client Configuration

An OSCNodeClient class lets the library know which credentials and interface to use for interacting with the Oracle Service Cloud REST API.
This is helpful if you need to interact with multiple interfaces or set different headers for different objects.

```node

// Configuration is as simple as requiring the package
// and passing in an object

const OSCNode = require('osc_node');

# Configuration Client
var rn_client = OSCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],

	// Optional Configuration Settings
	demo_site: true,			// Changes domain from 'custhelp' to 'rightnowdemo'

	// STILL TO BE IMPLEMENTED
	// change_version: 'v1.4', 		// Changes REST API version, default is 'v1.3'
	// ssl_off: true,			// Turns off SSL verification
	// suppress_rules: true			// Supresses Business Rules
});


```

## OSCNodeQueryResults example

This is for running one ROQL query. Whatever is allowed by the REST API (limits and sorting) is allowed with this library.

OSCNodeQueryResults only has one function: 'query', which takes an OSCNodeClient object and string query (example below).

```node
const OSCNode = require('osc_node');
const env = process.env;

var rn_client = OSCNode.Client({
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

OSCNode.QueryResults.query(options,(err,results) =>{
	results.map(function(result){
		console.log(result);
	})
});


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
//// OSCNode.Connect.post(options, callback)
//// returns callback function

// Here's how you could create a new ServiceProduct object
// using Node variables and objects (sort of like JSON)

const OSCNode = require('osc_node');
const env = process.env;

// Create an OSCNode.Client object
var rn_client = OSCNode.Client({
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

OSCNode.Connect.post(options,(err,body,response) => {
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
//// OSCNode.Connect.get(options, callback)
//// returns callback function
// Here's how you could get an instance of ServiceProducts

const OSCNode = require('osc_node');
const env = process.env;

// Create an OSCNode.Client object
var rn_client = OSCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});

var options = {
	client: rn_client,
	url:'serviceProducts/168'
};

OSCNode.Connect.get(options,(err,body,response) => {
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
//// OSCNode.Connect.patch(options, callback)
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

OSCNode.Connect.patch(options,(err,body,response) => {
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
//// OSCNode.Connect.delete(options, callback)
//// returns callback
// Here's how you could delete a serviceProduct object

 	var options = { 
		client: rn_client,
 	 	url:'serviceProducts/169'
 	}
  
	OSCNode.Connect.delete(options,(err,body,response) => {
		if(err){
			console.log(err);
		}else{
			console.log(response.statusCode); // 200
			console.log(body); // Empty
			return body;
		}
	});

```