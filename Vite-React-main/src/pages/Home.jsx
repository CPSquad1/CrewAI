import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';

const Home = () => {
  const isAuthenticated = false; //NOTE:changing this to true will show go to dashboard option

  const features = [
    {
      title: 'Smart Scheduling',
      description: "AI finds the perfect meeting times based on everyone's availability.",
    },
    {
      title: 'Intelligent Tasking',
      description: 'Automatically break down projects and assign tasks based on skills.',
    },
    {
      title: 'Effortless Tracking',
      description: 'Visualize project progress with smart Kanban boards and analytics.',
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-background to-slate-900 text-foreground p-4 sm:p-6 md:p-8">
      {/* Decorative SVG elements */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-blob" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-blob animation-delay-4000" />

      <div className="flex flex-col items-center w-full max-w-4xl z-10">
        {/* Hero Section */}
        <div className="text-center">
          <Logo className="w-20 h-20 mx-auto mb-6 text-primary opacity-0 animate-fade-in-down" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 opacity-0 animate-fade-in-down animation-delay-200">
            AI-Powered Team Collaboration
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-down animation-delay-400">
            Work smarter with AI-driven project management. Let CrewAI handle scheduling, task assignment, and progress tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up animation-delay-600">
            {isAuthenticated ? (
              <Button asChild size="lg">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg"><Link to="/login">Login</Link></Button>
                <Button asChild size="lg" variant="secondary"><Link to="/register">Register</Link></Button>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        {/* //INFO: Dummy data ref:readme */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.8 + index * 0.2}s` }}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;