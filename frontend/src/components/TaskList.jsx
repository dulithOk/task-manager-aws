function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="card list-card">
      <div className="list-header">
        <h2>Tasks</h2>
        <span>{tasks.length} item(s)</span>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-state">No tasks found.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description || 'No description added.'}</p>
                <small>Created: {new Date(task.created_at).toLocaleString()}</small>
                {task.attachment_url && (
                  <div>
                    <a href={task.attachment_url} target="_blank" rel="noreferrer">
                      View attachment
                    </a>
                  </div>
                )}
              </div>
              <div className="button-row vertical">
                <button type="button" onClick={() => onEdit(task)}>
                  Edit
                </button>
                <button type="button" className="danger" onClick={() => onDelete(task.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList
