import { PublicLayout } from '@/components/layout/public-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Ship, Truck, Globe, CheckCircle, ArrowRight, Play, Award, Phone, Mail, MapPin, Star, Users, Package, Clock } from '@/components/ui/icons'
import Link from 'next/link'
import { OptimizedImage, HeroImage } from '@/components/ui/optimized-image'
import { FadeInSection, SectionTransition } from '@/components/ui/page-transition'
import { LazyComponent } from '@/components/ui/lazy-component'

export default function Home() {
  return (
    <PublicLayout>
      {/* Enhanced Hero Section with stunning gradients and animations */}
      <section className="relative overflow-hidden bg-gradient-hero text-white min-h-screen flex items-center">
        {/* Enhanced Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-dots bg-pattern animate-pulse-slow" />
        </div>
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container-hero relative py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12 animate-fade-in-up">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <Badge className="bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-300 border-green-400/30 px-6 py-3 text-sm font-bold backdrop-blur-sm">
                    <Award className="mr-2 h-5 w-5" />
                    CAC Certified Business
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 text-blue-300 border-blue-400/30 px-6 py-3 text-sm font-bold backdrop-blur-sm">
                    <Star className="mr-2 h-5 w-5" />
                    Trusted Since 2020
                  </Badge>
                </div>
                
                <h1 className="text-6xl lg:text-8xl font-black leading-tight tracking-tight">
                  Premium Import &
                  <span className="block text-gradient-hero bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Export Excellence
                  </span>
                </h1>
                
                <p className="text-2xl lg:text-3xl text-slate-200 leading-relaxed max-w-2xl font-medium">
                  Nigeria&apos;s leading supplier of premium charcoal and firewood with reliable global logistics. 
                  Your trusted partner for quality products and seamless international trade.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8">
                <Button asChild size="xl" variant="glow" className="px-10 py-6 text-xl font-bold hover-lift-glow">
                  <Link href="/admin/login">
                    <Ship className="mr-3 h-7 w-7" />
                    Login
                  </Link>
                </Button>
                <Button asChild variant="glass" size="xl" className="px-10 py-6 text-xl font-bold hover-lift-glow">
                  <Link href="/products">
                    <Package className="mr-3 h-7 w-7" />
                    View Products
                  </Link>
                </Button>
              </div>
              
              {/* Enhanced Trust Indicators */}
              <div className="flex items-center space-x-12 pt-12 border-t border-white/20">
                <div className="text-center group">
                  <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform duration-300">500+</div>
                  <div className="text-sm text-slate-300 font-medium">Happy Clients</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform duration-300">50+</div>
                  <div className="text-sm text-slate-300 font-medium">Countries Served</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform duration-300">99%</div>
                  <div className="text-sm text-slate-300 font-medium">On-Time Delivery</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in-down">
              <div className="relative">
                {/* Enhanced Floating Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-green-400/30 to-green-600/30 rounded-full blur-2xl animate-pulse-glow" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
                
                <div className="relative aspect-square rounded-3xl bg-gradient-card backdrop-blur-xl border border-white/30 p-16 flex items-center justify-center shadow-elegant-xl hover:shadow-glow-xl transition-all duration-500 ease-out hover:scale-105">
                  <div className="text-center space-y-8">
                    <div className="relative">
                      <div className="h-40 w-40 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-elegant-xl animate-float">
                        <span className="text-white font-black text-5xl">AM</span>
                      </div>
                      <div className="absolute -top-4 -right-4 h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-elegant-lg animate-pulse">
                        <CheckCircle className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-4xl font-black text-white">Absad MultiSynergy</h3>
                      <p className="text-2xl text-slate-200 font-bold">Limited</p>
                      <p className="text-sm text-slate-300 mt-3 font-medium">RC NO:7680601  • CAC Certified</p>
                    </div>
                    <div className="flex items-center justify-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                        <Award className="h-5 w-5 text-yellow-400" />
                        <span className="text-white font-bold">Certified</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                        <Users className="h-5 w-5 text-blue-400" />
                        <span className="text-white font-bold">Trusted</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Company Introduction Section with CAC Certification */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-grid bg-pattern" />
        </div>
        
        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 animate-fade-in-up">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-elegant-lg hover:shadow-elegant-xl transition-all duration-300 ease-out hover:scale-110">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 px-6 py-3 text-sm font-bold shadow-elegant">
                    CAC Certified • RC: 7680601
                  </Badge>
                </div>
                
                <h2 className="text-5xl lg:text-6xl font-black text-foreground leading-tight">
                  About Absad
                  <span className="text-gradient-hero bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {" "}MultiSynergy
                  </span>
                </h2>
                
                <p className="text-2xl text-muted-foreground leading-relaxed font-medium">
                  Established in 2020, Absad MultiSynergy Limited is a Corporate Affairs Commission (CAC) 
                  certified import and export company specializing in premium charcoal and firewood products. 
                  We pride ourselves on delivering exceptional quality and reliable service to clients worldwide.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3 group">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="font-bold text-foreground text-lg">CAC Registered</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Fully licensed and compliant with Nigerian regulations</p>
                </div>
                
                <div className="space-y-3 group">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="font-bold text-foreground text-lg">Global Reach</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Serving clients across 50+ countries worldwide</p>
                </div>
                
                <div className="space-y-3 group">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                    <span className="font-bold text-foreground text-lg">Premium Quality</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Rigorous quality control and testing processes</p>
                </div>
                
                <div className="space-y-3 group">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="font-bold text-foreground text-lg">Reliable Service</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">On-time delivery and professional support</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg" variant="gradient" className="hover-lift-glow">
                  <Link href="/about">
                    <Users className="mr-2 h-5 w-5" />
                    Learn More About Us
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover-lift-glow">
                  <Link href="/testimonials">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Testimonials
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in-down">
              <div className="relative">
                {/* Enhanced CAC Certificate Display */}
                <div className="card-elegant p-10 border-2 border-primary/20 hover:border-primary/30 transition-all duration-300 ease-out hover:scale-105">
                  <div className="text-center space-y-8">
                    <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 flex items-center justify-center shadow-elegant-lg animate-float">
                      <Award className="h-12 w-12 text-white" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-3xl font-black text-foreground">CAC Certified</h3>
                      <p className="text-muted-foreground text-lg font-medium">Corporate Affairs Commission</p>
                      <div className="inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-6 py-3 rounded-full text-sm font-bold shadow-elegant">
                        RC: 7680601
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-muted-foreground font-medium">Company Name:</span>
                        <span className="font-bold text-foreground">Absad MultiSynergy Limited</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-muted-foreground font-medium">Registration Date:</span>
                        <span className="font-bold text-foreground">2024</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-muted-foreground font-medium">Business Type:</span>
                        <span className="font-bold text-foreground">Import/Export</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-muted-foreground font-medium">Status:</span>
                        <div className="flex items-center space-x-3">
                          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="font-bold text-green-600">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Floating badges */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-elegant-lg animate-float">
                  Verified ✓
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-elegant-lg animate-float" style={{ animationDelay: '1s' }}>
                  Licensed ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Products Showcase Section */}
      <section className="section-padding bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-dots bg-pattern" />
        </div>
        
        <div className="container-wide relative">
          <div className="text-center space-y-8 mb-24">
            <div className="inline-block">
              <Badge className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20 px-6 py-3 text-sm font-bold shadow-elegant mb-6">
                Our Premium Products
              </Badge>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-foreground leading-tight">
              Quality Products for
              <span className="text-gradient-hero bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {" "}Global Markets
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              We specialize in premium charcoal and firewood products, carefully sourced and processed 
              to meet international quality standards for customers worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            {/* Enhanced Premium Charcoal */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white hover-lift cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-16">
                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-orange-500 via-red-600 to-orange-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-elegant-lg">
                      <Package className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black">Premium Charcoal</h3>
                      <p className="text-xl text-slate-300 font-medium">High-grade hardwood charcoal</p>
                    </div>
                  </div>
                  
                  <p className="text-xl text-slate-300 leading-relaxed font-medium">
                    Our premium charcoal is produced from carefully selected hardwood, ensuring 
                    long burn time, high heat output, and minimal ash production.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <span className="text-lg font-bold">Long Burn Time</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <span className="text-lg font-bold">High Heat Output</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <span className="text-lg font-bold">Low Ash Content</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <span className="text-lg font-bold">Eco-Friendly</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild variant="glass" size="lg" className="group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                    <Link href="/products#charcoal">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Enhanced Premium Firewood */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900 via-orange-900 to-amber-900 text-white hover-lift cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-16">
                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-elegant-lg">
                      <Truck className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black">Premium Firewood</h3>
                      <p className="text-xl text-amber-200 font-medium">Seasoned hardwood logs</p>
                    </div>
                  </div>
                  
                  <p className="text-xl text-amber-200 leading-relaxed font-medium">
                    Our seasoned firewood is kiln-dried to optimal moisture content, 
                    providing excellent burning characteristics and consistent quality.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <span className="text-lg font-bold">Kiln Dried</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <span className="text-lg font-bold">Ready to Burn</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <span className="text-lg font-bold">Consistent Size</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <span className="text-lg font-bold">Sustainable</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild variant="glass" size="lg" className="group-hover:bg-white group-hover:text-amber-900 transition-all duration-300">
                    <Link href="/products#firewood">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Service Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="card-elegant hover-lift-glow group">
              <CardHeader>
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-elegant">
                  <Ship className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-black">Global Logistics</CardTitle>
                <CardDescription className="text-lg font-medium">
                  Reliable shipping and container tracking worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-base text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                    <span className="font-medium">Real-time container tracking system</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                    <span className="font-medium">Secure packaging & professional handling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                    <span className="font-medium">Extensive global shipping network</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-elegant hover-lift-glow group">
              <CardHeader>
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-elegant">
                  <Star className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-black">Premium Quality</CardTitle>
                <CardDescription className="text-lg font-medium">
                  High-quality charcoal and firewood supplies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-base text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                    <span className="font-medium">Rigorous quality testing & certification</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                    <span className="font-medium">Sustainable sourcing practices</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                    <span className="font-medium">Competitive pricing & bulk discounts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-elegant hover-lift-glow group">
              <CardHeader>
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-elegant">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl font-black">Trusted Service</CardTitle>
                <CardDescription className="text-lg font-medium">
                  Professional support and customer satisfaction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-base text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                    <span className="font-medium">24/7 dedicated customer support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                    <span className="font-medium">CAC certified & fully licensed</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                    <span className="font-medium">Proven track record since 2020</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Information Section */}
      <section className="section-padding bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-grid bg-pattern" />
        </div>
        
        <div className="container-wide relative">
          <div className="text-center space-y-8 mb-20">
            <Badge className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20 px-6 py-3 text-sm font-bold shadow-elegant">
              Get In Touch
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-black text-foreground leading-tight">
              Contact Our
              <span className="text-gradient-hero bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {" "}Expert Team
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              Ready to discuss your import/export needs? Our experienced team is here to provide 
              personalized solutions and competitive quotes for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Enhanced Phone Contact */}
            <Card className="card-elegant hover-lift-glow group text-center">
              <CardContent className="p-12">
                <div className="space-y-8">
                  <div className="h-20 w-20 mx-auto rounded-3xl bg-gradient-to-br from-green-500/10 to-green-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-elegant">
                    <Phone className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-foreground">Call Us</h3>
                    <p className="text-muted-foreground text-lg font-medium">Speak directly with our team</p>
                  </div>
                  <div className="space-y-3">
                    <a href="tel:+2348071340418" className="block text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                      +234 807 134 0418
                    </a>
                    <a href="tel:+2347018222950" className="block text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                      +234 701 822 2950
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Available Monday - Friday<br />
                    8:00 AM - 6:00 PM (WAT)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Enhanced Email Contact */}
            <Card className="card-elegant hover-lift-glow group text-center">
              <CardContent className="p-12">
                <div className="space-y-8">
                  <div className="h-20 w-20 mx-auto rounded-3xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-elegant">
                    <Mail className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-foreground">Email Us</h3>
                    <p className="text-muted-foreground text-lg font-medium">Send us your inquiries</p>
                  </div>
                  <div className="space-y-3">
                    <a href="mailto:contact@absadmultisynergy.com" className="block text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                      contact@absadmultisynergy.com
                    </a>
                   
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    We respond within 24 hours<br />
                    Professional support guaranteed
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Enhanced Office Location */}
            <Card className="card-elegant hover-lift-glow group text-center">
              <CardContent className="p-12">
                <div className="space-y-8">
                  <div className="h-20 w-20 mx-auto rounded-3xl bg-gradient-to-br from-purple-500/10 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-elegant">
                    <MapPin className="h-10 w-10 text-purple-600" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-foreground">Visit Us</h3>
                    <p className="text-muted-foreground text-lg font-medium">Our office location</p>
                  </div>
                  <div className="space-y-3">
                    <address className="text-xl font-bold text-foreground not-italic leading-relaxed">
                     
                      Jebba, Kwara State, Nigeria
                    </address>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Open for appointments<br />
                    Monday - Friday, 9:00 AM - 5:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Enhanced Quick Contact Actions */}
          <div className="text-center space-y-12">
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button asChild size="xl" variant="glow" className="px-12 py-6 text-xl font-bold hover-lift-glow">
                <Link href="/contact">
                  <Mail className="mr-3 h-7 w-7" />
                  Send Message
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="px-12 py-6 text-xl font-bold hover-lift-glow">
                <Link href="/tracking">
                  <Ship className="mr-3 h-7 w-7" />
                  Track Container
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-12 pt-12 border-t border-slate-200">
              <div className="text-center group">
                <div className="text-3xl font-black text-primary group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-sm text-muted-foreground font-medium">Support Available</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-black text-primary group-hover:scale-110 transition-transform duration-300">&lt;24h</div>
                <div className="text-sm text-muted-foreground font-medium">Response Time</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-black text-primary group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Professional Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="section-padding bg-gradient-hero text-white relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-dots bg-pattern animate-pulse-slow" />
        </div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container-wide text-center relative">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-8">
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-sm font-bold backdrop-blur-sm">
                Ready to Get Started?
              </Badge>
              <h2 className="text-5xl lg:text-7xl font-black leading-tight">
                Start Your Import/Export
                <span className="block">Journey Today</span>
              </h2>
              <p className="text-2xl lg:text-3xl text-white/90 leading-relaxed font-medium">
                Get in touch with our expert team for a personalized quote and discover 
                how we can help grow your business with our premium products and reliable service.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button asChild size="xl" variant="glass" className="px-12 py-6 text-xl font-bold hover-lift-glow">
                <Link href="/contact">
                  Get Free Quote Today
                  <ArrowRight className="ml-3 h-7 w-7" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="ghost" className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 px-12 py-6 text-xl font-bold backdrop-blur-sm hover-lift-glow">
                <Link href="/testimonials">
                  <Play className="mr-3 h-7 w-7" />
                  Watch Success Stories
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-16 pt-16 border-t border-white/20">
              <div className="text-center group">
                <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-sm text-white/80 font-medium">Satisfied Clients</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="text-sm text-white/80 font-medium">Countries Served</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform duration-300">4+ Years</div>
                <div className="text-sm text-white/80 font-medium">Industry Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}