export type Priority = 'low' | 'medium' | 'high';
export type Status = 'Not Started' | 'In progress' | 'Completed';

export interface TodoAnalysis {
  category: string;
  howTo: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  dueDate: Date | string | null;
  priority: Priority;
  analysis?: TodoAnalysis;
  subtasks?: SubTodo[];
  parentId?: string;
  status: Status;
  userId?: string;
}

export interface SubTodo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    dueDate: Date | string | null;
    priority: Priority;
    analysis?: TodoAnalysis;
    parentId?: string;
    status: Status;
}

export interface ThemeConfig {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
}

export interface TodoStore {
  todos: Todo[];
  theme: ThemeConfig;
  addTodo: (todo: Partial<Todo>) => void;
  addSubtask: (parentId: string, subtask: Partial<SubTodo>) => void;
  //toggleTodo: (id: string, updatedTodo: Partial<Todo>) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  setTheme: (theme: ThemeConfig) => void;
  setTodos: (todos: Todo[]) => void;
  createSubtaskStore: (parentId: string, subtask: SubTodo) => void;
  updateSubtaskStore: (parentId: string, subtaskId: string, subtask: Partial<SubTodo>) => void;
  deleteSubtaskStore: (parentId: string, subtaskId: string) => void;

}