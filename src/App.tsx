import { useEffect, useState } from "react"
import penIcon from "./images/pen.png"
import deleteIcon from "./images/delete.png"
import "./styles/App.css"

type Priority = {
  label: string
  color: string
}

type Task = {
  id: number
  text: string
  completed: boolean
  priority: Priority
  category: string
}

function App() {
  const [task, setTask] = useState("")
  const [taskArr, setTaskArr] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  const handleCaps = (text: string) => {
    return text.replace(/^(\s*)([a-z])/, (_, spaces, firstLetter): string => {
      return spaces + firstLetter.toUpperCase()
    })
  }

  const handleAddTask = () => {
    const formattedText = handleCaps(task)
    if (formattedText === "") return
    setTaskArr((prev) => [
      ...prev,
      { id: Date.now(), text: formattedText, completed: false, priority: selectedPriority, category: selectedCategory },
    ]) // task.trim() resets the blank spaces
    setTask("")
  }

  const handleDeleteTask = (indexToDelete: number) => {
    setTaskArr((prev) => prev.filter((task) => task.id !== indexToDelete))
  }

  const handleToggleCompleted = (indexToToggle: number) => {
    setTaskArr((prev) =>
      prev.map((task) => (task.id === indexToToggle ? { ...task, completed: !task.completed } : task)),
    )
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskArr))
  }, [taskArr])

  const completedTasks = taskArr.filter((task) => task.completed).length
  const totalCount = taskArr.length

  const handleClearCompleted = () => {
    setTaskArr((prev) => prev.filter((task) => !task.completed))
  }

  const [editingId, setEditingId] = useState<number | null>(null) // task to be edited
  const [editingText, setEditingText] = useState("") // current input given

  const handleStartEdit = (task: { id: number; text: string }) => {
    setEditingId(task.id)
    setEditingText(task.text)
  }

  const handleSaveEdit = (id: number) => {
    setTaskArr((prev) => prev.map((task) => (task.id === id ? { ...task, text: handleCaps(editingText) } : task)))

    setEditingId(null)
    setEditingText("")
  }

  const priority = [
    { label: "High", color: "red" },
    { label: "Medium", color: "gold" },
    { label: "Low", color: "green" },
  ]

  const [selectedPriority, setSelectedPriority] = useState(priority[0])

  const categories = ["Personal", "Work", "School"]

  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return (
    <div className="app">
      <div className="task-manager">
        <div className="title-container">
          <h1 className="title">
            <img className="lexora-logo" src="../public/lexora-logo.svg" alt="logo" />
          </h1>
        </div>

        <div className="counts-and-clear">
          <p className="total-counts">
            {completedTasks} of {totalCount} tasks completed
          </p>

          <button
            className={`clear-button ${completedTasks > 0 ? "clear-button-glow" : ""}`}
            type="button"
            onClick={handleClearCompleted}
          >
            <span>
              <img className="delete-icon-clear" src={deleteIcon} alt="Delete" />
            </span>
            Clear Completed
          </button>
        </div>

        <div className="input-main-section">
          <div className="input-task-row">
            <input
              type="text"
              placeholder="Type here"
              value={task}
              onChange={(e) => setTask(handleCaps(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTask()
              }}
              className="task-input"
            />

            <div className="priority-select-wrapper">
              <span className="priority-circle" style={{ backgroundColor: selectedPriority.color }} />

              <select
                className="priority-select"
                value={selectedPriority.label}
                onChange={(e) => {
                  const nextPriority = priority.find((item) => item.label === e.target.value)
                  if (nextPriority) setSelectedPriority(nextPriority)
                }}
              >
                {priority.map((item) => (
                  <option key={item.label} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <select
              className="categories-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option className="category-text" key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button type="button" className="add-button" onClick={handleAddTask}>
              + Add
            </button>
          </div>

          <ul className="task-list">
            {taskArr.map((t) => (
              <li className="task-item" key={t.id}>
                <input
                  className="checkbox-button"
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleToggleCompleted(t.id)}
                />

                {editingId === t.id ? (
                  <input
                    className="edit-input"
                    value={editingText}
                    onChange={(e) => setEditingText(handleCaps(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") return handleSaveEdit(t.id)
                    }}
                  />
                ) : (
                  <span className={t.completed ? "task-text completed" : "task-text"}>{t.text}</span>
                )}

                <div className="task-meta">
                  <span
                    className="task-priority-circle"
                    style={{ backgroundColor: t.priority?.color }}
                    title={t.priority?.label}
                  ></span>
                  <button className="category-task">{t.category ?? "Personal"}</button>
                </div>

                {editingId === t.id ? (
                  <button className="save-button" type="button" onClick={() => handleSaveEdit(t.id)}>
                    Save
                  </button>
                ) : (
                  <button className="edit-button" type="button" onClick={() => handleStartEdit(t)}>
                    <img className="pen-icon" src={penIcon} alt="Edit" />
                    Edit
                  </button>
                )}

                <button className="delete-button" type="button" onClick={() => handleDeleteTask(t.id)}>
                  <img className="delete-icon" src={deleteIcon} alt="Delete" />
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
