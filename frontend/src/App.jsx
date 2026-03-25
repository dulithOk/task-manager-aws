import { useEffect, useState } from 'react'
import { createTask, deleteTask, fetchTasks, updateTask } from './api'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const loadTasks = async () => {
    try {
      const data = await fetchTasks()
      setTasks(data)
    } catch (error) {
      setMessage('Failed to load tasks.')
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleSubmit = async (payload) => {
    setLoading(true)
    setMessage('')
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, payload)
        setMessage('Task updated successfully.')
      } else {
        await createTask(payload)
        setMessage('Task created successfully.')
      }
      setSelectedTask(null)
      await loadTasks()
    } catch (error) {
      setMessage('Something went wrong while saving the task.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?')
    if (!confirmed) return

    try {
      await deleteTask(id)
      setMessage('Task deleted successfully.')
      if (selectedTask?.id === id) {
        setSelectedTask(null)
      }
      await loadTasks()
    } catch (error) {
      setMessage('Failed to delete task.')
    }
  }

  return (
    <main className="page-wrapper">
      <div className="container">
        <header className="hero">
          <h1>Task CRUD Application</h1>
          <p>Minimal full stack app with Django, React, PostgreSQL, Docker and AWS-ready deployment.</p>
        </header>

        {message && <div className="message">{message}</div>}

        <section className="grid-layout">
          <TaskForm
            selectedTask={selectedTask}
            onSubmit={handleSubmit}
            onCancel={() => setSelectedTask(null)}
            loading={loading}
          />
          <TaskList tasks={tasks} onEdit={setSelectedTask} onDelete={handleDelete} />
        </section>
      </div>
    </main>
  )
}

export default App
