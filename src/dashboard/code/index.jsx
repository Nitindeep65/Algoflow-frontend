import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { QuestionPanel } from './components/QuestionPanel'
import { getQuestionById } from '../data/questions-api'
import { CodePanel } from './components/codePanel'
import { ResultDrawer } from './components/ResultDrawer'
import { TestCasePanel } from './components/TestCasePanel'
import { AIHelpSidebar } from './components/AIHelpSidebar'
import { CodeExecutionService } from './services/codeExecutionService'

function CodeEditor() {
  const { questionId } = useParams()
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState('// Start coding here\nfunction solution() {\n  // Write your solution here\n}')
  const [language, setLanguage] = useState('javascript')
  
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)
  const [executionLoading, setExecutionLoading] = useState(false)
  const [executionError, setExecutionError] = useState(null)
  
  // Test case execution state
  const [testResults, setTestResults] = useState([])
  const [isRunningTests, setIsRunningTests] = useState(false)

  // AI Help sidebar state
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchQuestion = async () => {
      if (questionId) {
        setLoading(true)
        const questionData = await getQuestionById(questionId)
        setQuestion(questionData)
        setLoading(false)
      }
    }

    fetchQuestion()
  }, [questionId])

  const handleRunTests = async () => {
    if (!question || !question.testCases) {
      console.error('No test cases available');
      return;
    }

    setIsRunningTests(true);
    setTestResults([]);
    
    try {
      CodeExecutionService.validateCode(code, language);
      
      const testCases = typeof question.testCases === 'string' 
        ? JSON.parse(question.testCases) 
        : question.testCases;
      
      const result = await CodeExecutionService.executeCode(code, language, testCases);
      
      if (result.success) {
        setTestResults(result.results);
        setExecutionError(null);
      } else {
        setExecutionError(result.error);
        setTestResults([]);
      }
    } catch (error) {
      setExecutionError(error.message);
      setTestResults([]);
    } finally {
      setIsRunningTests(false);
    }
  };

  const handleRunCode = async () => {
    await handleRunTests();
    
    setTimeout(() => {
      setDrawerOpen(true);
      setExecutionLoading(true);
      
      setTimeout(() => {
        const passedTests = testResults.filter(r => r.passed).length;
        const totalTests = testResults.length;
        const avgExecutionTime = totalTests > 0 ? testResults.reduce((acc, r) => acc + (r.executionTime || 0), 0) / totalTests : 0;
        
        setExecutionResult({
          output: totalTests > 0 
            ? `Execution completed successfully!\n\n✅ Passed: ${passedTests}/${totalTests} test cases\n⏱️  Average execution time: ${avgExecutionTime.toFixed(2)}ms\n🎯 Success rate: ${((passedTests/totalTests) * 100).toFixed(1)}%`
            : 'Code executed but no test cases were provided.',
          executionTime: avgExecutionTime,
          memoryUsage: Math.round((Math.random() * 5 + 1) * 100) / 100, // Simulated memory usage between 1-6 MB with 2 decimals
          status: passedTests === totalTests && totalTests > 0 ? "All Tests Passed" : totalTests > 0 ? "Some Tests Failed" : "No Tests Available",
          testResults: testResults.map(r => ({
            passed: r.passed,
            input: typeof r.input === 'object' ? JSON.stringify(r.input) : r.input || 'N/A',
            expected: typeof r.expected === 'object' ? JSON.stringify(r.expected) : r.expected || 'N/A',
            actual: typeof r.actual === 'object' ? JSON.stringify(r.actual) : r.actual || 'N/A',
            executionTime: r.executionTime || Math.random() * 50 + 10 // Random execution time if not available
          })),
          totalTests,
          passedTests,
          failedTests: totalTests - passedTests
        });
        setExecutionLoading(false);
      }, 1500); // Slightly longer delay for better UX
    }, 500);
  };

  const handleRunCustomTestCase = async (customTestCase) => {
    try {
      setExecutionLoading(true);
      
      const formattedTestCase = {
        input: customTestCase.input,
        expected: JSON.parse(customTestCase.expected)
      };
      
      const result = await CodeExecutionService.executeCode(code, language, [formattedTestCase]);
      
      if (result.success) {
        const customResult = result.results[0];
        setExecutionResult(prev => ({
          ...prev,
          customTestResults: [
            ...(prev.customTestResults || []),
            {
              ...customResult,
              input: customTestCase.input,
              expected: customTestCase.expected,
              actual: JSON.stringify(customResult.actual),
              isCustom: true,
              id: customTestCase.id
            }
          ]
        }));
      }
    } catch (error) {
      console.error('Error running custom test case:', error);
      setExecutionError(`Custom test case error: ${error.message}`);
    } finally {
      setExecutionLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    await handleRunTests();
    
    setTimeout(() => {
      const passedTests = testResults.filter(r => r.passed).length;
      const totalTests = testResults.length;
      
      if (passedTests === totalTests && totalTests > 0) {
        setDrawerOpen(true);
        setExecutionLoading(true);
        
        setTimeout(() => {
          setExecutionResult({
            output: `🎉 Submission Successful!\n\n✅ All ${totalTests} test cases passed!\n🚀 Your solution has been accepted.\n⭐ Great job solving this problem!`,
            executionTime: testResults.reduce((acc, r) => acc + (r.executionTime || 0), 0) / totalTests,
            memoryUsage: Math.round((Math.random() * 4 + 2) * 100) / 100,
            status: "Submission Accepted",
            testResults: testResults.map(r => ({
              passed: r.passed,
              input: typeof r.input === 'object' ? JSON.stringify(r.input) : r.input || 'N/A',
              expected: typeof r.expected === 'object' ? JSON.stringify(r.expected) : r.expected || 'N/A',
              actual: typeof r.actual === 'object' ? JSON.stringify(r.actual) : r.actual || 'N/A',
              executionTime: r.executionTime || Math.random() * 50 + 10
            })),
            isSubmission: true,
            submissionTime: new Date().toLocaleString()
          });
          setExecutionLoading(false);
        }, 1500);
      } else {
        const message = totalTests === 0 
          ? 'No test cases available for this question.'
          : `Cannot submit: ${totalTests - passedTests} test case(s) failed. Please fix your code.`;
        alert(message);
      }
    }, 500);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setTestResults([]);
  };

  return (
    <div className="h-screen w-screen fixed inset-0 bg-white dark:bg-gray-900">
      <ResizablePanelGroup
        orientation="horizontal"
        className="h-full w-full"
      >
        <ResizablePanel defaultSize="40%">
          <div className="h-full overflow-auto border-r border-gray-200 dark:border-gray-800">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-sm text-gray-500 dark:text-gray-400 font-light">Loading question...</div>
              </div>
            ) : (
              <QuestionPanel question={question} />
            )}
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize="60%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="60%">
              <div className="h-full flex flex-col bg-white dark:bg-gray-900">
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Code</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setAiSidebarOpen(true)}
                      className="px-3 py-1.5 text-sm font-medium bg-purple-600 dark:bg-purple-500 text-white rounded hover:bg-purple-700 dark:hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                      disabled={executionLoading}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      AI Help
                    </button>
                    <button 
                      onClick={handleRunCode}
                      className="px-3 py-1.5 text-sm font-medium bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={executionLoading}
                    >
                      {executionLoading ? 'Running...' : 'Run'}
                    </button>
                    <button 
                      onClick={handleSubmitCode}
                      className="px-3 py-1.5 text-sm font-medium bg-green-600 dark:bg-green-500 text-white rounded hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={executionLoading}
                    >
                      {executionLoading ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <CodePanel
                    initialCode={code}
                    onChange={(value) => setCode(value)}
                    onLanguageChange={handleLanguageChange}
                  />
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize="40%">
              <TestCasePanel 
                question={question}
                onRunTests={handleRunTests}
                testResults={testResults}
                isRunning={isRunningTests}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
      
      {/* Result Drawer */}
      <ResultDrawer 
        isOpen={drawerOpen}
        onOpenChange={setDrawerOpen}
        result={executionResult}
        isLoading={executionLoading}
        error={executionError}
        onRunCustomTestCase={handleRunCustomTestCase}
      />

      {/* AI Help Sidebar */}
      <AIHelpSidebar
        isOpen={aiSidebarOpen}
        onClose={() => setAiSidebarOpen(false)}
        code={code}
        question={question}
        language={language}
      />
    </div>
  )
}


export default CodeEditor