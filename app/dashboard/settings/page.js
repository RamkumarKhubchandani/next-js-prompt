"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../../components/ui/Input';
import { Save, User, Link as LinkIcon, Github, Twitter, Linkedin, Loader2, ArrowLeft, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function SettingsPage() {
    const { data: session, update } = useSession();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        bio: '',
        links: { github: '', twitter: '', linkedin: '' }
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        setOrigin(window.location.origin);
        if (session) {
            fetch('/api/user/settings')
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        name: data.name || '',
                        username: data.username || '',
                        bio: data.bio || '',
                        links: data.links || { github: '', twitter: '', linkedin: '' }
                    });
                    setLoading(false);
                })
                .catch(err => console.error(err));
        }
    }, [session]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('links.')) {
            const linkKey = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                links: { ...prev.links, [linkKey]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCopyLink = () => {
        const url = `${origin}/u/${formData.username}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/user/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                // Update session to reflect new name/username immediately if needed
                update({ name: formData.name }); 
            } else {
                setMessage({ type: 'error', text: data.message || 'Update failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen pt-32 flex justify-center"><Loader2 className="animate-spin text-brand-primary" /></div>;
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-900 text-light-100">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link href="/dashboard" className="flex items-center text-light-300 hover:text-white mb-4 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold">Profile Settings</h1>
                    <p className="text-light-200">Manage your public profile and personal details.</p>
                </div>

                <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit} 
                    className="bg-dark-800 p-8 rounded-2xl border border-dark-700 space-y-6"
                >
                    {message.text && (
                        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-900/20 text-green-400 border border-green-900' : 'bg-red-900/20 text-red-400 border border-red-900'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <User size={20} className="text-brand-primary" />
                            Basic Info
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-light-300 mb-1">Full Name</label>
                                <Input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-light-300 mb-1">Username (Required)</label>
                                <Input name="username" value={formData.username} onChange={handleChange} placeholder="johndoe" required />
                                
                                {formData.username && (
                                    <div className="mt-2 flex items-center justify-between p-2 bg-dark-900 rounded-lg border border-dark-700">
                                        <p className="text-xs text-light-400 truncate mr-2">
                                            {origin}/u/{formData.username}
                                        </p>
                                        <button 
                                            type="button"
                                            onClick={handleCopyLink} 
                                            className="text-brand-primary hover:text-white transition-colors flex-shrink-0"
                                            title="Copy Profile Link"
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-light-300 mb-1">Bio</label>
                            <textarea 
                                name="bio" 
                                value={formData.bio} 
                                onChange={handleChange}
                                className="w-full bg-dark-800 border border-dark-700 text-light-100 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors h-24 resize-none"
                                placeholder="Tell the world about yourself..."
                            />
                        </div>
                    </div>

                    <hr className="border-dark-700 my-6" />

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <LinkIcon size={20} className="text-brand-primary" />
                            Social Links
                        </h2>
                        
                        <div className="space-y-3">
                            <div className="relative">
                                <Github size={18} className="absolute left-3 top-3.5 text-light-400" />
                                <Input className="pl-10" name="links.github" value={formData.links.github} onChange={handleChange} placeholder="GitHub Username" />
                            </div>
                            <div className="relative">
                                <Twitter size={18} className="absolute left-3 top-3.5 text-light-400" />
                                <Input className="pl-10" name="links.twitter" value={formData.links.twitter} onChange={handleChange} placeholder="Twitter Username" />
                            </div>
                            <div className="relative">
                                <Linkedin size={18} className="absolute left-3 top-3.5 text-light-400" />
                                <Input className="pl-10" name="links.linkedin" value={formData.links.linkedin} onChange={handleChange} placeholder="LinkedIn Username" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={saving}
                            className="w-full md:w-auto bg-brand-primary text-dark-900 font-bold py-3 px-8 rounded-lg hover:bg-brand-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            Save Changes
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}
