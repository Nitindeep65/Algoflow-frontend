import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from 'lucide-react'
import axios from 'axios';

function NewProject() {
  const [question, setQuestion] = useState({
    title: '',
    description: '',
    example: '',
    constraints: '',
    difficulty: 'Easy',
    type: '',
    testCases: [{ input: '', output: '' }]
  })

  const onSubmit = async(e) => {
    e.preventDefault();
    
    if (!question.type || !question.title || !question.description) {
      alert('Please fill in all required fields (Type, Title, Description)');
      return;
    }
    
    try {
      const submitData = {
        ...question,
        testCases: question.testCases.map(tc => ({
          input: tc.input,
          output: tc.output
        }))
      }
      
      const response = await axios.post('http://localhost:5001/api/questions/createQuestions', submitData);
      console.log('Question created successfully:', response.data);
      
      setQuestion({
        title: '',
        description: '',
        example: '',
        constraints: '',
        difficulty: 'Easy',
        type: '',
        testCases: [{ input: '', output: '' }]
      })
      
      alert('Question added successfully!');
    } catch(error) {
      console.error('Error creating question:', error);
      alert('Failed to create question. Please try again.');
    }
  }

  const addTestCase = () => {
    const newTestCase = { input: '', output: '' }
    setQuestion(prev => ({
      ...prev,
      testCases: [...prev.testCases, newTestCase]
    }))
  }

  const removeTestCase = (index) => {
    if (question.testCases.length > 1) {
      setQuestion(prev => ({
        ...prev,
        testCases: prev.testCases.filter((_, i) => i !== index)
      }))
    }
  }

  const updateTestCase = (index, field, value) => {
    setQuestion(prev => ({
      ...prev,
      testCases: prev.testCases.map((tc, i) => 
        i === index ? { ...tc, [field]: value } : tc
      )
    }))
  }

  const handleInputChange = (field, value) => {
    setQuestion(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <form onSubmit={onSubmit}>
      <FieldSet>
        <FieldLegend>Question Bank</FieldLegend>
        <FieldDescription>Add new question for DSA</FieldDescription>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <Select value={question.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger className="w-full sm:w-[220px]">
                          <SelectValue placeholder="Type of question" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              <SelectItem value="arrays">Arrays</SelectItem>
                              <SelectItem value="strings">Strings</SelectItem>
                              <SelectItem value="linked-list">Linked List</SelectItem>
                              <SelectItem value="stack">Stack</SelectItem>
                              <SelectItem value="queue">Queue</SelectItem>
                              <SelectItem value="hashing">Hashing</SelectItem>
                              <SelectItem value="two-pointers">Two Pointers</SelectItem>
                              <SelectItem value="sliding-window">Sliding Window</SelectItem>
                              <SelectItem value="binary-search">Binary Search</SelectItem>
                              <SelectItem value="recursion">Recursion</SelectItem>
                              <SelectItem value="backtracking">Backtracking</SelectItem>
                              <SelectItem value="trees">Trees</SelectItem>
                              <SelectItem value="bst">Binary Search Tree (BST)</SelectItem>
                              <SelectItem value="heaps">Heap / Priority Queue</SelectItem>
                              <SelectItem value="graphs">Graphs</SelectItem>
                              <SelectItem value="dp">Dynamic Programming (DP)</SelectItem>
                              <SelectItem value="greedy">Greedy</SelectItem>
                              <SelectItem value="bit-manipulation">Bit Manipulation</SelectItem>
                              <SelectItem value="math">Math</SelectItem>
                          </SelectGroup>
                      </SelectContent>
                  </Select>

                  <ToggleGroup
                      type="single"
                      size="sm"
                      value={question.difficulty}
                      onValueChange={(value) => handleInputChange('difficulty', value || 'Easy')}
                      variant="outline"
                      spacing={2}
                      className="w-full sm:w-auto justify-start sm:justify-end"
                  >
                      <ToggleGroupItem value="Easy" aria-label="Toggle top" className=" bg-green-600 flex-1 sm:flex-none">
                          Easy
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Medium" aria-label="Toggle bottom" className="bg-yellow-500 flex-1 sm:flex-none">
                          Medium
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Hard" aria-label="Toggle left" className="bg-red-600 flex-1 sm:flex-none">
                          Hard
                      </ToggleGroupItem>
                  </ToggleGroup>
              </div>

              <FieldGroup className="space-y-4">
                  <Field>
                      <FieldLabel htmlFor="name">Title of the question</FieldLabel>
                      <Input
                          id="name"
                          autoComplete="off"
                          placeholder="Add title"
                          value={question.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="w-full" />
                  </Field>

                  <Field>
                      <FieldLabel htmlFor="description">Add description</FieldLabel>
                      <Textarea
                          id="description"
                          placeholder="Question description"
                          value={question.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className="w-full min-h-[120px] resize-y" />
                  </Field>

                  <Field>
                      <FieldLabel htmlFor="example">Add Example</FieldLabel>
                      <Textarea
                          id="example"
                          placeholder="Add examples (e.g., Input: [1,2,3], Output: 6)"
                          value={question.example}
                          onChange={(e) => handleInputChange('example', e.target.value)}
                          className="w-full min-h-[100px] resize-y" />
                  </Field>

                  <Field>
                      <FieldLabel htmlFor="constraints">Add Constraints</FieldLabel>
                      <Textarea
                          id="constraints"
                          placeholder="Add constraints (e.g., 1 <= n <= 10^5)"
                          value={question.constraints}
                          onChange={(e) => handleInputChange('constraints', e.target.value)}
                          className="w-full min-h-[100px] resize-y" />
                  </Field>
              </FieldGroup>

              <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between">
                      <div>
                          <h3 className="text-lg font-semibold">Test Cases</h3>
                          <p className="text-sm text-muted-foreground">Add input and expected output for each test case</p>
                      </div>
                      <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addTestCase}
                          className="gap-2"
                      >
                          <Plus className="h-4 w-4" />
                          Add Test Case
                      </Button>
                  </div>

                  <div className="space-y-4">
                      {question.testCases.map((testCase, index) => (
                          <div
                              key={index}
                              className="p-4 border rounded-lg space-y-3 bg-muted/50"
                          >
                              <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">Test Case {index + 1}</span>
                                  {question.testCases.length > 1 && (
                                      <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removeTestCase(index)}
                                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                      >
                                          <Trash2 className="h-4 w-4" />
                                      </Button>
                                  )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Field>
                                      <FieldLabel htmlFor={`input-${index}`}>Input</FieldLabel>
                                      <Textarea
                                          id={`input-${index}`}
                                          placeholder="Enter test input (e.g., [1,2,3])"
                                          value={testCase.input}
                                          onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                                          className="w-full min-h-[80px] resize-y" />
                                  </Field>

                                  <Field>
                                      <FieldLabel htmlFor={`output-${index}`}>Expected Output</FieldLabel>
                                      <Textarea
                                          id={`output-${index}`}
                                          placeholder="Enter expected output (e.g., 6)"
                                          value={testCase.output}
                                          onChange={(e) => updateTestCase(index, 'output', e.target.value)}
                                          className="w-full min-h-[80px] resize-y" />
                                  </Field>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="mt-6">
                <Button type="submit" className="w-full sm:w-auto">Add Question</Button>
              </div>
      </FieldSet>
      </form>
    </div>
  )
}

export default NewProject;