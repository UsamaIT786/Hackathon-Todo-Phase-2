/**
 * Mock API for frontend development - Works completely locally without any server
 * All data is persisted to localStorage for a real-world experience
 */

import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  User,
  LoginInput,
  SignupInput,
  AuthResponse,
  ApiResult,
} from '@/types';

// Storage keys
const STORAGE_KEYS = {
  USERS: 'todo-manager-users',
  TASKS: 'todo-manager-tasks',
  CURRENT_USER: 'todo-manager-current-user',
} as const;

// Mock delay to simulate realistic response times
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============ Local Storage Helpers ============
function getStoredUsers(): Map<string, { user: User; password: string }> {
  if (typeof window === 'undefined') return new Map();

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USERS);
    if (stored) {
      const parsed = JSON.parse(stored);
      return new Map(Object.entries(parsed));
    }
  } catch (e) {
    console.error('Error reading users from localStorage:', e);
  }
  return new Map();
}

function saveUsers(users: Map<string, { user: User; password: string }>): void {
  if (typeof window === 'undefined') return;

  try {
    const obj = Object.fromEntries(users);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(obj));
  } catch (e) {
    console.error('Error saving users to localStorage:', e);
  }
}

function getStoredTasks(): Task[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading tasks from localStorage:', e);
  }
  return [];
}

function saveTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (e) {
    console.error('Error saving tasks to localStorage:', e);
  }
}

function getStoredCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading current user from localStorage:', e);
  }
  return null;
}

function saveCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') return;

  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  } catch (e) {
    console.error('Error saving current user to localStorage:', e);
  }
}

// Initialize state from localStorage
let mockUsers = getStoredUsers();
let mockTasks = getStoredTasks();
let currentUser = getStoredCurrentUser();
let nextTaskId = mockTasks.length > 0 ? Math.max(...mockTasks.map(t => parseInt(t.id))) + 1 : 1;

// Generate a mock JWT token
function generateMockToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
  }));
  const signature = btoa('mock-signature-' + user.id);
  return header + '.' + payload + '.' + signature;
}

// ============ Mock Auth API ============
export async function mockLogin(input: LoginInput): Promise<ApiResult<AuthResponse>> {
  await delay(300);

  // Reload users from storage to get latest data
  mockUsers = getStoredUsers();

  const userData = mockUsers.get(input.email);
  if (!userData || userData.password !== input.password) {
    return {
      error: { message: 'Invalid email or password', code: 'INVALID_CREDENTIALS' }
    };
  }

  currentUser = userData.user;
  saveCurrentUser(currentUser);

  return {
    data: {
      user: userData.user,
      token: generateMockToken(userData.user),
    }
  };
}

export async function mockSignup(input: SignupInput): Promise<ApiResult<AuthResponse>> {
  await delay(300);

  // Reload users from storage to get latest data
  mockUsers = getStoredUsers();

  if (mockUsers.has(input.email)) {
    return {
      error: { message: 'Email already registered', code: 'EMAIL_EXISTS' }
    };
  }

  const newUser: User = {
    id: String(mockUsers.size + 1),
    email: input.email,
    name: input.name,
    createdAt: new Date().toISOString(),
  };

  mockUsers.set(input.email, { user: newUser, password: input.password });
  saveUsers(mockUsers);

  currentUser = newUser;
  saveCurrentUser(currentUser);

  // Create welcome tasks for new user
  const welcomeTasks: Task[] = [
    {
      id: String(nextTaskId++),
      title: 'Welcome to Todo Manager! 🎉',
      description: 'This is your first task. Try completing it by clicking the checkbox.',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: newUser.id,
    },
    {
      id: String(nextTaskId++),
      title: 'Create your first task',
      description: 'Click the "Add Task" button to create a new task.',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: newUser.id,
    },
  ];

  mockTasks = [...mockTasks, ...welcomeTasks];
  saveTasks(mockTasks);

  return {
    data: {
      user: newUser,
      token: generateMockToken(newUser),
    }
  };
}

export async function mockLogout(): Promise<ApiResult<null>> {
  await delay(100);
  currentUser = null;
  saveCurrentUser(null);
  return { data: null };
}

export async function mockGetMe(): Promise<ApiResult<User>> {
  await delay(100);

  // Try to restore from storage
  if (!currentUser) {
    currentUser = getStoredCurrentUser();
  }

  if (!currentUser) {
    return {
      error: { message: 'Not authenticated', code: 'UNAUTHORIZED' }
    };
  }

  return { data: currentUser };
}

// ============ Mock Tasks API ============
export async function mockGetTasks(): Promise<ApiResult<Task[]>> {
  await delay(200);

  if (!currentUser) {
    currentUser = getStoredCurrentUser();
  }

  if (!currentUser) {
    return { error: { message: 'Not authenticated', code: 'UNAUTHORIZED' } };
  }

  // Reload tasks from storage
  mockTasks = getStoredTasks();
  const userTasks = mockTasks.filter(t => t.userId === currentUser!.id);
  return { data: userTasks };
}

export async function mockGetTask(id: string): Promise<ApiResult<Task>> {
  await delay(100);

  mockTasks = getStoredTasks();
  const task = mockTasks.find(t => t.id === id);
  if (!task) {
    return { error: { message: 'Task not found', code: 'NOT_FOUND' } };
  }

  return { data: task };
}

export async function mockCreateTask(input: CreateTaskInput): Promise<ApiResult<Task>> {
  await delay(200);

  if (!currentUser) {
    currentUser = getStoredCurrentUser();
  }

  if (!currentUser) {
    return { error: { message: 'Not authenticated', code: 'UNAUTHORIZED' } };
  }

  mockTasks = getStoredTasks();
  nextTaskId = mockTasks.length > 0 ? Math.max(...mockTasks.map(t => parseInt(t.id))) + 1 : 1;

  const newTask: Task = {
    id: String(nextTaskId++),
    title: input.title,
    description: input.description ?? null,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: currentUser.id,
  };

  mockTasks.push(newTask);
  saveTasks(mockTasks);
  return { data: newTask };
}

export async function mockUpdateTask(id: string, input: UpdateTaskInput): Promise<ApiResult<Task>> {
  await delay(150);

  mockTasks = getStoredTasks();
  const taskIndex = mockTasks.findIndex(t => t.id === id);
  const existingTask = mockTasks[taskIndex];

  if (taskIndex === -1 || !existingTask) {
    return { error: { message: 'Task not found', code: 'NOT_FOUND' } };
  }

  const updatedTask: Task = {
    id: existingTask.id,
    title: input.title !== undefined ? input.title : existingTask.title,
    description: input.description !== undefined ? input.description : existingTask.description,
    completed: input.completed !== undefined ? input.completed : existingTask.completed,
    createdAt: existingTask.createdAt,
    updatedAt: new Date().toISOString(),
    userId: existingTask.userId,
  };

  mockTasks[taskIndex] = updatedTask;
  saveTasks(mockTasks);
  return { data: updatedTask };
}

export async function mockDeleteTask(id: string): Promise<ApiResult<null>> {
  await delay(150);

  mockTasks = getStoredTasks();
  const taskIndex = mockTasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return { error: { message: 'Task not found', code: 'NOT_FOUND' } };
  }

  mockTasks.splice(taskIndex, 1);
  saveTasks(mockTasks);
  return { data: null };
}

export async function mockToggleTask(id: string): Promise<ApiResult<Task>> {
  await delay(100);

  mockTasks = getStoredTasks();
  const taskIndex = mockTasks.findIndex(t => t.id === id);
  const existingTask = mockTasks[taskIndex];

  if (taskIndex === -1 || !existingTask) {
    return { error: { message: 'Task not found', code: 'NOT_FOUND' } };
  }

  const toggledTask: Task = {
    id: existingTask.id,
    title: existingTask.title,
    description: existingTask.description,
    completed: !existingTask.completed,
    createdAt: existingTask.createdAt,
    updatedAt: new Date().toISOString(),
    userId: existingTask.userId,
  };

  mockTasks[taskIndex] = toggledTask;
  saveTasks(mockTasks);
  return { data: toggledTask };
}

// Set current user from token (for restoring session)
export function setMockCurrentUser(user: User | null): void {
  currentUser = user;
  saveCurrentUser(user);
}
