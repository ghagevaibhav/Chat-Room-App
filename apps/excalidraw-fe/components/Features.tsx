import { cn } from '@/lib/utils';
import { Paintbrush, Share2, Users, Layers, Zap, Lock } from 'lucide-react';

const features = [
  {
    icon: <Paintbrush className="h-10 w-10 text-app-blue" />,
    title: 'Intuitive Drawing Tools',
    description: 'Create professional-looking diagrams and illustrations with our powerful yet simple drawing tools.'
  },
  {
    icon: <Share2 className="h-10 w-10 text-app-indigo" />,
    title: 'Real-time Collaboration',
    description: 'Work together with your team in real-time. See changes instantly as they happen.'
  },
  {
    icon: <Users className="h-10 w-10 text-app-purple" />,
    title: 'Team Management',
    description: 'Organize your projects and control access with comprehensive team management.'
  },
  {
    icon: <Layers className="h-10 w-10 text-app-pink" />,
    title: 'Infinite Canvas',
    description: 'Never run out of space with our infinite canvas. Zoom in and out with ease.'
  },
  {
    icon: <Zap className="h-10 w-10 text-app-blue" />,
    title: 'Lightning Fast',
    description: 'Engineered for performance, our app remains responsive even with complex drawings.'
  },
  {
    icon: <Lock className="h-10 w-10 text-app-indigo" />,
    title: 'Secure & Private',
    description: 'Your data is encrypted and stored securely. Control who sees your work.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Creatives
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to bring your ideas to life, all in one beautiful interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "feature-card bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700",
                "hover:shadow-xl transition-all duration-300"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 p-3 rounded-lg inline-block bg-gray-50 dark:bg-gray-700">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 overflow-hidden rounded-xl">
          <div className="relative w-full">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-40 bg-gradient-to-r from-app-blue/20 via-app-purple/20 to-app-pink/20 blur-3xl rounded-full"></div>
            <div className="glass-panel rounded-xl overflow-hidden">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-app-blue/5 to-app-purple/5"></div>
                <div className="relative p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">Intuitive Interface, Maximum Creativity</h3>
                      <p className="text-muted-foreground mb-6">
                        Our clean, distraction-free interface helps you focus on what matters most - your creativity. Every tool is thoughtfully designed to feel natural and intuitive.
                      </p>
                      <ul className="space-y-3">
                        {[
                          'Customizable workspace',
                          'Dark and light themes',
                          'Keyboard shortcuts',
                          'Smart object recognition'
                        ].map((item, i) => (
                          <li key={i} className="flex items-center">
                            <svg className="h-5 w-5 text-app-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
                      <img 
                        src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                        alt="Interface showcase" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
