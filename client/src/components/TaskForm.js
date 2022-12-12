import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
  TextareaAutosize,
} from '@mui/material'

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      loadTask(params.id)
    }
  }, [params.id])

  const loadTask = async (id) => {
    const res = await fetch(
      'https://pern-stack-deploy.herokuapp.com/tasks/' + id
    )
    const data = await res.json()
    setTask({ title: data.title, description: data.description })
    setEditing(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (editing) {
        const response = await fetch(
          'https://pern-stack-deploy.herokuapp.com/tasks/' + params.id,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
          }
        )
        await response.json()
      } else {
        const response = await fetch(
          'https://pern-stack-deploy.herokuapp.com/tasks',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
          }
        )
        await response.json()
      }

      setLoading(false)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value })
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: '#445892',
            padding: '2rem',
            fontFamily: 'Arial',
            borderRadius: '.5rem',
            border: '1px solid rgba(0,0,255, .2)',
            trnsition: 'all .2s',
            boxShadow: '12px 12px 2px 1px rgba(0,0,255, .2)',
            float: 'right',
          }}
        >
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? 'Edit Task' : 'Create Task'}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Write your tittle"
                value={task.title}
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="title"
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextareaAutosize
                variant="filled"
                value={task.description}
                sx={{ display: 'block', margin: '.5rem 0' }}
                label="Write your description"
                multiline
                rows={4}
                name="description"
                onChange={handleChange}
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />

              <Button
                type="submit"
                variant="contained"
                style={{
                  background: '#eee',
                  color: '#120907',
                  marginTop: '1rem',
                }}
                disabled={!task.title || !task.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  'Save'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TaskForm
