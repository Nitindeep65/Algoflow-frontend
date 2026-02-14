import React, { useState } from 'react';
import { CheckSquare, Play, Clock, Check, X } from 'lucide-react';

function TestCasePanel({ question, onRunTests, testResults, isRunning }) {
  const [activeTab, setActiveTab] = useState('testcases');

  const testCases = question?.testCases || [];
  const parsedTestCases = typeof testCases === 'string' 
    ? JSON.parse(testCases || '[]') 
    : Array.isArray(testCases) ? testCases : [];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => setActiveTab('testcases')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'testcases' 
              ? 'border-b-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Test Cases
        </button>
        <button 
          onClick={() => setActiveTab('output')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'output' 
              ? 'border-b-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Output
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'testcases' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{parsedTestCases.length} test cases</span>
              <button
                onClick={onRunTests}
                disabled={isRunning}
                className="px-3 py-1 text-xs font-medium bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
              >
                {isRunning ? (
                  <>
                    <Clock className="w-3 h-3 animate-spin" />
                    Running
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    Run All
                  </>
                )}
              </button>
            </div>

            {parsedTestCases.length === 0 ? (
              <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                <CheckSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-light">No test cases available</p>
              </div>
            ) : (
              <div className="space-y-2">
                {parsedTestCases.map((testCase, index) => {
                  const result = testResults?.find(r => r.index === index);
                  const status = result ? (result.passed ? 'passed' : 'failed') : 'pending';
                  
                  return (
                    <div 
                      key={index} 
                      className={`border rounded p-3 transition-colors ${
                        status === 'passed' 
                          ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50' 
                          : status === 'failed' 
                            ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Case {index + 1}</span>
                        <div className="flex items-center gap-2">
                          {result?.executionTime && (
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{result.executionTime}ms</span>
                          )}
                          {status === 'passed' && (
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          )}
                          {status === 'failed' && (
                            <X className="w-3.5 h-3.5 text-red-600" />
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-1.5 text-xs">
                        {testCase.input && (
                          <div className="flex items-start">
                            <span className="text-gray-500 dark:text-gray-400 min-w-[60px] font-medium">Input:</span>
                            <code className="flex-1 bg-white dark:bg-gray-950 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-mono">
                              {JSON.stringify(testCase.input)}
                            </code>
                          </div>
                        )}
                        {testCase.expected && (
                          <div className="flex items-start">
                            <span className="text-gray-500 dark:text-gray-400 min-w-[60px] font-medium">Expected:</span>
                            <code className="flex-1 bg-white dark:bg-gray-950 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-mono">
                              {JSON.stringify(testCase.expected)}
                            </code>
                          </div>
                        )}
                        {result && result.actual !== undefined && (
                          <div className="flex items-start">
                            <span className="text-gray-500 dark:text-gray-400 min-w-[60px] font-medium">Output:</span>
                            <code className={`flex-1 px-1.5 py-0.5 rounded border font-mono ${
                              result.passed ? 'bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-400'
                            }`}>
                              {JSON.stringify(result.actual)}
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'output' && (
          <div className="h-full flex flex-col">
            <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-xs flex-1 overflow-auto">
              {testResults && testResults.length > 0 ? (
                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div key={index}>
                      <div className={`${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                        Test {index + 1}: {result.passed ? 'PASSED' : 'FAILED'}
                      </div>
                      {result.output && (
                        <div className="text-gray-400 ml-2 text-xs">→ {result.output}</div>
                      )}
                      {result.error && (
                        <div className="text-red-400 ml-2">✗ {result.error}</div>
                      )}
                    </div>
                  ))}
                  <div className="border-t border-gray-700 my-2 pt-2">
                    <div className="text-gray-400">
                      {testResults.filter(r => r.passed).length}/{testResults.length} tests passed
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  Run your code to see output...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { TestCasePanel };