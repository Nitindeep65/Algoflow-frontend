import React, { useState } from 'react';
import { X, Sparkles, Loader2, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';

const formatContent = (text) => {
  if (!text) return null;

  const parts = text.split(/(```[\s\S]*?```)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('```')) {
      const codeContent = part.replace(/```(\w+)?\n?/g, '').replace(/```$/g, '');
      return (
        <pre key={index} className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto my-3 border border-gray-700">
          <code className="text-xs font-mono leading-relaxed">{codeContent}</code>
        </pre>
      );
    }

    const withInlineCode = part.split(/(`[^`]+`)/g).map((segment, i) => {
      if (segment.startsWith('`') && segment.endsWith('`')) {
        return (
          <code key={i} className="bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded text-xs font-mono">
            {segment.slice(1, -1)}
          </code>
        );
      }
      
      return segment.split(/(\*\*[^*]+\*\*)/g).map((boldSegment, j) => {
        if (boldSegment.startsWith('**') && boldSegment.endsWith('**')) {
          return <strong key={j} className="font-bold text-gray-900 dark:text-gray-100">{boldSegment.slice(2, -2)}</strong>;
        }
        return boldSegment;
      });
    });

    return <span key={index}>{withInlineCode}</span>;
  });
};

export function AIHelpSidebar({ isOpen, onClose, code, question, language }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeCode = async () => {
    if (!code || !question) {
      setError('Please write some code first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5001/api/ai/analyze-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          question: {
            title: question.title,
            description: question.description,
            examples: question.examples,
            constraints: question.constraints,
          },
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze code');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      console.error('Error analyzing code:', err);
      setError(err.message || 'Failed to analyze code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-analyze when sidebar opens
  React.useEffect(() => {
    if (isOpen && !analysis && !loading) {
      analyzeCode();
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">AI Code Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 text-purple-600 dark:text-purple-400 animate-spin mb-4" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Analyzing your code...</p>
                <p className="text-xs font-light text-gray-500 dark:text-gray-500 mt-1">This may take a few seconds</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-red-900 dark:text-red-300 mb-1">Error</h3>
                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                  </div>
                </div>
                <button
                  onClick={analyzeCode}
                  className="mt-4 w-full px-4 py-2 text-sm font-medium bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {analysis && !loading && !error && (
              <div className="space-y-8">
                {/* Issues Found */}
                {analysis.issues && analysis.issues.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        Issues Found
                      </h3>
                    </div>
                    <div className="space-y-3 pl-10">
                      {analysis.issues.map((issue, index) => (
                        <div key={index} className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                          <div className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200 flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <div className="text-sm text-orange-900 dark:text-orange-200 leading-loose flex-1">
                              {formatContent(issue)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {analysis.suggestions && analysis.suggestions.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        Suggestions
                      </h3>
                    </div>
                    <div className="space-y-3 pl-10">
                      {analysis.suggestions.map((suggestion, index) => (
                        <div key={index} className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                          <div className="flex gap-3">
                            <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                            <div className="text-sm text-purple-900 dark:text-purple-200 leading-loose flex-1">
                              {formatContent(suggestion)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Explanation */}
                {analysis.explanation && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        Detailed Explanation
                      </h3>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-5 pl-15">
                      <div className="text-sm text-gray-700 dark:text-gray-300 leading-loose">
                        {formatContent(analysis.explanation)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Re-analyze button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={analyzeCode}
                    className="w-full px-4 py-3 text-sm font-semibold bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Re-analyze Code
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
