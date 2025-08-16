"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/components/ui/alert"
import { LoadingSpinner, LoadingDots, LoadingPulse } from "@/components/ui/loading-spinner"
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar } from "@/components/ui/skeleton"
import { Progress, CircularProgress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalTrigger } from "@/components/ui/modal"
import { 
  Home, 
  Settings, 
  User, 
  Package, 
  Truck, 
  Mail, 
  Phone,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star
} from "@/components/ui/icons"

export function ComponentShowcase() {
  const [progress, setProgress] = React.useState(65)

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
          Design System Showcase
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive collection of UI components built with Tailwind CSS and modern design principles
        </p>
      </div>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>Brand colors and semantic color system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Brand Colors</h4>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-primary mb-2"></div>
                <p className="text-sm">Primary</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-secondary mb-2"></div>
                <p className="text-sm">Secondary</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-accent mb-2"></div>
                <p className="text-sm">Accent</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Semantic Colors</h4>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-green-600 mb-2"></div>
                <p className="text-sm">Success</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-yellow-600 mb-2"></div>
                <p className="text-sm">Warning</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-destructive mb-2"></div>
                <p className="text-sm">Error</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
          <CardDescription>Responsive typography with consistent line heights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-6xl font-bold">Heading 1</div>
          <div className="text-4xl font-bold">Heading 2</div>
          <div className="text-2xl font-semibold">Heading 3</div>
          <div className="text-xl font-semibold">Heading 4</div>
          <div className="text-lg font-medium">Heading 5</div>
          <div className="text-base">Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          <div className="text-sm text-muted-foreground">Small text - Supporting information and captions</div>
          <div className="text-xs text-muted-foreground">Extra small text - Fine print and metadata</div>
        </CardContent>
      </Card>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>Interactive buttons with hover animations and multiple variants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="gradient">Gradient</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">With Icons</h4>
            <div className="flex flex-wrap gap-3">
              <Button><Home className="mr-2 h-4 w-4" />Home</Button>
              <Button variant="outline"><Settings className="mr-2 h-4 w-4" />Settings</Button>
              <Button variant="ghost"><User className="mr-2 h-4 w-4" />Profile</Button>
              <Button size="icon"><Package className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Form Elements</CardTitle>
          <CardDescription>Input fields, labels, and form controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input id="search" type="search" placeholder="Search..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input id="disabled" placeholder="Disabled input" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Card Components</CardTitle>
          <CardDescription>Flexible card layouts with consistent styling</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-elegant-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Products
                </CardTitle>
                <CardDescription>Manage your product catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View and manage all your products in one place.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping
                </CardTitle>
                <CardDescription>Track shipments and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monitor all your shipments and delivery status.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customers
                </CardTitle>
                <CardDescription>Manage customer relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Keep track of all your customer interactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Status indicators and labels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-green-600">Success</Badge>
            <Badge className="bg-yellow-600">Warning</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>Loading States</CardTitle>
          <CardDescription>Various loading indicators and skeleton screens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Loading Indicators</h4>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <LoadingSpinner />
                <p className="text-sm mt-2">Spinner</p>
              </div>
              <div className="text-center">
                <LoadingDots />
                <p className="text-sm mt-2">Dots</p>
              </div>
              <div className="text-center">
                <LoadingPulse />
                <p className="text-sm mt-2">Pulse</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Skeleton Screens</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <SkeletonCard />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <SkeletonAvatar />
                  <div className="flex-1">
                    <SkeletonText lines={2} />
                  </div>
                </div>
              </div>
              <div>
                <SkeletonText lines={4} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Indicators</CardTitle>
          <CardDescription>Linear and circular progress bars</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Linear Progress</h4>
            <div className="space-y-3">
              <Progress value={progress} />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                  Decrease
                </Button>
                <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                  Increase
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Circular Progress</h4>
            <div className="flex gap-6">
              <CircularProgress value={25} size={60} />
              <CircularProgress value={50} size={60} />
              <CircularProgress value={75} size={60} />
              <CircularProgress value={100} size={60} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Messages</CardTitle>
          <CardDescription>Contextual feedback messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <div>
              <h4 className="font-semibold">Success</h4>
              <p>Your changes have been saved successfully.</p>
            </div>
          </Alert>
          
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <div>
              <h4 className="font-semibold">Error</h4>
              <p>There was an error processing your request.</p>
            </div>
          </Alert>
          
          <Alert className="border-yellow-200 bg-yellow-50 text-yellow-900">
            <AlertCircle className="h-4 w-4" />
            <div>
              <h4 className="font-semibold">Warning</h4>
              <p>Please review your information before proceeding.</p>
            </div>
          </Alert>
        </CardContent>
      </Card>

      {/* Icons */}
      <Card>
        <CardHeader>
          <CardTitle>Icon System</CardTitle>
          <CardDescription>Consistent iconography using Lucide React</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-4">
            {[
              { icon: Home, name: "Home" },
              { icon: Settings, name: "Settings" },
              { icon: User, name: "User" },
              { icon: Package, name: "Package" },
              { icon: Truck, name: "Truck" },
              { icon: Mail, name: "Mail" },
              { icon: Phone, name: "Phone" },
              { icon: CheckCircle, name: "Check" },
              { icon: AlertCircle, name: "Alert" },
              { icon: XCircle, name: "X Circle" },
              { icon: Star, name: "Star" },
            ].map(({ icon: Icon, name }) => (
              <div key={name} className="text-center p-3 rounded-lg hover:bg-muted transition-colors">
                <Icon className="h-6 w-6 mx-auto mb-2" />
                <p className="text-xs">{name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Animations */}
      <Card>
        <CardHeader>
          <CardTitle>Animation Examples</CardTitle>
          <CardDescription>Smooth transitions and micro-interactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Hover Effects</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 border rounded-lg hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                <h5 className="font-semibold">Lift on Hover</h5>
                <p className="text-sm text-muted-foreground">Hover to see the lift effect</p>
              </div>
              <div className="p-6 border rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
                <h5 className="font-semibold">Scale on Hover</h5>
                <p className="text-sm text-muted-foreground">Hover to see the scale effect</p>
              </div>
              <div className="p-6 border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer">
                <h5 className="font-semibold">Color Change</h5>
                <p className="text-sm opacity-75">Hover to see the color change</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Example */}
      <Card>
        <CardHeader>
          <CardTitle>Modal Dialog</CardTitle>
          <CardDescription>Overlay dialogs with backdrop blur</CardDescription>
        </CardHeader>
        <CardContent>
          <Modal>
            <ModalTrigger asChild>
              <Button>Open Modal</Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Modal Title</ModalTitle>
                <ModalDescription>
                  This is a modal dialog with backdrop blur and smooth animations.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                <p>Modal content goes here. You can add forms, images, or any other content.</p>
              </div>
            </ModalContent>
          </Modal>
        </CardContent>
      </Card>

      <Separator />

      <div className="text-center py-8">
        <p className="text-muted-foreground">
          This design system provides a solid foundation for building beautiful, consistent user interfaces.
        </p>
      </div>
    </div>
  )
}