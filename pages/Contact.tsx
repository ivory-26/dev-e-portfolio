import React, { useState } from 'react';
import { Mail, MapPin, MessageSquare } from 'lucide-react';
import { AnimatedButton } from '../components/ui/AnimatedButton';

export const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Please fill in all fields');
            return;
        }

        const recipientEmail = 'karpesahil2007@gmail.com';
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
             <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
                                <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-primary">Let's Build Together</h1>
                                <p className="text-lg sm:text-xl text-secondary mb-10 leading-relaxed">
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

            <div className="bg-surface border border-border p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg">
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-secondary">Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-background border border-border p-3 sm:p-4 focus:border-accent focus:outline-none text-primary transition-colors rounded"
                            placeholder="Jane Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-secondary">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-background border border-border p-3 sm:p-4 focus:border-accent focus:outline-none text-primary transition-colors rounded"
                            placeholder="jane@example.com"
                            required
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-bold mb-2 text-secondary">Message</label>
                        <textarea 
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-background border border-border p-3 sm:p-4 focus:border-accent focus:outline-none text-primary transition-colors rounded resize-none"
                            placeholder="Tell me about your project..."
                            required
                        />
                    </div>
                    <AnimatedButton 
                        className="w-full md:w-auto px-6 sm:px-8 py-3"
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