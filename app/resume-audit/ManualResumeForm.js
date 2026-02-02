import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronRight, ChevronLeft, User, Briefcase, GraduationCap, Code2, FileText, Check } from 'lucide-react';

export default function ManualResumeForm({ onSubmit, onCancel }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        personalInfo: { name: '', email: '', phone: '', linkedin: '', location: '', title: '' },
        experience: [{ id: 1, title: '', company: '', duration: '', description: '' }],
        education: [{ id: 1, school: '', degree: '', year: '' }],
        skills: '',
        summary: ''
    });

    const handleChange = (section, field, value, index = null) => {
        if (section === 'personalInfo') {
            setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
        } else if (index !== null) {
            setFormData(prev => ({
                ...prev,
                [section]: prev[section].map((item, i) => i === index ? { ...item, [field]: value } : item)
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const addEntry = (section) => {
        const newItem = section === 'experience'
            ? { id: Date.now(), title: '', company: '', duration: '', description: '' }
            : { id: Date.now(), school: '', degree: '', year: '' };
        setFormData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
    };

    const removeEntry = (section, index) => {
        if (formData[section].length > 1) {
            setFormData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
        }
    };

    const formatDataForAnalysis = () => {
        // Convert structured data to a plain text format that the AI can "read" just like a PDF
        let text = `
NAME: ${formData.personalInfo.name}
TITLE: ${formData.personalInfo.title}
CONTACT: ${formData.personalInfo.email} | ${formData.personalInfo.phone} | ${formData.personalInfo.linkedin} | ${formData.personalInfo.location}

PROFESSIONAL SUMMARY:
${formData.summary}

EXPERIENCE:
`;
        formData.experience.forEach(exp => {
            text += `
ROLE: ${exp.title}
COMPANY: ${exp.company}
DURATION: ${exp.duration}
DESCRIPTION:
${exp.description}
----------------
`;
        });

        text += `\nEDUCATION:\n`;
        formData.education.forEach(edu => {
            text += `${edu.degree} at ${edu.school} (${edu.year})\n`;
        });

        text += `\nSKILLS:\n${formData.skills}`;

        return text;
    };

    const handleSubmit = () => {
        const text = formatDataForAnalysis();
        onSubmit(text);
    };

    const steps = [
        { id: 1, label: 'Basics', icon: User },
        { id: 2, label: 'Work', icon: Briefcase },
        { id: 3, label: 'Education', icon: GraduationCap },
        { id: 4, label: 'Skills', icon: Code2 },
    ];

    return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-2xl max-w-4xl mx-auto">
            {/* Steps Header */}
            <div className="flex justify-between items-center mb-8 px-4 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-slate-700 -z-10"></div>
                {steps.map((s) => (
                    <div key={s.id} className={`flex flex-col items-center gap-2 bg-white dark:bg-slate-900 px-2 ${step >= s.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= s.id ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-slate-700'}`}>
                            <s.icon size={20} />
                        </div>
                        <span className="text-xs font-bold">{s.label}</span>
                    </div>
                ))}
            </div>

            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                            <h3 className="text-2xl font-bold mb-4">Personal Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Full Name" value={formData.personalInfo.name} onChange={v => handleChange('personalInfo', 'name', v)} placeholder="John Doe" />
                                <Input label="Target Title" value={formData.personalInfo.title} onChange={v => handleChange('personalInfo', 'title', v)} placeholder="Senior Software Engineer" />
                                <Input label="Email" value={formData.personalInfo.email} onChange={v => handleChange('personalInfo', 'email', v)} placeholder="john@example.com" />
                                <Input label="Phone" value={formData.personalInfo.phone} onChange={v => handleChange('personalInfo', 'phone', v)} placeholder="+1 234 567 890" />
                                <Input label="LinkedIn URL" value={formData.personalInfo.linkedin} onChange={v => handleChange('personalInfo', 'linkedin', v)} placeholder="linkedin.com/in/johndoe" />
                                <Input label="Location" value={formData.personalInfo.location} onChange={v => handleChange('personalInfo', 'location', v)} placeholder="New York, USA" />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Professional Summary</label>
                                <textarea
                                    value={formData.summary}
                                    onChange={e => handleChange(null, 'summary', e.target.value)}
                                    className="w-full h-32 p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="Briefly describe your professional background..."
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold">Experience</h3>
                                <button onClick={() => addEntry('experience')} className="text-sm font-bold text-purple-600 flex items-center gap-1 hover:bg-purple-50 px-3 py-1 rounded-lg transition-colors">
                                    <Plus size={16} /> Add Position
                                </button>
                            </div>
                            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {formData.experience.map((exp, idx) => (
                                    <div key={exp.id} className="p-6 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 relative group">
                                        <button onClick={() => removeEntry('experience', idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <Input label="Job Title" value={exp.title} onChange={v => handleChange('experience', 'title', v, idx)} placeholder="Frontend Developer" />
                                            <Input label="Company" value={exp.company} onChange={v => handleChange('experience', 'company', v, idx)} placeholder="Tech Corp Inc." />
                                            <Input label="Duration" value={exp.duration} onChange={v => handleChange('experience', 'duration', v, idx)} placeholder="Jan 2022 - Present" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description / Bullets</label>
                                            <textarea
                                                value={exp.description}
                                                onChange={e => handleChange('experience', 'description', e.target.value, idx)}
                                                className="w-full h-24 p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                                placeholder="• Developed new features..."
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold">Education</h3>
                                <button onClick={() => addEntry('education')} className="text-sm font-bold text-purple-600 flex items-center gap-1 hover:bg-purple-50 px-3 py-1 rounded-lg transition-colors">
                                    <Plus size={16} /> Add Education
                                </button>
                            </div>
                            <div className="space-y-4">
                                {formData.education.map((edu, idx) => (
                                    <div key={edu.id} className="p-4 rounded-xl border border-gray-200 dark:border-slate-700 flex flex-wrap gap-4 items-end relative group">
                                        <button onClick={() => removeEntry('education', idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="flex-1 min-w-[200px]">
                                            <Input label="School / University" value={edu.school} onChange={v => handleChange('education', 'school', v, idx)} placeholder="Stanford University" />
                                        </div>
                                        <div className="flex-1 min-w-[200px]">
                                            <Input label="Degree" value={edu.degree} onChange={v => handleChange('education', 'degree', v, idx)} placeholder="BS Computer Science" />
                                        </div>
                                        <div className="w-32">
                                            <Input label="Year" value={edu.year} onChange={v => handleChange('education', 'year', v, idx)} placeholder="2024" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <h3 className="text-2xl font-bold">Skills</h3>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">List your top skills (comma or newline separated)</label>
                                <textarea
                                    value={formData.skills}
                                    onChange={e => handleChange(null, 'skills', e.target.value)}
                                    className="w-full h-48 p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="React, generic AI, TypeScript, Node.js, Leadership, System Design..."
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between pt-8 mt-8 border-t border-gray-200 dark:border-slate-700">
                {step > 1 ? (
                    <button onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                        Back
                    </button>
                ) : (
                    <button onClick={onCancel} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                        Cancel
                    </button>
                )}

                {step < 4 ? (
                    <button onClick={() => setStep(step + 1)} className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                        Next <ChevronRight size={18} />
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2">
                        <Check size={18} /> Finish & Generate
                    </button>
                )}
            </div>
        </div>
    );
}

const Input = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
        />
    </div>
);
