var assert = require('chai').assert;

var OSvCNode = require('../../lib/OSvCNode.js');

describe('OSvCNode module', function(){


	it('should have Connect, Client, QueryResults, QueryResultsSet, and AnalyticsReportResults properties that mostly objects',function(){

		assert.strictEqual(typeof OSvCNode.Connect, "object");
		assert.strictEqual(typeof OSvCNode.Client, "function");
		assert.strictEqual(typeof OSvCNode.QueryResults, "object");
		assert.strictEqual(typeof OSvCNode.QueryResultsSet, "object");
		assert.strictEqual(typeof OSvCNode.AnalyticsReportResults, "object");

	});

});