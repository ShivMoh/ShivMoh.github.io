"use client"

import { useState, useEffect } from 'react'
import { Box, TextField, Chip, Link, Card, CardContent, Typography, CircularProgress } from "@mui/material"
import './blog.css'

interface BlogEntry {
  id: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  path: string
}

export default function BlogPage() {
  const [entries, setEntries] = useState<BlogEntry[]>([])
  const [filteredEntries, setFilteredEntries] = useState<BlogEntry[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await fetch('/blog/entries.json')
        const data = await response.json()
        setEntries(data)

        // Extract all unique tags
        const tags = new Set<string>()
        data.forEach((entry: BlogEntry) => {
          entry.tags.forEach(tag => tags.add(tag))
        })
        setAllTags(Array.from(tags).sort())
        setLoading(false)
      } catch (error) {
        console.error('Failed to load blog entries:', error)
        setLoading(false)
      }
    }

    loadEntries()
  }, [])

  useEffect(() => {
    let filtered = entries

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(entry =>
        entry.title.toLowerCase().includes(query) ||
        entry.excerpt.toLowerCase().includes(query)
      )
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(entry =>
        selectedTags.some(tag => entry.tags.includes(tag))
      )
    }

    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setFilteredEntries(filtered)
  }, [searchQuery, selectedTags, entries])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ py: 5, px: 2, maxWidth: '900px', mx: 'auto' }}>
      <Typography variant="h3" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        Blog
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
            },
            '& .MuiOutlinedInput-input::placeholder': {
              opacity: 0.5,
            },
          }}
        />

        <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
          Filter by tags:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {allTags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => toggleTag(tag)}
              variant={selectedTags.includes(tag) ? "filled" : "outlined"}
              sx={{
                cursor: 'pointer',
                color: selectedTags.includes(tag) ? '#000' : 'white',
                backgroundColor: selectedTags.includes(tag) ? 'white' : 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  backgroundColor: selectedTags.includes(tag) ? 'white' : 'rgba(255, 255, 255, 0.1)',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {filteredEntries.length === 0 ? (
        <Typography sx={{ textAlign: 'center', opacity: 0.6 }}>
          No blog posts found. Check back soon!
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {filteredEntries.map(entry => (
            <Link key={entry.id} href={entry.path} underline="none">
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {entry.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
                    {formatDate(entry.date)}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {entry.excerpt}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {entry.tags.map(tag => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  )
}
