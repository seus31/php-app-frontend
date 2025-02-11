"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Form, Button, Container, Card } from 'react-bootstrap'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const param = { email: email, password: password }
      const options = {
        method: 'POST',
        url: 'http://localhost:8181/api/auth/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: param,
      }

      axios(options)
          .then((response: { data: { access_token: string } }) => {
            console.log(response.data)
            localStorage.setItem('token', response.data.access_token)
            router.push('/admin/dashboard')
          })
          .catch((error: unknown) => console.error(error))
    } catch {
      alert('Invalid email or password')
    }
  }

  return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '400px' }} className="p-4">
          <h3 className="text-center">Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <p className="text-center mt-3">
            Don't have an account? <a href="/auth/register">Register</a>
          </p>
        </Card>
      </Container>
  )
}

export default Login
