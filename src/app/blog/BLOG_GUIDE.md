# Blog System Guide

Welcome to your blog system! Here's how to add and manage blog posts.

## Quick Start

### Adding a New Blog Post

1. **Create a new HTML file** in `/public/blog/entries/` named something like `my-post.html`
   - Use the included `first-blog.html` as a template
   - You can fully customize the HTML and CSS

2. **Update the metadata** in `/src/app/blog/entries.json`:
   ```json
   {
     "id": "my-post",
     "title": "My Amazing Blog Post",
     "date": "2024-05-18",
     "excerpt": "A short summary of what this post is about.",
     "tags": ["tag1", "tag2"],
     "path": "/blog/entries/my-post.html"
   }
   ```

3. **That's it!** The blog listing page will automatically pick up your new post.

## Metadata Fields

- **id**: Unique identifier in kebab-case (used for sorting/filtering)
- **title**: The title that appears in the blog listing
- **date**: Publication date in YYYY-MM-DD format (used for sorting)
- **excerpt**: Short description shown in the blog listing
- **tags**: Array of tags for filtering (users can click these to filter)
- **path**: Path to your HTML file (should start with `/blog/entries/`)

## Features

✅ **Search** - Users can search by title or excerpt text  
✅ **Tag Filtering** - Click tags to filter posts by tag  
✅ **Chronological Order** - Posts sorted newest first  
✅ **Responsive Design** - Works on all screen sizes  
✅ **Custom HTML** - Each post is a full HTML file you can customize  

## File Structure

```
/public/blog/entries/
  ├── first-blog.html (sample post)
  ├── my-awesome-post.html
  └── another-post.html

/src/app/blog/
  ├── page.tsx (the blog listing page - auto-generated)
  ├── entries.json (metadata for all posts)
  ├── blog.css (styling)
  └── BLOG_GUIDE.md (this file)
```

## Tips

- **Use descriptive URLs**: Name your HTML files something meaningful like `how-to-build-a-blog.html`
- **Keep excerpts short**: 150-200 characters works well for listing display
- **Use consistent tags**: This makes filtering more useful
- **Date format matters**: Always use YYYY-MM-DD format for proper sorting
- **HTML is flexible**: You can add images, code blocks, blockquotes - full HTML support

## Example: Complete Blog Post Entry

**entries.json:**
```json
{
  "id": "learning-typescript",
  "title": "Getting Started with TypeScript",
  "date": "2024-05-17",
  "excerpt": "TypeScript adds static typing to JavaScript. Here's how I learned it and why I love it.",
  "tags": ["typescript", "learning", "javascript"],
  "path": "/blog/entries/learning-typescript.html"
}
```

**File**: `/public/blog/entries/learning-typescript.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Getting Started with TypeScript | Shivesh Mohamed</title>
    <!-- (copy the style block from first-blog.html) -->
</head>
<body>
    <div class="blog-container">
        <a href="/blog" class="blog-back-link">← Back to Blog</a>
        <header class="blog-header">
            <h1 class="blog-title">Getting Started with TypeScript</h1>
            <div class="blog-meta">
                <span>May 17, 2024</span>
                <span>8 min read</span>
            </div>
        </header>
        
        <main class="blog-content">
            <!-- Your content here -->
        </main>
        
        <div class="blog-tags">
            <span class="blog-tag">typescript</span>
            <span class="blog-tag">learning</span>
            <span class="blog-tag">javascript</span>
        </div>
    </div>
</body>
</html>
```

## Styling Your Posts

Each HTML file includes a complete CSS setup that matches your site's dark theme. You can:

- Modify the CSS in the `<style>` block
- Add custom images with `<img>` tags
- Use code blocks with `<pre><code>` tags
- Add blockquotes with `<blockquote>` tags
- Use lists, headings, and any standard HTML

Happy blogging! 🚀
