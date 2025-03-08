import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    content: "CanvasFlow has completely transformed how our design team works. The collaborative features are unmatched.",
    author: "Sarah Johnson",
    role: "Product Designer at Dropbox",
    avatar: "SJ"
  },
  {
    content: "The intuitive interface makes it so easy to create professional diagrams. I've ditched all other tools.",
    author: "Michael Chen",
    role: "UX Engineer at Figma",
    avatar: "MC"
  },
  {
    content: "As an educator, I use CanvasFlow daily to explain complex concepts to my students. It's simply brilliant.",
    author: "Prof. David Wilson",
    role: "Computer Science Professor",
    avatar: "DW"
  },
  {
    content: "The infinite canvas is a game-changer for brainstorming sessions. Our productivity has skyrocketed.",
    author: "Emily Rodriguez",
    role: "Creative Director at Adobe",
    avatar: "ER"
  },
  {
    content: "I've tried dozens of drawing tools, and nothing comes close to the seamless experience of CanvasFlow.",
    author: "Thomas Wright",
    role: "Independent Illustrator",
    avatar: "TW"
  },
  {
    content: "The real-time collaboration feature has been essential for our remote team. It feels like we're in the same room.",
    author: "Aisha Patel",
    role: "Project Manager at Asana",
    avatar: "AP"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Creators Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who trust CanvasFlow for their creative needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 overflow-hidden glass-panel bg-white/50 dark:bg-gray-800/50 hover:shadow-lg transition-all duration-300 h-full">
              <CardContent className="pt-6 h-full flex flex-col">
                <div className="mb-4 flex-grow">
                  <svg className="h-6 w-6 text-app-blue mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <p className="text-foreground">{testimonial.content}</p>
                </div>
                <div className="flex items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.avatar}`} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;