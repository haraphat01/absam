import { PublicLayout } from '@/components/layout/public-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Package, 
  Flame, 
  Thermometer, 
  Clock, 
  Leaf, 
  CheckCircle, 
  ArrowRight,
  Star,
  Award,
  Truck,
  Globe,
  BarChart3,
  Zap,
  Shield,
  Droplets,
  Wind,
  TreePine,
  Factory
} from '@/components/ui/icons'
import Link from 'next/link'
import Image from 'next/image'

export default function ProductsPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 text-white py-24 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>
        
        <div className="container-wide relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-semibold">
                <Package className="mr-2 h-4 w-4" />
                Premium Products
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                World-Class
                <span className="block text-gradient bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Charcoal & Firewood
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                Premium quality products sourced sustainably and processed to international standards. 
                Trusted by customers worldwide for consistent quality and reliable supply.
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-slate-400">Natural</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">ISO</div>
                <div className="text-sm text-slate-400">Certified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-slate-400">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-semibold">
              Our Product Range
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Two Premium Categories
              <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}One Standard
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We specialize in two main product categories, each carefully processed and quality-tested 
              to meet the highest international standards for performance and sustainability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Charcoal Category */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-orange-900 text-white hover-lift cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-12">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Flame className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold">Premium Charcoal</h3>
                      <p className="text-slate-300 text-lg">High-grade hardwood charcoal products</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Our premium charcoal is produced from carefully selected hardwood species, 
                    ensuring exceptional burning characteristics, long burn time, and minimal ash production 
                    for both commercial and residential applications.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-5 w-5 text-orange-400" />
                        <span className="text-sm font-medium">High Heat Output</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-orange-400" />
                        <span className="text-sm font-medium">Long Burn Time</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Wind className="h-5 w-5 text-orange-400" />
                        <span className="text-sm font-medium">Low Ash Content</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Leaf className="h-5 w-5 text-green-400" />
                        <span className="text-sm font-medium">Eco-Friendly</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-blue-400" />
                        <span className="text-sm font-medium">Quality Tested</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-yellow-400" />
                        <span className="text-sm font-medium">ISO Certified</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                    <Link href="#charcoal">
                      Explore Charcoal Products
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Firewood Category */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900 to-orange-900 text-white hover-lift cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-12">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TreePine className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold">Premium Firewood</h3>
                      <p className="text-amber-200 text-lg">Seasoned hardwood logs and splits</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-amber-200 leading-relaxed">
                    Our seasoned firewood is kiln-dried to optimal moisture content, 
                    providing excellent burning characteristics, consistent quality, and reliable performance 
                    for heating, cooking, and recreational applications.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-5 w-5 text-blue-400" />
                        <span className="text-sm font-medium">Kiln Dried</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        <span className="text-sm font-medium">Ready to Burn</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-green-400" />
                        <span className="text-sm font-medium">Consistent Size</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Leaf className="h-5 w-5 text-green-400" />
                        <span className="text-sm font-medium">Sustainable</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-blue-400" />
                        <span className="text-sm font-medium">Quality Assured</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-purple-400" />
                        <span className="text-sm font-medium">Export Grade</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 group-hover:bg-white group-hover:text-amber-900 transition-all duration-300">
                    <Link href="#firewood">
                      Explore Firewood Products
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charcoal Products Section */}
      <section id="charcoal" className="py-24 bg-white">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 px-4 py-2 text-sm font-semibold">
              Premium Charcoal Collection
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Hardwood Charcoal
              <span className="text-gradient bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {" "}Excellence
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our charcoal products are crafted from premium hardwood species, processed using traditional methods 
              combined with modern quality control to deliver consistent, high-performance fuel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Restaurant Grade Charcoal */}
            <Card className="hover-lift hover-glow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Flame className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Restaurant Grade</CardTitle>
                <CardDescription className="text-base">
                  Premium charcoal for commercial kitchens
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Heat Output:</span>
                      <div className="font-semibold text-orange-600">7,500+ BTU/lb</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Burn Time:</span>
                      <div className="font-semibold text-orange-600">3-4 hours</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ash Content:</span>
                      <div className="font-semibold text-green-600">&lt;3%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Moisture:</span>
                      <div className="font-semibold text-blue-600">&lt;5%</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Consistent high heat output</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Minimal smoke production</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Food-safe certification</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Uniform size grading</span>
                    </li>
                  </ul>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Available Sizes:</span>
                      <span className="font-semibold">20kg, 50kg bags</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BBQ Premium Charcoal */}
            <Card className="hover-lift hover-glow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Thermometer className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">BBQ Premium</CardTitle>
                <CardDescription className="text-base">
                  Perfect for grilling and barbecue enthusiasts
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Heat Output:</span>
                      <div className="font-semibold text-red-600">8,000+ BTU/lb</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Burn Time:</span>
                      <div className="font-semibold text-red-600">4-5 hours</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ash Content:</span>
                      <div className="font-semibold text-green-600">&lt;2%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Moisture:</span>
                      <div className="font-semibold text-blue-600">&lt;4%</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Superior flavor enhancement</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Quick ignition properties</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Even heat distribution</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Premium hardwood blend</span>
                    </li>
                  </ul>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Available Sizes:</span>
                      <span className="font-semibold">5kg, 10kg, 20kg</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Industrial Grade Charcoal */}
            <Card className="hover-lift hover-glow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-500/10 to-slate-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Factory className="h-8 w-8 text-slate-600" />
                </div>
                <CardTitle className="text-xl">Industrial Grade</CardTitle>
                <CardDescription className="text-base">
                  High-volume applications and manufacturing
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Heat Output:</span>
                      <div className="font-semibold text-slate-600">7,000+ BTU/lb</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Burn Time:</span>
                      <div className="font-semibold text-slate-600">5-6 hours</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ash Content:</span>
                      <div className="font-semibold text-green-600">&lt;4%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Moisture:</span>
                      <div className="font-semibold text-blue-600">&lt;6%</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Cost-effective bulk pricing</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Consistent quality batches</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Custom sizing available</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Reliable supply chain</span>
                    </li>
                  </ul>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Available Sizes:</span>
                      <span className="font-semibold">Bulk, 1-ton bags</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="hover-lift bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 py-4 text-lg font-semibold">
              <Link href="/contact">
                <Flame className="mr-3 h-6 w-6" />
                Request Charcoal Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Firewood Products Section */}
      <section id="firewood" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-4 py-2 text-sm font-semibold">
              Premium Firewood Collection
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Seasoned Hardwood
              <span className="text-gradient bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {" "}Firewood
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our firewood is carefully selected, properly seasoned, and kiln-dried to ensure optimal 
              moisture content and burning characteristics for various heating and cooking applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Heating Grade Firewood */}
            <Card className="hover-lift hover-glow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Thermometer className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle className="text-xl">Heating Grade</CardTitle>
                <CardDescription className="text-base">
                  Premium logs for residential heating
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Heat Output:</span>
                      <div className="font-semibold text-amber-600">24+ MBTU/cord</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Burn Time:</span>
                      <div className="font-semibold text-amber-600">6-8 hours</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Moisture:</span>
                      <div className="font-semibold text-blue-600">&lt;20%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Seasoning:</span>
                      <div className="font-semibold text-green-600">12+ months</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Kiln-dried to perfection</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Split to optimal size</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Clean burning properties</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Pest and mold free</span>
                    </li>
                  </ul>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Available Sizes:</span>
                      <span className="font-semibold">16", 18", 20" lengths</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cooking Grade Firewood */}
            <Card className="hover-lift hover-glow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Flame className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Cooking Grade</CardTitle>
                <CardDescription className="text-base">
                  Specially selected for culinary applications
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Heat Output:</span>
                      <div className="font-semibold text-orange-600">26+ MBTU/cord</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Burn Time:</span>
                      <div className="font-semibold text-orange-600">4-6 hours</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Moisture:</span>
                      <div className="font-semibold text-blue-600">&lt;18%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Seasoning:</span>
                      <div className="font-semibold text-green-600">18+ months</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Food-safe wood species</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Minimal smoke production</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Excellent flavor profile</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Restaurant approved</span>
                    </li>
                  </ul>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Available Sizes:</span>
                      <span className="font-semibold">12", 16" lengths</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Grade Firewood */}
            <Card className="hover-lift hover-glow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Export Grade</CardTitle>
                <CardDescription className="text-base">
                  International quality standards compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Heat Output:</span>
                      <div className="font-semibold text-green-600">25+ MBTU/cord</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Burn Time:</span>
                      <div className="font-semibold text-green-600">7-9 hours</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Moisture:</span>
                      <div className="font-semibold text-blue-600">&lt;15%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Certification:</span>
                      <div className="font-semibold text-purple-600">ISPM-15</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Phytosanitary certified</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Heat treated compliance</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Custom packaging options</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Global shipping ready</span>
                    </li>
                  </ul>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Available Sizes:</span>
                      <span className="font-semibold">Custom lengths</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="hover-lift bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 px-8 py-4 text-lg font-semibold">
              <Link href="/contact">
                <TreePine className="mr-3 h-6 w-6" />
                Request Firewood Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-semibold">
              Quality Assurance
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Rigorous Testing &
              <span className="text-gradient bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Quality Control
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every batch of our products undergoes comprehensive testing and quality control processes 
              to ensure consistent performance and compliance with international standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-lift hover-glow group text-center">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">ISO Certified</h3>
                    <p className="text-muted-foreground text-sm">International quality management standards compliance</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">ISO 9001</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift hover-glow group text-center">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Lab Tested</h3>
                    <p className="text-muted-foreground text-sm">Comprehensive laboratory analysis for all products</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">100%</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift hover-glow group text-center">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Leaf className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Sustainable</h3>
                    <p className="text-muted-foreground text-sm">Responsibly sourced from certified forests</p>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">FSC</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift hover-glow group text-center">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Truck className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Export Ready</h3>
                    <p className="text-muted-foreground text-sm">Phytosanitary and customs documentation</p>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">ISPM-15</div>
                </div>
              </CardContent>
            </Card>
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
                Ready to Order?
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Get Premium Products
                <span className="block">Delivered Worldwide</span>
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                Contact our team today for competitive pricing, custom specifications, 
                and reliable delivery to your location anywhere in the world.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 hover:text-primary/90 px-8 py-4 text-lg font-semibold hover-lift">
                <Link href="/contact">
                  Get Product Quote
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 px-8 py-4 text-lg font-semibold backdrop-blur-sm">
                <Link href="/tracking">
                  <Package className="mr-3 h-6 w-6" />
                  Track Your Order
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-12 pt-12 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/80">Customer Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-white/80">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-white/80">Quality Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}