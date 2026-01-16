# Bug Quality Dashboard - Components Documentation

## Overview

This project implements a comprehensive Bug Quality Dashboard with reusable components built using React, Vite, and Tailwind CSS.

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx       # Main navigation sidebar
│   │   ├── Header.jsx        # Page header component
│   │   └── index.js          # Layout exports
│   └── ui/
│       ├── Badge.jsx         # Status and category badges
│       ├── Button.jsx        # Reusable button component
│       ├── SearchInput.jsx   # Search input with icon
│       ├── StatCard.jsx      # Statistics display cards
│       ├── BugTable.jsx      # Bug list table
│       └── index.js          # UI exports
├── pages/
│   ├── BugDashboard.jsx      # Main dashboard page
│   ├── Dashboard.jsx         # Old dashboard (backup)
│   └── login/
│       └── Login.jsx         # Login page
└── App.jsx                   # Main app with routing
```

## Reusable Components

### Layout Components

#### 1. Sidebar
**Location:** `src/components/layout/Sidebar.jsx`

A fully-featured navigation sidebar with logo, menu items, and user profile section.

**Features:**
- Logo section with app branding
- Navigation menu with active states
- Material icons support
- Notification badges
- User profile with logout functionality

**Usage:**
```jsx
import Sidebar from './components/layout/Sidebar';

<Sidebar />
```

#### 2. Header
**Location:** `src/components/layout/Header.jsx`

Page header with title and action buttons.

**Props:**
- `title` (string): The header title text

**Usage:**
```jsx
import Header from './components/layout/Header';

<Header title="Bug Quality & Lifecycle Dashboard" />
```

### UI Components

#### 3. StatCard
**Location:** `src/components/ui/StatCard.jsx`

Displays statistics with icons, trends, and comparisons.

**Props:**
- `title` (string): Card title
- `value` (string): Main statistic value
- `icon` (string): Material icon name
- `iconColor` (string): Icon color class
- `iconBgColor` (string): Icon background color class
- `trend` (string): 'up' or 'down'
- `trendValue` (string): Trend percentage
- `trendLabel` (string): Trend description

**Usage:**
```jsx
import StatCard from './components/ui/StatCard';

<StatCard
  title="Total Bugs"
  value="1,248"
  icon="pest_control"
  iconColor="text-primary/80"
  iconBgColor="bg-primary/10"
  trend="up"
  trendValue="+12%"
  trendLabel="vs last month"
/>
```

#### 4. SearchInput
**Location:** `src/components/ui/SearchInput.jsx`

Search input field with icon.

**Props:**
- `placeholder` (string): Input placeholder text
- `value` (string): Input value
- `onChange` (function): Change handler

**Usage:**
```jsx
import SearchInput from './components/ui/SearchInput';

<SearchInput
  placeholder="Search bugs by ID or title..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

#### 5. Button
**Location:** `src/components/ui/Button.jsx`

Reusable button component with variants and icons.

**Props:**
- `children` (node): Button text
- `icon` (string): Material icon name
- `variant` (string): 'primary' or 'default'
- `onClick` (function): Click handler
- `className` (string): Additional classes

**Usage:**
```jsx
import Button from './components/ui/Button';

<Button variant="primary" icon="add">
  New Bug
</Button>

<Button icon="filter_list">
  Filters
</Button>
```

#### 6. Badge
**Location:** `src/components/ui/Badge.jsx`

Status and category badges with multiple variants.

**Props:**
- `children` (node): Badge content
- `variant` (string): Badge style variant
- `removable` (boolean): Show remove button
- `onRemove` (function): Remove handler

**Variants:**
- `squad` - Gray (for squad names)
- `in-progress` - Blue
- `open` - Yellow
- `review` - Purple
- `closed` - Green
- `quality-high` - Green
- `quality-med` - Yellow
- `quality-low` - Red
- `filter` - Blue

**Usage:**
```jsx
import Badge from './components/ui/Badge';

<Badge variant="in-progress">In Progress</Badge>

<Badge variant="filter" removable onRemove={handleRemove}>
  Status: Open
</Badge>
```

#### 7. BugTable
**Location:** `src/components/ui/BugTable.jsx`

Displays bugs in a sortable table format.

**Props:**
- `bugs` (array): Array of bug objects

**Bug Object Structure:**
```javascript
{
  id: 'BUG-2490',
  title: 'Bug title',
  squad: 'Squad name',
  status: 'In Progress',
  quality: '85% High',
  reporter: 'Name',
  assignee: 'Name',
  created: 'Date'
}
```

**Usage:**
```jsx
import BugTable from './components/ui/BugTable';

<BugTable bugs={bugsArray} />
```

## Theme Configuration

Custom Tailwind theme colors defined in `tailwind.config.js`:

```javascript
colors: {
  "primary": "#135bec",
  "primary-hover": "#1d4ed8",
  "background-light": "#f8f9fc",
  "background-dark": "#101622",
  "surface": "#ffffff",
  "text-main": "#0d121b",
  "text-muted": "#4c669a",
  "border-color": "#e7ebf3",
}
```

## Custom Styles

Custom scrollbar styling is defined in `src/index.css`:

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
```

## Fonts

The project uses:
- **Inter** - Primary font family
- **Material Symbols Outlined** - Icon font

Loaded via Google Fonts in `index.html`.

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Page Routes

- `/` - Login page
- `/dashboard` - Bug Quality Dashboard
- `*` - Redirects to login

## Features

1. **Responsive Design** - Works on all screen sizes
2. **Reusable Components** - All UI elements are modular
3. **Material Icons** - Professional icon set
4. **Custom Theme** - Consistent color palette
5. **Interactive Elements** - Filters, search, and pagination
6. **Clean Code** - Well-organized component structure

## Development Notes

- All components use functional React with hooks
- Tailwind CSS for styling (no CSS modules)
- Components are in separate files for better maintainability
- Index files for cleaner imports
- Props validation can be added with PropTypes if needed
