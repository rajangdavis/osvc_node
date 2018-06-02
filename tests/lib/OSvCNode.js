var assert = require('chai').assert;

var osvcNode = require('./../../lib/OSvCNode.js');

describe('OSvCNode module', function(){


	it('should have Connect, Client, QueryResults, QueryResultsSet, and AnalyticsReportResults properties that mostly objects',function(){

		assert.strictEqual(typeof osvcNode.Connect, "object");
		assert.strictEqual(typeof osvcNode.Client, "function");
		assert.strictEqual(typeof osvcNode.QueryResults, "object");
		assert.strictEqual(typeof osvcNode.QueryResultsSet, "object");
		assert.strictEqual(typeof osvcNode.AnalyticsReportResults, "object");

	});

});