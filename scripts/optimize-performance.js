#!/usr/bin/env node

/**
 * Performance optimization script
 * Run this script to analyze and optimize the application performance
 */

const fs = require('fs')
const path = require('path')

console.log('🚀 Starting performance optimization analysis...\n')

/**
 * Analyze bundle size and suggest optimizations
 */
function analyzeBundleSize() {
  console.log('📦 Analyzing bundle size...')
  
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  
  const dependencies = Object.keys(packageJson.dependencies || {})
  const devDependencies = Object.keys(packageJson.devDependencies || {})
  
  console.log(`   Dependencies: ${dependencies.length}`)
  console.log(`   Dev Dependencies: ${devDependencies.length}`)
  
  // Check for heavy dependencies
  const heavyDependencies = [
    'lodash',
    'moment',
    'axios',
    'jquery',
    'bootstrap'
  ]
  
  const foundHeavyDeps = dependencies.filter(dep => 
    heavyDependencies.some(heavy => dep.includes(heavy))
  )
  
  if (foundHeavyDeps.length > 0) {
    console.log('   ⚠️  Heavy dependencies found:', foundHeavyDeps.join(', '))
    console.log('   💡 Consider lighter alternatives or tree-shaking')
  } else {
    console.log('   ✅ No heavy dependencies detected')
  }
  
  console.log('')
}

/**
 * Check image optimization
 */
function checkImageOptimization() {
  console.log('🖼️  Checking image optimization...')
  
  const publicDir = path.join(process.cwd(), 'public')
  
  if (!fs.existsSync(publicDir)) {
    console.log('   ⚠️  Public directory not found')
    return
  }
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']
  const images = []
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        scanDirectory(filePath)
      } else if (imageExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
        images.push({
          path: filePath,
          size: stat.size,
          extension: path.extname(file).toLowerCase()
        })
      }
    })
  }
  
  scanDirectory(publicDir)
  
  console.log(`   Found ${images.length} images`)
  
  const largeImages = images.filter(img => img.size > 500 * 1024) // > 500KB
  const unoptimizedImages = images.filter(img => !['.webp', '.avif'].includes(img.extension))
  
  if (largeImages.length > 0) {
    console.log(`   ⚠️  ${largeImages.length} large images (>500KB) found`)
    console.log('   💡 Consider compressing or using Next.js Image optimization')
  }
  
  if (unoptimizedImages.length > 0) {
    console.log(`   ⚠️  ${unoptimizedImages.length} images not in modern formats`)
    console.log('   💡 Consider converting to WebP or AVIF')
  }
  
  if (largeImages.length === 0 && unoptimizedImages.length === 0) {
    console.log('   ✅ Images appear to be optimized')
  }
  
  console.log('')
}

/**
 * Check CSS optimization
 */
function checkCSSOptimization() {
  console.log('🎨 Checking CSS optimization...')
  
  const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.js')
  const globalCSSPath = path.join(process.cwd(), 'src/app/globals.css')
  
  if (fs.existsSync(tailwindConfigPath)) {
    console.log('   ✅ Tailwind CSS configuration found')
    
    const tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8')
    if (tailwindConfig.includes('purge') || tailwindConfig.includes('content')) {
      console.log('   ✅ CSS purging configured')
    } else {
      console.log('   ⚠️  CSS purging not configured')
      console.log('   💡 Configure content paths for unused CSS removal')
    }
  }
  
  if (fs.existsSync(globalCSSPath)) {
    const cssContent = fs.readFileSync(globalCSSPath, 'utf8')
    const cssSize = Buffer.byteLength(cssContent, 'utf8')
    
    console.log(`   Global CSS size: ${(cssSize / 1024).toFixed(2)}KB`)
    
    if (cssSize > 50 * 1024) { // > 50KB
      console.log('   ⚠️  Large global CSS file')
      console.log('   💡 Consider splitting into component-specific styles')
    }
  }
  
  console.log('')
}

/**
 * Check JavaScript optimization
 */
function checkJavaScriptOptimization() {
  console.log('⚡ Checking JavaScript optimization...')
  
  const nextConfigPath = path.join(process.cwd(), 'next.config.mjs')
  
  if (fs.existsSync(nextConfigPath)) {
    const nextConfig = fs.readFileSync(nextConfigPath, 'utf8')
    
    const optimizations = [
      { key: 'swcMinify', name: 'SWC Minification' },
      { key: 'compress', name: 'Compression' },
      { key: 'optimizePackageImports', name: 'Package Import Optimization' },
    ]
    
    optimizations.forEach(opt => {
      if (nextConfig.includes(opt.key)) {
        console.log(`   ✅ ${opt.name} enabled`)
      } else {
        console.log(`   ⚠️  ${opt.name} not configured`)
      }
    })
  } else {
    console.log('   ⚠️  Next.js config not found')
  }
  
  console.log('')
}

/**
 * Check caching configuration
 */
function checkCachingConfiguration() {
  console.log('💾 Checking caching configuration...')
  
  const apiCachePath = path.join(process.cwd(), 'src/lib/api-cache.js')
  const performancePath = path.join(process.cwd(), 'src/lib/performance.js')
  
  if (fs.existsSync(apiCachePath)) {
    console.log('   ✅ API caching utilities found')
  } else {
    console.log('   ⚠️  API caching not configured')
    console.log('   💡 Implement API response caching')
  }
  
  if (fs.existsSync(performancePath)) {
    console.log('   ✅ Performance utilities found')
  } else {
    console.log('   ⚠️  Performance utilities not found')
    console.log('   💡 Add performance monitoring and optimization')
  }
  
  console.log('')
}

/**
 * Check database optimization
 */
function checkDatabaseOptimization() {
  console.log('🗄️  Checking database optimization...')
  
  const migrationsDir = path.join(process.cwd(), 'supabase/migrations')
  
  if (fs.existsSync(migrationsDir)) {
    const migrations = fs.readdirSync(migrationsDir)
    const indexMigrations = migrations.filter(file => 
      file.includes('index') || file.includes('performance')
    )
    
    console.log(`   Found ${migrations.length} migrations`)
    
    if (indexMigrations.length > 0) {
      console.log(`   ✅ ${indexMigrations.length} performance-related migrations found`)
    } else {
      console.log('   ⚠️  No database index migrations found')
      console.log('   💡 Add database indexes for frequently queried columns')
    }
  } else {
    console.log('   ⚠️  No migrations directory found')
  }
  
  const dbOptimizationPath = path.join(process.cwd(), 'src/lib/database-optimizations.js')
  
  if (fs.existsSync(dbOptimizationPath)) {
    console.log('   ✅ Database optimization utilities found')
  } else {
    console.log('   ⚠️  Database optimization utilities not found')
    console.log('   💡 Implement query optimization and caching')
  }
  
  console.log('')
}

/**
 * Generate performance report
 */
function generatePerformanceReport() {
  console.log('📊 Performance Optimization Report')
  console.log('=====================================\n')
  
  analyzeBundleSize()
  checkImageOptimization()
  checkCSSOptimization()
  checkJavaScriptOptimization()
  checkCachingConfiguration()
  checkDatabaseOptimization()
  
  console.log('🎯 Recommendations:')
  console.log('   1. Run `npm run build` and analyze bundle size')
  console.log('   2. Use Next.js Image component for all images')
  console.log('   3. Implement lazy loading for non-critical components')
  console.log('   4. Add database indexes for frequently queried columns')
  console.log('   5. Configure API response caching')
  console.log('   6. Monitor Core Web Vitals in production')
  console.log('   7. Use service worker for static asset caching')
  console.log('   8. Optimize fonts with display: swap')
  console.log('')
  
  console.log('✨ Performance optimization analysis complete!')
}

// Run the analysis
generatePerformanceReport()