"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Form, Button, Container, Card } from 'react-bootstrap'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const param = {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword
      }
      const options = {
        method: 'POST',
        url: 'http://localhost:8181/api/auth/register',
        headers: {
          'Content-Type': 'application/json'
        },
        data: param,
      }

      axios(options)
          .then(() => {
            router.push('/auth/login')
          })
          .catch((error: unknown) => console.error(error))
    } catch {
      alert('Registration failed')
    }
  }

  return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '400px' }} className="p-4">
          <h3 className="text-center">Register</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
              />
            </Form.Group>
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
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
          <p className="text-center mt-3">
            Already have an account? <a href="/auth/login">Login</a>
          </p>
        </Card>
      </Container>
  )
}

export default Register
