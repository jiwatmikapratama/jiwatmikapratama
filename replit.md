# Portfolio Website - Alex Rivera

## Overview
This is a static portfolio website showcasing Alex Rivera's work as a Full Stack Developer. The website features a modern, responsive design with dark theme and emerald green accents.

## Project Structure
- **Frontend**: Pure HTML, CSS, and JavaScript (no build system required)
- **Server**: Python HTTP server for serving static files
- **Port**: 5000

## Pages
1. **index.html** - Home page with hero section, about section, skills, projects preview, achievements, and gallery
2. **edu-experience.html** - Education and work experience timeline
3. **projects.html** - Project showcase with image carousels
4. **achievements.html** - Awards and achievements
5. **gallery.html** - Photo gallery with filters and carousels

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN), custom CSS
- **Libraries**: 
  - Font Awesome (icons)
  - Swiper.js (carousels)
  - GLightbox (image lightbox)
  - Google Fonts (Inter, Poppins)

## Recent Changes
- **October 14, 2025**: Customized Swiper.js to match home carousel style
  - Updated Swiper styling (navigation buttons, pagination dots, counter) to match home carousel
  - Added slide counter (current/total) to Projects and Gallery Swiper carousels
  - Fixed Gallery pagination issue with Swiper.update() for proper rendering
  - Ensured responsive design works perfectly across all breakpoints
  - Navigation buttons show on hover (desktop) and always visible on mobile
  - Pagination dots styled consistently with home page carousel

- **October 14, 2025**: Initial setup in Replit environment
  - Created Python HTTP server to serve static files on port 5000
  - Added .gitignore for Python and common development files
  - Configured workflow to run the server
  - Added cache control headers to prevent browser caching issues

## Running the Project
The website runs automatically via the configured workflow. The Python server serves static files from the root directory on port 5000.

## Architecture
- **Static Website**: No backend processing, all content is static
- **Client-side JavaScript**: Handles interactivity including:
  - Mobile menu toggle
  - Image carousels
  - Gallery filtering
  - Search functionality
  - Pagination
  - Smooth scrolling
  - Back to top button
  
## User Preferences
(No user preferences recorded yet)
