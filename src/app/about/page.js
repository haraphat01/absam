import { PublicLayout } from '@/components/layout/public-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  Target, 
  Eye, 
  TrendingUp, 
  Building, 
  MapPin, 
  Users, 
  Globe, 
  CheckCircle, 
  ArrowRight,
  Warehouse,
  Truck,
  Ship,
  Factory,
  DollarSign,
  BarChart3,
  Package
} from '@/components/ui/icons'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white py-24 lg:py-32">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-dots bg-pattern animate-pulse-slow" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container-wide relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-semibold">
                <Award className="mr-2 h-4 w-4" />
                About Our Company
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                About Absad
                <span className="block text-gradient bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  MultiSynergy Limited
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                Leading the way in premium import and export services since 2020. 
                Committed to excellence, quality, and sustainable business practices.
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2020</div>
                <div className="text-sm text-slate-400">Established</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-slate-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-slate-400">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Mission Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-semibold">
                    Our Mission
                  </Badge>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Driving Global Trade
                  <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {" "}Excellence
                  </span>
                </h2>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Our mission is to be the leading provider of premium charcoal and firewood products 
                  in the global market, delivering exceptional quality, reliability, and value to our 
                  customers while maintaining the highest standards of environmental responsibility.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Quality Assurance</h3>
                    <p className="text-muted-foreground">Rigorous quality control processes ensure every product meets international standards</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Global Reach</h3>
                    <p className="text-muted-foreground">Serving customers across 50+ countries with reliable logistics and timely delivery</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Customer Focus</h3>
                    <p className="text-muted-foreground">Building long-term partnerships through exceptional service and personalized solutions</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in-down">
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 border border-primary/20">
                  <div className="h-full w-full rounded-2xl bg-white shadow-elegant-xl p-8 flex flex-col justify-center items-center text-center space-y-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Target className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-foreground">Our Core Values</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between py-2 border-b border-slate-100">
                          <span className="text-muted-foreground">Integrity:</span>
                          <span className="font-semibold text-green-600">Always</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-100">
                          <span className="text-muted-foreground">Quality:</span>
                          <span className="font-semibold text-blue-600">Premium</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-100">
                          <span className="text-muted-foreground">Service:</span>
                          <span className="font-semibold text-purple-600">Excellence</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-muted-foreground">Innovation:</span>
                          <span className="font-semibold text-orange-600">Continuous</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Vision Section */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-fade-in-up order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-secondary/10 to-primary/10 p-8 border border-secondary/20">
                  <div className="h-full w-full rounded-2xl bg-white shadow-elegant-xl p-8 flex flex-col justify-center space-y-8">
                    <div className="text-center">
                      <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
                        <Eye className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">Vision 2030</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
                        <div className="text-2xl font-bold text-primary mb-1">#1</div>
                        <div className="text-sm text-muted-foreground">Leading African Exporter</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600 mb-1">100+</div>
                          <div className="text-xs text-muted-foreground">Countries</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600 mb-1">$50M</div>
                          <div className="text-xs text-muted-foreground">Annual Revenue</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -left-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Vision 2030
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Growth Plan
                </div>
              </div>
            </div>
            
            <div className="space-y-8 animate-fade-in-down order-1 lg:order-2">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20 px-4 py-2 text-sm font-semibold">
                    Our Vision
                  </Badge>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Shaping the Future of
                  <span className="text-gradient bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    {" "}Global Trade
                  </span>
                </h2>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  By 2030, we envision Absad MultiSynergy Limited as Africa's leading export company, 
                  recognized globally for our commitment to quality, innovation, and sustainable business practices 
                  that benefit communities and the environment.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="font-semibold text-foreground">Market Leadership</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Become the #1 charcoal and firewood exporter in West Africa</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold text-foreground">Global Expansion</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Expand operations to serve 100+ countries worldwide</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Factory className="h-5 w-5 text-purple-500" />
                    <span className="font-semibold text-foreground">Innovation Hub</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Establish state-of-the-art processing facilities</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold text-foreground">Community Impact</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Create 1000+ jobs and support local communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunities Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-2 text-sm font-semibold">
              Investment Opportunities
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Partner With Us for
              <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {" "}Profitable Growth
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join us in our mission to revolutionize the import/export industry. 
              Discover lucrative investment opportunities with strong returns and sustainable growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Expansion Investment */}
            <Card className="hover-lift hover-glow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Market Expansion</CardTitle>
                <CardDescription className="text-base">
                  Invest in our global market expansion strategy
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Investment Range:</span>
                    <span className="font-semibold text-primary">$100K - $1M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Expected ROI:</span>
                    <span className="font-semibold text-green-600">25-35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Timeline:</span>
                    <span className="font-semibold text-foreground">2-3 Years</span>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-muted-foreground mt-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>New market penetration</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Distribution network expansion</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Brand development</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Infrastructure Investment */}
            <Card className="hover-lift hover-glow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Factory className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="text-xl">Infrastructure Development</CardTitle>
                <CardDescription className="text-base">
                  Fund state-of-the-art processing facilities
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Investment Range:</span>
                    <span className="font-semibold text-secondary">$500K - $5M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Expected ROI:</span>
                    <span className="font-semibold text-green-600">30-40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Timeline:</span>
                    <span className="font-semibold text-foreground">3-5 Years</span>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-muted-foreground mt-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Modern processing equipment</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Warehouse facilities</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Quality control systems</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Technology Investment */}
            <Card className="hover-lift hover-glow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="text-xl">Technology Innovation</CardTitle>
                <CardDescription className="text-base">
                  Invest in cutting-edge logistics technology
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Investment Range:</span>
                    <span className="font-semibold text-accent">$50K - $500K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Expected ROI:</span>
                    <span className="font-semibold text-green-600">20-30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Timeline:</span>
                    <span className="font-semibold text-foreground">1-2 Years</span>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-muted-foreground mt-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Digital tracking systems</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Automated processes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Data analytics platform</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="hover-lift bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 px-8 py-4 text-lg font-semibold">
              <Link href="/contact">
                <DollarSign className="mr-3 h-6 w-6" />
                Explore Investment Opportunities
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Warehouse and Facilities Section */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-semibold">
              Our Facilities
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              World-Class Warehouse &
              <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}Processing Facilities
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our state-of-the-art facilities ensure optimal storage conditions, efficient processing, 
              and seamless logistics operations to maintain product quality and meet delivery schedules.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-foreground">
                  Strategic Locations & Advanced Infrastructure
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our facilities are strategically located near major ports and transportation hubs, 
                  ensuring efficient logistics and reduced shipping times for our global customers.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Warehouse className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Storage Capacity</span>
                  </div>
                  <p className="text-sm text-muted-foreground">50,000+ tons of climate-controlled storage space</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-secondary" />
                    <span className="font-semibold text-foreground">Loading Bays</span>
                  </div>
                  <p className="text-sm text-muted-foreground">20 modern loading docks with automated systems</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Ship className="h-5 w-5 text-accent" />
                    <span className="font-semibold text-foreground">Port Access</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Direct access to Lagos and Port Harcourt ports</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Factory className="h-5 w-5 text-purple-500" />
                    <span className="font-semibold text-foreground">Processing Units</span>
                  </div>
                  <p className="text-sm text-muted-foreground">5 specialized processing and packaging lines</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="hover-lift">
                  <Link href="/contact">
                    <Building className="mr-2 h-5 w-5" />
                    Schedule Facility Tour
                  </Link>
                </Button>
                <Button asChild variant="outline" className="hover-lift">
                  <Link href="/products">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    View Our Products
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in-down">
              <div className="grid grid-cols-2 gap-6">
                {/* Main Warehouse Card */}
                <div className="col-span-2">
                  <Card className="hover-lift hover-glow group">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Warehouse className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">Main Warehouse Complex</h3>
                          <p className="text-muted-foreground">Lagos, Nigeria</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary mb-1">25,000</div>
                          <div className="text-xs text-muted-foreground">sq ft</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-secondary mb-1">24/7</div>
                          <div className="text-xs text-muted-foreground">Security</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent mb-1">100%</div>
                          <div className="text-xs text-muted-foreground">Climate Control</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Processing Facility */}
                <Card className="hover-lift hover-glow group">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Factory className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">Processing Plant</h3>
                        <p className="text-sm text-muted-foreground">Port Harcourt</p>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-secondary mb-1">5,000</div>
                        <div className="text-xs text-muted-foreground">tons/month</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Quality Control Lab */}
                <Card className="hover-lift hover-glow group">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Award className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">QC Laboratory</h3>
                        <p className="text-sm text-muted-foreground">On-site Testing</p>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-accent mb-1">ISO</div>
                        <div className="text-xs text-muted-foreground">Certified</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Location indicator */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <MapPin className="inline h-4 w-4 mr-1" />
                Nigeria
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-primary via-secondary to-primary text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>
        
        <div className="container-wide text-center relative">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-semibold">
                Ready to Partner With Us?
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Let's Build the Future
                <span className="block">Together</span>
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                Whether you're looking for premium products, investment opportunities, or strategic partnerships, 
                we're here to help you succeed in the global marketplace.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 hover:text-primary/90 px-8 py-4 text-lg font-semibold hover-lift">
                <Link href="/contact">
                  Start Partnership Discussion
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 px-8 py-4 text-lg font-semibold backdrop-blur-sm">
                <Link href="/products">
                  <Package className="mr-3 h-6 w-6" />
                  Explore Our Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}