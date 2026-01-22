# Rosemount 2051C Product Catalog Website

A comprehensive product catalog website for Rosemount 2051C Differential and Gauge Pressure Transmitters built with Hugo and the Product Launch theme.

## Features

- **Interactive Product Catalog**: Browse over 15,000 base configurations with advanced filtering
- **Inquiry Forms**: Request quotes for specific product configurations
- **SEO Optimized**: Comprehensive SEO implementation including:
  - Meta tags (Open Graph, Twitter Card, Schema.org)
  - Sitemap generation
  - Robots.txt with crawl-delay
  - Structured data for products and organization
- **Anti-Scraping Protection**: Multiple layers including:
  - Rate limiting
  - Mouse movement tracking
  - Honeypot fields
  - Context menu prevention
  - Copy-paste prevention
  - Bot user-agent blocking
- **Responsive Design**: Works on all devices
- **Fast Performance**: Static site generation with Hugo

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/sadniabdel/rosemount2051c.git
   cd rosemount2051c
   ```

2. Initialize submodules (theme):
   ```bash
   git submodule update --init --recursive
   ```

3. Install Node.js dependencies:
   ```bash
   npm install
   ```

4. Run Hugo development server:
   ```bash
   hugo server -D
   ```

5. Visit `http://localhost:1313` in your browser

## Configuration

### Form Integration

Update the form action URL in these files with your Formspree or form service endpoint:
- `content/contact/_index.md`
- `layouts/_default/catalog.html` (inquiry modal)

Replace `https://formspree.io/f/your-id` with your actual form endpoint.

### Google Analytics

Add your Google Analytics ID in `hugo.toml`:
```toml
[params]
  googleAnalytics = "G-XXXXXXXXXX"
```

### Email

Update email addresses in:
- `content/contact/_index.md`
- `static/security.txt`

## Deployment

### Cloudflare Pages

This site is configured for deployment on Cloudflare Pages.

**Cloudflare Pages Configuration:**
1. Go to your Cloudflare dashboard → Workers & Pages
2. Connect your GitHub repository
3. Configure build settings:
   - **Build command:** `hugo --gc --minify`
   - **Build output directory:** `public`
   - **Root directory:** `/`
4. Add environment variables:
   - `HUGO_VERSION`: `0.121.0` (or your preferred version)
   - `NODE_VERSION`: `18`
   - `HUGO_ENV`: `production`

The site will automatically deploy when you push to your main branch.

**Manual Build:**
```bash
hugo --gc --minify
```

The static files will be in the `public/` directory.

## Anti-Scraping Features

The catalog implements multiple anti-scraping measures:
- Rate limiting (100 requests per minute)
- Mouse movement tracking
- Honeypot form fields
- Disabled right-click on sensitive elements
- Copy-paste prevention on product listings
- Bot user-agent blocking in robots.txt
- Crawl-delay directive

## SEO Features

- Comprehensive meta tags
- Open Graph and Twitter Card support
- Schema.org structured data
- Automatic sitemap generation
- Canonical URLs
- Robots.txt with proper directives
- Security.txt for responsible disclosure

## License

All rights reserved.

## Support

For support or inquiries, contact: sales@rosemount2051c.com