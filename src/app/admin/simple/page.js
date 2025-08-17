'use client'

import { useState } from 'react'

export default function SimpleLoginPage() {
  const [email, setEmail] = useState('admin@absadmultisynergy.com')
  const [password, setPassword] = useState('admin123456')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage(`Attempted login with: ${email}`)
    console.log('Login attempt:', { email, password })
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '400px', 
        width: '100%', 
        padding: '20px'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '32px', 
          borderRadius: '8px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            Simple Admin Login
          </h1>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Testing basic login functionality
          </p>
          
          {message && (
            <div style={{ 
              marginBottom: '16px', 
              padding: '12px', 
              backgroundColor: '#dbeafe', 
              border: '1px solid #3b82f6', 
              borderRadius: '4px',
              color: '#1e40af'
            }}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Email
              </label>
              <input 
                type="email" 
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Password
              </label>
              <input 
                type="password" 
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit"
              style={{ 
                width: '100%', 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                padding: '12px', 
                borderRadius: '4px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Test Login
            </button>
          </form>
          
          <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
            <p>Default credentials:</p>
            <p>Email: admin@absadmultisynergy.com</p>
            <p>Password: admin123456</p>
          </div>
        </div>
      </div>
    </div>
  )
}