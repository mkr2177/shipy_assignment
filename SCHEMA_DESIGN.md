# Task Management App - Schema Design

## Overview
This document outlines the detailed schema design for the Task CRUD object used in the Task Management Application. The schema is designed to support comprehensive task management with all required fields as specified in the campus assessment requirements.

## CRUD Object: Task

### Core Entity: `Task`

The Task entity serves as the primary CRUD object for the application, representing individual tasks that users can create, read, update, and delete.

## Schema Definition

### Task Entity Structure

```typescript
interface Task {
  // Primary Key
  id: number;                    // Unique identifier (auto-generated)
  
  // Required Fields (Text Input)
  title: string;                 // Task title/name (min: 3 chars, max: 100 chars)
  description: string;           // Detailed task description (min: 10 chars, max: 500 chars)
  
  // Enum Fields (Dropdown)
  category: TaskCategory;        // Task category (enum)
  priority: TaskPriority;        // Task priority level (enum)
  status: TaskStatus;            // Current task status (enum)
  
  // Boolean Field (Checkbox)
  isUrgent: boolean;            // Whether task requires urgent attention
  
  // Optional Fields
  dueDate: string | null;       // Due date in ISO format (YYYY-MM-DD)
  completionNote: string;       // Optional note when task is completed
  
  // System Fields (Auto-generated)
  createdAt: string;            // ISO timestamp of creation
  updatedAt: string;            // ISO timestamp of last update
  completedAt: string | null;   // ISO timestamp when task was completed
}
```

### Enum Definitions

#### TaskCategory (Dropdown Field)
```typescript
enum TaskCategory {
  WORK = "Work",
  PERSONAL = "Personal", 
  SHOPPING = "Shopping",
  HEALTH = "Health",
  EDUCATION = "Education",
  OTHER = "Other"
}
```

**Purpose**: Categorizes tasks for better organization and filtering
**Default**: "Work"
**Validation**: Must be one of the predefined values

#### TaskPriority (Dropdown Field)
```typescript
enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High", 
  CRITICAL = "Critical"
}
```

**Purpose**: Indicates the importance level of the task
**Default**: "Medium"
**Validation**: Must be one of the predefined values
**UI Representation**: Color-coded badges (Low=Green, Medium=Yellow, High=Orange, Critical=Red)

#### TaskStatus (Dropdown Field)
```typescript
enum TaskStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled"
}
```

**Purpose**: Tracks the current state of task execution
**Default**: "Pending"
**Validation**: Must be one of the predefined values
**Business Logic**: 
- Only non-completed tasks can be marked as complete
- Completed tasks show completion timestamp and note

## Field Specifications

### Required Fields

| Field | Type | Constraints | Validation Rules |
|-------|------|-------------|------------------|
| `id` | number | Primary Key, Auto-increment | System generated, unique |
| `title` | string | Required, 3-100 chars | Non-empty, trimmed |
| `description` | string | Required, 10-500 chars | Non-empty, trimmed |
| `category` | enum | Required | Must be valid TaskCategory |
| `priority` | enum | Required | Must be valid TaskPriority |
| `status` | enum | Required | Must be valid TaskStatus |
| `isUrgent` | boolean | Required | true or false |

### Optional Fields

| Field | Type | Constraints | Validation Rules |
|-------|------|-------------|------------------|
| `dueDate` | string\|null | ISO date format | Cannot be in the past |
| `completionNote` | string | 0-300 chars | Trimmed, optional |

### System Fields

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `createdAt` | string | ISO timestamp | Auto-set on creation |
| `updatedAt` | string | ISO timestamp | Auto-updated on modification |
| `completedAt` | string\|null | ISO timestamp | Set when status becomes "Completed" |

## Data Relationships

### Primary Relationships
- **User ↔ Task**: One-to-Many (implicit through authentication)
  - Each user can have multiple tasks
  - Tasks are isolated per user session
  - No explicit foreign key (using localStorage)

### Derived Relationships
- **Category ↔ Task**: One-to-Many
  - Each task belongs to one category
  - Categories can have multiple tasks
  
- **Priority ↔ Task**: One-to-Many
  - Each task has one priority level
  - Priority levels can be assigned to multiple tasks

## Business Rules

### Creation Rules
1. All required fields must be provided
2. Title must be unique per user (soft validation)
3. Due date cannot be in the past
4. Default status is "Pending"
5. Default priority is "Medium"

### Update Rules
1. System fields (id, createdAt) cannot be modified
2. updatedAt is automatically set on any modification
3. completedAt is only set when status changes to "Completed"
4. Completion note can only be added when marking as complete

### Deletion Rules
1. Soft delete not implemented (hard delete only)
2. No cascade delete requirements (standalone entity)
3. Confirmation required before deletion

### Completion Rules
1. Only non-completed tasks can be marked complete
2. Completion automatically sets:
   - status to "Completed"
   - completedAt timestamp
   - Optional completionNote
3. Completed tasks cannot be unmarked (business decision)

## Data Storage Implementation

### Current Implementation: Local Storage
```javascript
// Storage Key
const STORAGE_KEY = 'tasks';

// Data Structure
localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

// Retrieval
const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
```

### Future Database Schema (PostgreSQL Example)
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('Work', 'Personal', 'Shopping', 'Health', 'Education', 'Other')),
    priority VARCHAR(10) NOT NULL CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    status VARCHAR(15) NOT NULL CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Cancelled')),
    is_urgent BOOLEAN NOT NULL DEFAULT FALSE,
    due_date DATE,
    completion_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_category ON tasks(category);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
```

## Validation Schema

### Frontend Validation (JavaScript)
```javascript
const taskValidationSchema = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 100,
    trim: true
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 500,
    trim: true
  },
  category: {
    required: true,
    enum: ['Work', 'Personal', 'Shopping', 'Health', 'Education', 'Other']
  },
  priority: {
    required: true,
    enum: ['Low', 'Medium', 'High', 'Critical']
  },
  status: {
    required: true,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled']
  },
  isUrgent: {
    required: true,
    type: 'boolean'
  },
  dueDate: {
    required: false,
    type: 'date',
    minDate: 'today'
  },
  completionNote: {
    required: false,
    maxLength: 300,
    trim: true
  }
};
```

## Sample Data

### Example Task Records
```javascript
const sampleTasks = [
  {
    id: 1,
    title: "Complete React Project",
    description: "Build a task management app with CRUD operations for campus assessment",
    category: "Work",
    priority: "High",
    status: "In Progress",
    isUrgent: true,
    dueDate: "2025-08-10",
    completionNote: "",
    completedAt: null,
    createdAt: "2025-08-05T15:30:00.000Z",
    updatedAt: "2025-08-05T16:45:00.000Z"
  },
  {
    id: 2,
    title: "Buy Groceries",
    description: "Get milk, bread, eggs, and vegetables for the week",
    category: "Shopping",
    priority: "Medium",
    status: "Pending",
    isUrgent: false,
    dueDate: "2025-08-06",
    completionNote: "",
    completedAt: null,
    createdAt: "2025-08-05T14:20:00.000Z",
    updatedAt: "2025-08-05T14:20:00.000Z"
  },
  {
    id: 3,
    title: "Exercise Routine",
    description: "Complete 30-minute workout session at the gym",
    category: "Health",
    priority: "Medium",
    status: "Completed",
    isUrgent: false,
    dueDate: null,
    completionNote: "Great workout! Increased weights for bench press.",
    completedAt: "2025-08-05T18:30:00.000Z",
    createdAt: "2025-08-05T08:00:00.000Z",
    updatedAt: "2025-08-05T18:30:00.000Z"
  }
];
```

## Schema Evolution

### Version History
- **v1.0**: Initial schema with basic CRUD fields
- **v1.1**: Added completion note and timestamp fields
- **v1.2**: Enhanced validation rules and constraints

### Future Enhancements
1. **User Assignment**: Add user_id for multi-user support
2. **Tags**: Add flexible tagging system
3. **Attachments**: Support file attachments
4. **Subtasks**: Hierarchical task structure
5. **Time Tracking**: Add time estimation and tracking
6. **Comments**: Task discussion threads
7. **Recurring Tasks**: Support for repeating tasks

## Performance Considerations

### Current Implementation
- **Storage**: Browser localStorage (5-10MB limit)
- **Query Performance**: Linear search O(n)
- **Scalability**: Limited to ~1000 tasks per user

### Optimization Strategies
1. **Indexing**: Add indexes on frequently queried fields
2. **Pagination**: Implement server-side pagination
3. **Caching**: Add Redis for frequently accessed data
4. **Search**: Implement full-text search capabilities
5. **Archiving**: Move old completed tasks to archive tables

## Security Considerations

### Data Protection
1. **Input Validation**: All fields validated on client and server
2. **XSS Prevention**: Text fields properly escaped
3. **Data Sanitization**: HTML content stripped from inputs
4. **Access Control**: User-specific data isolation

### Privacy
1. **Data Encryption**: Sensitive fields encrypted at rest
2. **Audit Trail**: Track all CRUD operations
3. **Data Retention**: Implement data purging policies
4. **GDPR Compliance**: Support data export and deletion

---

This schema design provides a robust foundation for the Task Management application while maintaining simplicity and meeting all campus assessment requirements.
