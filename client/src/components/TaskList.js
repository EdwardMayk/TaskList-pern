import { useEffect, useState } from 'react'
import { Card, Button, Typography, CardContent } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export default function TaskList() {
  const [tasks, setTasks] = useState({})
  const navigate = useNavigate()
  const loadTasks = async () => {
    const response = await fetch('https://localhost:5000/tasks', {})
    const data = await response.json()
    setTasks(data)
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`https://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      })
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])
  return (
    <>
      <center>
        <h1>Task List</h1>
      </center>
      {tasks.map((task) => (
        <Card
          style={{
            margin: '1rem',
            marginTop: '30px',
            marginBottom: '.7rem',
            backgroundColor: '#f1f1f3',
            width: '210px',
            fontFamily: 'Arial',
            padding: '1rem',
            cursor: 'pointer',
            borderRadius: '.5rem',
            border: '1px solid rgba(0,0,255, .2)',
            trnsition: 'all .2s',
            boxShadow: '12px 12px 2px 1px rgba(0,0,255, .2)',
            float: 'right',
          }}
          sx={{}}
          key={task.id}
        >
          <CardContent style={{}}>
            <div>
              <Typography
                style={{
                  padding: '0',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                }}
              >
                {task.title}
              </Typography>
              <Typography
                style={{
                  color: '#3c3852',
                  fontSize: '0.86rem',
                }}
              >
                {task.description}
              </Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/tasks/${task.id}/edit`)}
                style={{
                  marginTop: '10px',
                  color: 'white',
                  background: '#7898e4',
                  boxShadow: '0.25rem 0.25rem #000',
                  transition: '0.2s',
                  hover: {
                    background: 'white',
                  },
                  active: {
                    transform: 'translateY(0)',
                    boxShadow: 'none',
                  },
                }}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(task.id)}
                style={{
                  marginLeft: '.5rem',
                  marginTop: '10px',
                  width: '100px',
                  background: '#191d39',
                  boxShadow: '0.25rem 0.25rem #000',
                }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
