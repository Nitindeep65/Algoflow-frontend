import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getTableData } from "../data/table-data";
import { Search, Filter } from "lucide-react";

export function DataTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const questions = await getTableData();
        setData(questions);
        setFilteredData(questions);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.difficulty?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
          <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-4 w-4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-12 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-48 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-16 bg-muted animate-pulse rounded ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No questions found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Get started by adding your first question
        </p>
      </div>
    );
  }

  const toggleCompletion = (id) => {
    setCompletedQuestions((prev) =>
      prev.includes(id) ? prev.filter((questionId) => questionId !== id) : [...prev, id]
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return "text-green-700 bg-green-50 border-green-200";
      case "MEDIUM":
        return "text-orange-700 bg-orange-50 border-orange-200";
      case "HARD":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        {completedQuestions.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {completedQuestions.length} completed
            </span>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border bg-background">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-12 pl-4">Status</TableHead>
                <TableHead className="min-w-[200px] font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Difficulty</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow 
                  key={row.id} 
                  className={`hover:bg-muted/50 transition-colors group ${
                    completedQuestions.includes(row.id) ? 'bg-green-50 hover:bg-green-100' : ''
                  }`}
                >
                  <TableCell className="pl-4">
                    <Checkbox
                      checked={completedQuestions.includes(row.id)}
                      onCheckedChange={() => toggleCompletion(row.id)}
                      aria-label={`Mark question ${row.id} as completed`}
                    />
                  </TableCell>

                  <TableCell>
                    <div className="font-medium text-sm leading-tight">
                      <span className={completedQuestions.includes(row.id) ? 'line-through text-muted-foreground' : ''}>
                        {row.title}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {row.type}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`font-medium border ${getDifficultyColor(row.difficulty)}`}
                    >
                      {row.difficulty}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3">
        {paginatedData.map((row) => (
          <div 
            key={row.id}
            className={`bg-background border rounded-lg p-4 space-y-3 shadow-sm ${
              completedQuestions.includes(row.id) ? 'bg-green-50 border-green-200' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <Checkbox
                  checked={completedQuestions.includes(row.id)}
                  onCheckedChange={() => toggleCompletion(row.id)}
                  className="mt-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium text-sm leading-tight text-gray-900 pr-2 ${
                    completedQuestions.includes(row.id) ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {row.title}
                  </h3>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pl-7">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="font-normal text-xs">
                  {row.type}
                </Badge>
                <Badge 
                  variant="outline"
                  className={`font-medium border text-xs ${getDifficultyColor(row.difficulty)}`}
                >
                  {row.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of{" "}
            {filteredData.length} results
          </div>
          
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="text-xs px-2 h-8"
            >
              Previous
            </Button>
            
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0 text-xs"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            {/* Mobile page indicator */}
            <div className="sm:hidden flex items-center">
              <span className="text-xs text-muted-foreground px-3">
                {currentPage} of {totalPages}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="text-xs px-2 h-8"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
