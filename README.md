# Research Paper Browser

A modern, responsive web application for browsing and exploring academic research papers. Built with Next.js 15 and SCSS modules, featuring advanced search, filtering, sorting, and pagination capabilities.

## 🚀 Features

### Core Functionality
- **Data Fetching**: Asynchronous API integration with loading, success, and error states
- **Card UI Display**: Professional paper cards showing title, authors, year, journal, DOI, impact factor, and PDF links
- **Search Functionality**: Real-time search with category selection (Title, Authors, Journal, DOI)
- **Sorting**: Multi-field sorting (Title, Year, Impact Factor, Authors, Journal) with ascending/descending options
- **Pagination**: Client-side pagination with customizable page sizes and navigation controls
- **Details View**: Modal popup displaying complete paper metadata and abstract

### Advanced Features
- **Debounced Search**: Optimized search with 300ms delay to prevent excessive API calls
- **Skeleton Loading**: Beautiful loading animations with skeleton cards
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **SCSS Variables**: Fully customizable theming through SCSS variables
- **Error Handling**: Comprehensive error states with retry functionality
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4
- **Styling**: SCSS Modules with CSS variables
- **Font**: Inter (Google Fonts)
- **Icons**: Custom SVG icons
- **API**: RESTful API integration with Strapi filtering support

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crimson-interactive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

The application is built with SCSS variables for easy customization. All colors, typography, spacing, and other design tokens are defined in `src/styles/variables.scss`:

```scss
// Colors
$primary-color: #2563eb;
$secondary-color: #64748b;
$accent-color: #f59e0b;

// Typography
$font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-size-base: 1rem;

// Spacing
$spacing-md: 1rem;
$spacing-lg: 1.5rem;

// And many more...
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and font imports
│   ├── layout.js            # Root layout component
│   ├── page.js              # Main page component
│   └── page.module.scss     # Main page styles
├── components/
│   ├── Card.js              # Paper card component
│   ├── Card.module.scss     # Card styles
│   ├── SearchBar.js         # Search functionality
│   ├── SearchBar.module.scss
│   ├── SortControls.js      # Sorting controls
│   ├── SortControls.module.scss
│   ├── Pagination.js        # Pagination component
│   ├── Pagination.module.scss
│   ├── Modal.js             # Details modal
│   ├── Modal.module.scss
│   ├── Loading.js           # Loading skeleton
│   └── Loading.module.scss
├── styles/
│   └── variables.scss       # SCSS variables and design tokens
└── utils/
    ├── api.js               # API integration functions
    └── filters.js           # Filtering, sorting, and pagination utilities
```

## 🔧 API Integration

The application integrates with the research papers API:

- **Endpoint**: `https://easydash.enago.com/acceptedpapers`
- **Method**: GET
- **Features**: Strapi filtering, pagination, and sorting support
- **Error Handling**: Comprehensive error states and retry mechanisms

### API Functions

- `fetchPapers()`: Fetch all papers
- `fetchPaperById(id)`: Fetch single paper by ID
- `fetchPapersWithFilters(params)`: Fetch papers with Strapi filtering

## 🎯 Key Features Explained

### Search & Filtering
- **Real-time Search**: Debounced search with 300ms delay
- **Multi-field Search**: Search by title, authors, journal, or DOI
- **Dynamic Filtering**: Results update as you type

### Sorting
- **Multi-field Sorting**: Sort by title, year, impact factor, authors, or journal
- **Bidirectional**: Ascending and descending order
- **Visual Indicators**: Clear indication of current sort field and order

### Pagination
- **Client-side Pagination**: Fast navigation without API calls
- **Configurable Page Sizes**: 6, 12, 24, or 48 items per page
- **Smart Navigation**: Previous/Next buttons and page numbers
- **Results Counter**: Shows current range and total results

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Breakpoints**: 
  - Small: 640px
  - Medium: 768px
  - Large: 1024px
  - Extra Large: 1280px
- **Flexible Grid**: Cards adapt to screen size

## 🚀 Performance Optimizations

- **Debounced Search**: Prevents excessive API calls
- **Memoized Calculations**: Optimized filtering and sorting
- **Lazy Loading**: Images load only when needed
- **Efficient Rendering**: React.memo and useCallback optimizations
- **Skeleton Loading**: Better perceived performance

## 🎨 Design System

The application follows a consistent design system:

- **Color Palette**: Professional blue and gray tones
- **Typography**: Inter font family with consistent sizing
- **Spacing**: 8px grid system
- **Shadows**: Layered shadow system for depth
- **Border Radius**: Consistent rounded corners
- **Animations**: Smooth transitions and hover effects

## 🔍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Support

- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 13+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check if the API endpoint is accessible
   - Verify CORS settings
   - Check browser console for errors

2. **Styling Issues**
   - Ensure SCSS is properly compiled
   - Check for missing dependencies
   - Verify CSS module imports

3. **Performance Issues**
   - Check for memory leaks in React components
   - Verify debouncing is working correctly
   - Monitor API call frequency

## 📞 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using Next.js and SCSS**