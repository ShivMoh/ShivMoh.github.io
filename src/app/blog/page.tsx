"use client"

import { useState, useEffect } from 'react'
import { Box, TextField, Chip, CircularProgress } from "@mui/material"
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

    filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
        <CircularProgress sx={{ color: 'var(--foreground)' }} />
      </Box>
    )
  }

  return (
    <div className="blog-page">
      <h1 className="blog-header">Blog</h1>

      <div className="blog-search-filters">
        <TextField
          fullWidth
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              color: 'var(--foreground)',
              fontFamily: 'inherit',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.25)' },
              '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.45)' },
              '&.Mui-focused fieldset': { borderColor: 'var(--accent)' },
            },
            '& .MuiOutlinedInput-input::placeholder': { opacity: 0.5 },
          }}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {allTags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => toggleTag(tag)}
              variant={selectedTags.includes(tag) ? "filled" : "outlined"}
              sx={{
                cursor: 'pointer',
                fontFamily: 'inherit',
                color: selectedTags.includes(tag) ? '#1d1d1d' : 'var(--foreground)',
                backgroundColor: selectedTags.includes(tag) ? 'var(--foreground)' : 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                '&:hover': {
                  backgroundColor: selectedTags.includes(tag) ? 'var(--foreground)' : 'rgba(255, 255, 255, 0.08)',
                },
              }}
            />
          ))}
        </Box>
      </div>

      {filteredEntries.length === 0 ? (
        <p className="blog-no-posts">No blog posts found. Check back soon!</p>
      ) : (
        <div className="blog-entries">
          {filteredEntries.map(entry => (
            <article className="blog-entry" key={entry.id}>
              <a href={entry.path} className="blog-entry-title">{entry.title}</a>
              <p className="blog-entry-date">{formatDate(entry.date)}</p>
              <p className="blog-entry-excerpt">{entry.excerpt}</p>
              <div className="blog-entry-tags">
                {entry.tags.map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
