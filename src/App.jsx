import { useEffect, useMemo, useState } from 'react'
import './App.css'

const starterTasks = [
  { id: 1, text: 'Finish the project proposal', completed: false, tag: 'Work' },
  { id: 2, text: 'Pick up groceries', completed: false, tag: 'Personal' },
  { id: 3, text: 'Read for 20 minutes', completed: true, tag: 'Wellness' },
]

const categories = ['Work', 'Personal', 'Wellness']

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('daily-focus-tasks')
    return savedTasks ? JSON.parse(savedTasks) : starterTasks
  })
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('All')
  const [tag, setTag] = useState('Personal')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('daily-focus-tasks', JSON.stringify(tasks))
  }, [tasks])

  const visibleTasks = useMemo(() => {
    const matchingTasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(search.trim().toLowerCase()),
    )
    if (filter === 'Active') return matchingTasks.filter((task) => !task.completed)
    if (filter === 'Completed') return matchingTasks.filter((task) => task.completed)
    return matchingTasks
  }, [filter, search, tasks])

  const remaining = tasks.filter((task) => !task.completed).length
  const completed = tasks.length - remaining
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

  function addTask(event) {
    event.preventDefault()
    const text = newTask.trim()
    if (!text) return

    setTasks((currentTasks) => [
      { id: Date.now(), text, completed: false, tag },
      ...currentTasks,
    ])
    setNewTask('')
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function removeTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  function clearCompleted() {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed))
  }

  function restoreStarterTasks() {
    setTasks(starterTasks)
    setFilter('All')
    setSearch('')
  }

  return (
    <main className="app-shell">
      <section className="todo-card" aria-labelledby="page-title">
        <header className="card-header">
          <div>
            <p className="eyebrow">Monday, August 3</p>
            <h1 id="page-title">Good morning, Alex</h1>
            <p className="subtitle">Let’s make today productive.</p>
          </div>
          <div className="calendar-icon" aria-hidden="true">
            <span>03</span>
          </div>
        </header>

        <form className="add-task" onSubmit={addTask}>
          <label className="sr-only" htmlFor="new-task">Add a new task</label>
          <input
            id="new-task"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="What needs to be done?"
          />
          <select
            aria-label="Task category"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <button type="submit" aria-label="Add task">+</button>
        </form>

        <div className="progress-section" aria-label={`${progress}% of tasks complete`}>
          <div className="progress-copy">
            <span>Today&apos;s progress</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="task-toolbar">
          <p><strong>{remaining}</strong> {remaining === 1 ? 'task' : 'tasks'} left</p>
          <div className="filters" aria-label="Filter tasks">
            {['All', 'Active', 'Completed'].map((option) => (
              <button
                className={filter === option ? 'active' : ''}
                key={option}
                onClick={() => setFilter(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <label className="search-field" htmlFor="task-search">
          <span className="sr-only">Search tasks</span>
          <span aria-hidden="true">⌕</span>
          <input
            id="task-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your tasks"
          />
        </label>

        <ul className="task-list">
          {visibleTasks.length ? visibleTasks.map((task) => (
            <li className={task.completed ? 'completed' : ''} key={task.id}>
              <button
                className="check-button"
                onClick={() => toggleTask(task.id)}
                aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
                type="button"
              >
                {task.completed && '✓'}
              </button>
              <span className="task-text">{task.text}</span>
              <span className={`tag ${task.tag.toLowerCase()}`}>{task.tag}</span>
              <button className="delete-button" onClick={() => removeTask(task.id)} type="button" aria-label={`Delete ${task.text}`}>×</button>
            </li>
          )) : (
            <li className="empty-state">
              <span>No matching tasks yet.</span>
              {tasks.length === 0 && (
                <button type="button" onClick={restoreStarterTasks}>Restore sample tasks</button>
              )}
            </li>
          )}
        </ul>

        <footer>
          <span>{tasks.length} total {tasks.length === 1 ? 'task' : 'tasks'}</span>
          <button onClick={clearCompleted} type="button">Clear completed</button>
        </footer>
      </section>
    </main>
  )
}

export default App
