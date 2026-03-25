import { useEffect, useState } from 'react'

const emptyState = {
  title: '',
  description: '',
  attachment: null,
}

function TaskForm({ selectedTask, onSubmit, onCancel, loading }) {
  const [formState, setFormState] = useState(emptyState)

  useEffect(() => {
    if (selectedTask) {
      setFormState({
        title: selectedTask.title || '',
        description: selectedTask.description || '',
        attachment: null,
      })
    } else {
      setFormState(emptyState)
    }
  }, [selectedTask])

  const handleChange = (event) => {
    const { name, value, files } = event.target
    setFormState((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = new FormData()
    payload.append('title', formState.title)
    payload.append('description', formState.description)
    if (formState.attachment) {
      payload.append('attachment', formState.attachment)
    }
    await onSubmit(payload)
    if (!selectedTask) {
      setFormState(emptyState)
    }
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>{selectedTask ? 'Edit Task' : 'Add Task'}</h2>

      <label>
        Title
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleChange}
          required
          placeholder="Enter title"
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
          rows="4"
          placeholder="Enter description"
        />
      </label>

      <label>
        Attachment
        <input type="file" name="attachment" onChange={handleChange} />
      </label>

      <div className="button-row">
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : selectedTask ? 'Update' : 'Create'}
        </button>
        {selectedTask && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
