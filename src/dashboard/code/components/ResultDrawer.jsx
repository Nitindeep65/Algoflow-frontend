import React, { useState } from 'react';
import { Drawer } from 'vaul';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  HardDrive, 
  Play, 
  Plus, 
  Trash2,
  X,
  AlertCircle
} from 'lucide-react';

function ResultDrawer({ 
  isOpen, 
  onOpenChange, 
  result, 
  isLoading, 
  error,
  onRunCustomTestCase 
}) {
  const [customTestCases, setCustomTestCases] = useState([]);
  const [newTestCase, setNewTestCase] = useState({ input: '', expected: '' });

  const addCustomTestCase = () => {
    if (newTestCase.input.trim() && newTestCase.expected.trim()) {
      const customCase = {
        ...newTestCase,
        id: Date.now(),
        isCustom: true
      };
      setCustomTestCases([...customTestCases, customCase]);
      setNewTestCase({ input: '', expected: '' });
    }
  };

  const removeCustomTestCase = (id) => {
    setCustomTestCases(customTestCases.filter(tc => tc.id !== id));
  };

  const runCustomTestCase = (testCase) => {
    if (onRunCustomTestCase) {
      onRunCustomTestCase(testCase);
    }
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/70 z-50" />
        <Drawer.Content className="bg-white dark:bg-gray-900 flex flex-col rounded-t-lg h-[85%] mt-24 fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
            <div className="mx-auto w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full my-3" />
            <div className="px-6 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Test Results</h2>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">Code execution summary</p>
              </div>
              <button 
                onClick={() => onOpenChange(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 dark:border-gray-700 border-t-gray-900 dark:border-t-gray-100 mb-4"></div>
                <p className="text-sm font-light text-gray-600 dark:text-gray-400">Running tests...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-red-900 dark:text-red-300 mb-1">Execution Error</h3>
                    <pre className="text-xs text-red-700 dark:text-red-400 font-mono whitespace-pre-wrap">{error}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* Success Results */}
            {result && !error && !isLoading && (
              <div className="space-y-6">
                {/* Submission Success */}
                {result.isSubmission && result.status === 'Submission Accepted' && (
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-semibold text-green-900 dark:text-green-300">Accepted</h3>
                        <p className="text-xs font-light text-green-700 dark:text-green-400">All test cases passed</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status</span>
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{result.passedTests || 0}/{result.totalTests || 0} passed</p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Runtime</span>
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{result.executionTime?.toFixed(1) || 0}ms</p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Memory</span>
                      <HardDrive className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      {typeof result.memoryUsage === 'number' ? `${result.memoryUsage.toFixed(2)} MB` : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Console Output */}
                {result.output && (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Console Output</h3>
                    </div>
                    <div className="bg-gray-900 dark:bg-black p-4 max-h-48 overflow-y-auto">
                      <pre className="text-xs text-green-400 font-mono">{result.output}</pre>
                    </div>
                  </div>
                )}

                {/* Test Cases */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Test Cases</h3>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{result.testResults?.length || 0} total</span>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {result.testResults && result.testResults.length > 0 ? (
                      result.testResults.map((test, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Case {index + 1}</span>
                              {test.executionTime && (
                                <span className="text-xs font-light text-gray-500 dark:text-gray-400">{test.executionTime}ms</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {test.passed ? (
                                <><CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" /><span className="text-xs font-medium text-green-600 dark:text-green-400">Passed</span></>
                              ) : (
                                <><XCircle className="w-4 h-4 text-red-600 dark:text-red-400" /><span className="text-xs font-medium text-red-600 dark:text-red-400">Failed</span></>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">Input</span>
                              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block font-mono text-gray-900 dark:text-gray-100 overflow-x-auto">{test.input}</code>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">Expected</span>
                              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block font-mono text-gray-900 dark:text-gray-100 overflow-x-auto">{test.expected}</code>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">Output</span>
                              <code className={`text-xs px-2 py-1 rounded block font-mono overflow-x-auto ${
                                test.passed ? 'bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-400' : 'bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-400'
                              }`}>{test.actual}</code>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">No test cases available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Test Cases */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Custom Test Cases</h3>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-900">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">Input</label>
                        <Textarea
                          placeholder='e.g., [1,2,3]'
                          value={newTestCase.input}
                          onChange={(e) => setNewTestCase({...newTestCase, input: e.target.value})}
                          className="resize-none h-20 text-xs font-mono dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">Expected Output</label>
                        <Textarea
                          placeholder='e.g., 6'
                          value={newTestCase.expected}
                          onChange={(e) => setNewTestCase({...newTestCase, expected: e.target.value})}
                          className="resize-none h-20 text-xs font-mono dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={addCustomTestCase}
                      size="sm"
                      disabled={!newTestCase.input.trim() || !newTestCase.expected.trim()}
                      className="w-full font-medium bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 text-white"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Test Case
                    </Button>

                    {customTestCases.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {customTestCases.map((testCase) => (
                          <div key={testCase.id} className="border border-gray-200 dark:border-gray-700 rounded p-3 bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">Custom Test</span>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => runCustomTestCase(testCase)}
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-2 text-xs font-medium dark:hover:bg-gray-700"
                                >
                                  <Play className="w-3 h-3 mr-1" />
                                  Run
                                </Button>
                                <Button
                                  onClick={() => removeCustomTestCase(testCase.id)}
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-2 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 dark:hover:bg-gray-700"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-gray-500 dark:text-gray-400 font-medium block mb-1">Input:</span>
                                <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded block font-mono text-gray-900 dark:text-gray-100 overflow-x-auto">{testCase.input}</code>
                              </div>
                              <div>
                                <span className="text-gray-500 dark:text-gray-400 font-medium block mb-1">Expected:</span>
                                <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded block font-mono text-gray-900 dark:text-gray-100 overflow-x-auto">{testCase.expected}</code>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export { ResultDrawer };