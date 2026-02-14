import { Code, Info, ListChecks } from "lucide-react";

export function QuestionPanel({ question }) {
  if (!question) {
    return (
      <div className="flex items-center justify-center h-full p-8 bg-white dark:bg-black">
        <p className="text-sm text-gray-500 dark:text-gray-400">Select a question to view details</p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return "text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800";
      case "MEDIUM":
        return "text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800";
      case "HARD":
        return "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700";
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-900">
      <div className="max-w-3xl p-8 space-y-10">
        {/* Header */}
        <div className="space-y-5">
          <div className="flex items-center gap-2.5 flex-wrap">
            {question.topics?.map((topic, index) => (
              <span key={index} className="text-xs font-semibold px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700">
                {topic.name}
              </span>
            )) || (
              <span className="text-xs font-semibold px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700">
                {question.type || "General"}
              </span>
            )}
            <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-snug tracking-tight">
            {question.title}
          </h1>
        </div>

        {/* Description */}
        {question.description && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2.5">
              <Info className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              Description
            </h2>
            <div className="text-[15.5px] text-gray-700 dark:text-gray-300 leading-loose whitespace-pre-wrap font-normal">
              {question.description}
            </div>
          </div>
        )}

        {/* Examples */}
        {question.examples && question.examples.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2.5">
              <Code className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              Examples
            </h2>
            <div className="space-y-5">
              {question.examples.map((example, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4">Example {index + 1}</p>
                  <div className="space-y-3 text-sm">
                    {example.description && (
                      <div className="font-mono text-[13.5px] text-gray-800 dark:text-gray-300 leading-loose">
                        {example.description}
                      </div>
                    )}
                    {example.input && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Input:</span>
                        <code className="text-[13.5px] bg-white dark:bg-gray-900 px-3.5 py-2 rounded border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-mono leading-relaxed">
                          {example.input}
                        </code>
                      </div>
                    )}
                    {example.output && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Output:</span>
                        <code className="text-[13.5px] bg-white dark:bg-gray-900 px-3.5 py-2 rounded border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-mono leading-relaxed">
                          {example.output}
                        </code>
                      </div>
                    )}
                    {example.explanation && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Explanation:</span>
                        <p className="text-[14px] text-gray-700 dark:text-gray-300 leading-loose font-normal">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {question.constraints && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2.5">
              <ListChecks className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              Constraints
            </h2>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-gray-50 dark:bg-gray-800/50">
              <pre className="text-[13.5px] text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap leading-loose">
                {question.constraints}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}