# OSCNode

An (under development) Node library for using the [Oracle Service Cloud REST API](https://docs.oracle.com/cloud/latest/servicecs_gs/CXSVC/) influenced by the [ConnectPHP API](http://documentation.custhelp.com/euf/assets/devdocs/november2016/Connect_PHP/Default.htm)

## Todo
I am looking to implement the following items soon:
1. OSCNodeQueryResultsSet, an object for performing multiple queries
2. OSCNodeAnalyticsReportResults, an object for running Analytics Reports
3. Test suite (in progress)
4. Travis CI for continuous integration
5. Code Climate for code quality
6. Documentation


## Compatibility

The library is being tested against Oracle Service Cloud May 2017 using Node v8.2.1

TravisCI to be set up soon!

All of the HTTP methods should work on any version of Oracle Service Cloud since version May 2015; however, there maybe some issues with querying items on any version before May 2016. This is because ROQL queries were not exposed via the REST API until May 2016.


## Use Cases
You can use this Node Library for basic scripting and microservices. The main features that work to date are as follows:

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
	demo_site: true				// Changes domain from 'custhelp' to 'rightnowdemo'

	// STILL TO BE IMPLEMENTED
	// change_version: 'v1.4', 		// Changes REST API version, default is 'v1.3'
	// ssl_off: true,				// Turns off SSL verification
	// suppress_rules: true			// Supresses Business Rules
});


```

<!-- ## OSCNodeQueryResults example

This is for running one ROQL query. Whatever is allowed by the REST API (limits and sorting) is allowed with this library.

OSCNodeQueryResults only has one function: 'query', which takes an OSCNodeClient object and string query (example below).

```node
from 'osc_Node' import OSCNodeClient,OSCNodeQueryResults

rn_client = OSCNodeClient(env['OSC_ADMIN'],
			    env['OSC_PASSWORD'],
    			    env['OSC_SITE'])

q = OSCNodeQueryResults(rn_client)
query = "DESCRIBE Answers"
results = q.query(query)

print results.status_code 			#=> 200
print results.content 				#=> JSON representation of results
print results.pretty_content	 		#=> Pretty printed JSON String of results


```


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
//// OSCNodeConnect.post( <client>, <url>, <json_data> )
//// returns a OSCNodeResponse object

// Here's how you could create a new ServiceProduct object
// using Node variables, hashes(sort of like JSON), and arrays to set field information

const OSCNode = require('osc_node');
const env = process.env;

// Create an OSCNode.Client object
var rn_client = OSCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});


// CREATE/POST example
var newProduct = {};
newProduct['names'] = []
newProduct['names'].push({'labelText':'newProduct', 'language':{'id':1}})
newProduct['displayOrder'] = 4
newProduct['adminVisibleInterfaces'] = []
newProduct['adminVisibleInterfaces'].push({'id':1})
newProduct['endUserVisibleInterfaces'] = []
newProduct['endUserVisibleInterfaces'].push({'id':1})


OSCNode.Connect.post(rn_client,'serviceProducts',newProduct,(err,body,response) => {
	if(err){
		console.log(err);
	}else{
		console.log(response.statusCode); // => 201
		console.log(JSON.stringify(body, null, 4)); // => JSON representation
		// Do something here
		return body; // => Callback
	}
});



```


<!-- 




### READ
```node
//// OSCNodeConnect.get( <client>, optional (<url>/<id>/...<params>) )
//// returns a OSCNodeResponse object
// Here's how you could get an instance of ServiceProducts

from osc_Node import env,OSCNodeClient, OSCNodeConnect

rn_client = OSCNodeClient(env['OSC_ADMIN'],
			    env['OSC_PASSWORD'],
			    env['OSC_SITE'])

opc = OSCNodeConnect(rn_client)
res = opc.get('serviceProducts/164')

print res.status_code // => 200
print res.pretty_content // => Pretty Printed JSON response
// {
//     "links": [
//         {
//             "href": "https://{env['OSC_SITE']}.rightnowdemo.com/services/rest/connect/v1.3/serviceProducts/164", 
//             "rel": "self"
//         }, 
//         {
//             "href": "https://{env['OSC_SITE']}.rightnowdemo.com/services/rest/connect/v1.3/serviceProducts/164", 
//             "rel": "canonical"
//         }, 
//         {
//             "href": "https://{env['OSC_SITE']}.rightnowdemo.com/services/rest/connect/v1.3/metadata-catalog/serviceProducts", 
//             "mediaType": "application/schema+json", 
//             "rel": "describedby"
//         }
//     ], 
// ...
// }
```






### UPDATE
```node
//// OSCNodeConnect.patch(<url>, <json_data> )
//// returns a OSCNodeResponse object
# Here's how you could update an Answer object
# using Node variables, lists, and dicts
# to set field information
from osc_Node import env,OSCNodeClient, OSCNodeConnect

rn_client = OSCNodeClient(env['OSC_ADMIN'],
			    env['OSC_PASSWORD'],
			    env['OSC_SITE'])
			    
opc = OSCNodeConnect(rn_client)

# Patch example
answer_updated_hash = {}
answer_updated_hash['summary'] = "Node TEST UPDATED"
answer_updated_hash['solution'] = "Node TEST UPDATED"
updated_answer = opc.patch('answers/154',answer_updated_hash)
print updated_answer.status_code
print updated_answer.content #=> Returns as JSON

```






### DELETE
```node
#### OSCNodeConnect.delete(<url> )
#### returns a OSCNodeResponse object
# Here's how you could delete an Answer object
# and OSCNodeConnect classes

from osc_Node import env,OSCNodeClient, OSCNodeConnect

rn_client = OSCNodeClient(env['OSC_ADMIN'],
			    env['OSC_PASSWORD'],
			    env['OSC_SITE'])

opc = OSCNodeConnect(rn_client)
deleted_answer = opc.delete('answers/154')
print deleted_answer.status_code #=> 200

```
 -->