import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10"></div>
      
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-app-purple/10 to-app-blue/10 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 -z-10"></div>
      
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-app-pink/10 to-app-blue/10 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Unleash Your Creativity?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you and start creating amazing visuals today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Free",
              price: "$0",
              description: "Perfect for trying out CanvasFlow",
              features: [
                "3 canvases",
                "Basic shapes and tools",
                "PNG export",
                "1 collaborator"
              ],
              buttonText: "Get Started",
              buttonVariant: "outline",
              popular: false
            },
            {
              title: "Pro",
              price: "$12",
              description: "Everything you need for professional work",
              features: [
                "Unlimited canvases",
                "Advanced shapes and tools",
                "All export formats",
                "Up to 10 collaborators",
                "Version history",
                "Priority support"
              ],
              buttonText: "Start Free Trial",
              buttonVariant: "default",
              popular: true
            },
            {
              title: "Team",
              price: "$49",
              description: "For teams that create together",
              features: [
                "Everything in Pro",
                "Unlimited collaborators",
                "Team management",
                "Advanced permissions",
                "SSO authentication",
                "Dedicated support"
              ],
              buttonText: "Contact Sales",
              buttonVariant: "outline",
              popular: false
            }
          ].map((plan, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-xl transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-app-blue to-app-indigo scale-105 transform shadow-xl text-white relative z-10' 
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-app-purple text-white text-xs font-semibold py-1 px-4 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="text-center">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : ''}`}>{plan.title}</h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : ''}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-muted-foreground'}`}>/month</span>
                </div>
                <p className={`mb-6 ${plan.popular ? 'text-white/80' : 'text-muted-foreground'}`}>{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg 
                      className={`h-5 w-5 mr-2 ${plan.popular ? 'text-white' : 'text-app-blue'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.popular ? 'text-white/90' : ''}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.popular ? "/signup" : "#"} className="block w-full">
                <Button 
                  variant={plan.buttonVariant as any} 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-white text-app-blue hover:bg-gray-100' 
                      : plan.buttonVariant === 'default' 
                        ? 'bg-app-blue hover:bg-app-blue/90' 
                        : 'border-app-blue text-app-blue hover:bg-app-blue/10'
                  }`}
                >
                  {plan.buttonText}
                  {plan.popular && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-2">Need a custom solution?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We offer tailored enterprise solutions for large organizations with specific needs.
          </p>
          <Button 
            variant="ghost" 
            className="text-app-blue hover:bg-app-blue/10"
          >
            Contact our Enterprise team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;