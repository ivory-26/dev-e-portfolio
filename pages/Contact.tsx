import React from 'react';
import { Mail, MapPin, MessageSquare } from 'lucide-react';
import { AnimatedButton } from '../components/ui/AnimatedButton';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
       <div className="grid lg:grid-cols-2 gap-16">
            <div>
                <h1 className="text-5xl font-bold mb-6 text-primary">Let's Build Together</h1>
                <p className="text-xl text-secondary mb-12 leading-relaxed">
                    I'm currently available for new projects and collaboration.<br></br>
                    I'd love to hear about it.
                </p>

                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="p-4 bg-surface border border-border">
                            <Mail className="text-accent" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-1 text-primary">Email</h3>
                            <p className="text-secondary">karpesahil2007@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                         <div className="p-4 bg-surface border border-border">
                            <MapPin className="text-accent" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-1 text-primary">Location</h3>
                            <p className="text-secondary">Virar, India</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-surface border border-border p-8 md:p-12">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-secondary">Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-background border border-border p-4 focus:border-accent focus:outline-none text-primary transition-colors"
                            placeholder="Jane Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-secondary">Email</label>
                        <input 
                            type="email" 
                            className="w-full bg-background border border-border p-4 focus:border-accent focus:outline-none text-primary transition-colors"
                            placeholder="jane@example.com"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-bold mb-2 text-secondary">Message</label>
                        <textarea 
                            rows={5}
                            className="w-full bg-background border border-border p-4 focus:border-accent focus:outline-none text-primary transition-colors resize-none"
                            placeholder="Tell me about your project..."
                        />
                    </div>
                    <AnimatedButton 
                        className="w-full md:w-auto px-8 py-3"
                        icon={MessageSquare}
                        iconPosition="left"
                        type="submit"
                    >
                        Send Message
                    </AnimatedButton>
                </form>
            </div>
       </div>
    </div>
  );
};