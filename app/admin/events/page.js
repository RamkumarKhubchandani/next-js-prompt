"use client";
import React, { useState, useEffect } from 'react';
import {
    MoreVertical,
    Search,
    Filter,
    Plus,
    Calendar,
    Star,
    Users,
    GripVertical,
    Eye,
    EyeOff,
    Edit3,
    Trash2,
    Save,
    X,
    Check,
    Loader2
} from 'lucide-react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';

export default function AdminEventsPage() {
    // Local state for the creative admin interface
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingEvent, setEditingEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch initial data from API to ensure we see persisted data
    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch events", err);
                setLoading(false);
            });
    }, []);

    // Helper to persist changes
    const persistChanges = async (updatedEvents) => {
        setSaving(true);
        setEvents(updatedEvents); // Optimistic update
        try {
            await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedEvents)
            });
            // Success (maybe show toast)
        } catch (error) {
            console.error("Failed to save", error);
            alert("Failed to save changes!");
        } finally {
            setSaving(false);
        }
    };

    const handleStatusToggle = (id) => {
        const updated = events.map(e => e.id === id ? { ...e, isComingSoon: !e.isComingSoon } : e);
        persistChanges(updated);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this event?")) {
            const updated = events.filter(e => e.id !== id);
            persistChanges(updated);
        }
    };

    const formatDateForInput = (dateStr) => {
        if (!dateStr || dateStr === "TBA") return "";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "";
        return date.toISOString().split('T')[0];
    };

    const formatTimeForInput = (timeStr) => {
        // robust parsing for "09:00 AM - 11:00 AM EST" extraction
        if (!timeStr) return { start: "09:00", end: "11:00" };
        const parts = timeStr.split(' - ');
        if (parts.length < 2) return { start: "09:00", end: "11:00" };

        const convertTo24 = (t) => {
            const [time, modifier] = t.split(' ');
            let [hours, minutes] = time.split(':');
            if (hours === '12') {
                hours = '00';
            }
            if (modifier && modifier.includes('PM')) {
                hours = parseInt(hours, 10) + 12;
            }
            return `${hours.toString().padStart(2, '0')}:${minutes}`;
        };

        try {
            const startTime = convertTo24(parts[0].trim());
            const endTime = convertTo24(parts[1].split(' ')[0].trim()); // Get time part before timezone
            return { start: startTime, end: endTime };
        } catch (error) {
            // Fallback in case of parsing error
            return { start: "09:00", end: "11:00" };
        }
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Format Date back to "Mar 15, 2026"
        const rawDate = formData.get('date');
        let formattedDate = editingEvent.dates[0]?.date || "TBA";
        if (rawDate) {
            const dateObj = new Date(rawDate + 'T00:00:00');
            formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }

        // Format Time back to "10:00 AM - 12:00 PM EST"
        const start = formData.get('startTime');
        const end = formData.get('endTime');

        const formatTime = (time) => {
            if (!time) return "10:00 AM";
            const [h, m] = time.split(':');
            const d = new Date();
            d.setHours(parseInt(h, 10));
            d.setMinutes(parseInt(m, 10));
            return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        };
        const formattedTime = `${formatTime(start)} - ${formatTime(end)} EST`;

        const updates = {
            title: formData.get('title'),
            price: formData.get('price'),
            isComingSoon: formData.get('status') === 'waitlist',
        };

        const updatedEvents = events.map(ev => ev.id === editingEvent.id ? {
            ...ev,
            ...updates,
            dates: [{ ...ev.dates[0], date: formattedDate, time: formattedTime }]
        } : ev);

        persistChanges(updatedEvents);
        setEditingEvent(null);
    };

    // For drag and drop reordering
    const handleReorder = (newOrder) => {
        // optimistically update visual state
        setEvents(newOrder);
        // debounce save strictly? no, let's just save.
        // But Reorder component calls this frequently? framer-motion calls onReorder on drop. 
        // It's safe to save.
        persistChanges(newOrder);
    };


    if (loading) {
        return <div className="min-h-screen flex items-center justify-center dark:bg-dark-900 bg-gray-50 text-brand-primary"><Loader2 className="animate-spin" size={32} /></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-dark-900 dark:text-gray-100 font-sans">
            {/* Admin Header */}
            <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 h-16 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-brand-primary/10 p-2 rounded-lg">
                        <Users size={20} className="text-brand-primary" />
                    </div>
                    <h1 className="font-bold text-lg">Event Management</h1>
                </div>
                {saving && (
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500 animate-pulse">
                        <Loader2 size={16} className="animate-spin" />
                        Saving changes...
                    </div>
                )}
            </header>

            <main className="p-8 max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-dark-700/50 border-b border-gray-100 dark:border-dark-700">
                                    <th className="px-6 py-4 text-left font-bold text-gray-400 w-12">#</th>
                                    <th className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider w-[40%]">Event Name</th>
                                    <th className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider">Metrics</th>
                                    <th className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Cohort Date</th>
                                    <th className="px-6 py-4 text-right font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <Reorder.Group as="tbody" axis="y" values={events} onReorder={handleReorder}>
                                {events.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase())).map((event) => (
                                    <Reorder.Item
                                        key={event.id}
                                        value={event}
                                        className="border-b border-gray-50 dark:border-dark-700/50 hover:bg-gray-50 dark:hover:bg-dark-700/30 transition-colors bg-white dark:bg-dark-800 group"
                                    >
                                        <td className="px-6 py-4">
                                            <GripVertical className="text-gray-300 cursor-grab active:cursor-grabbing hover:text-brand-primary" size={20} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-16 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100 dark:border-gray-700 mt-1">
                                                    <img src={event.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-bold text-dark-900 dark:text-white text-base leading-tight mb-1">{event.title}</div>
                                                    <div className="text-xs text-gray-500 truncate font-mono">{event.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/10 px-2 py-1 rounded-md w-fit">
                                                <Star size={14} className="fill-yellow-500 text-yellow-500" />
                                                <span className="font-bold text-yellow-700 dark:text-yellow-500">{event.rating}</span>
                                                <span className="text-xs text-yellow-600/60 dark:text-yellow-500/60">({event.reviewCount})</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleStatusToggle(event.id)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${event.isComingSoon
                                                    ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                                                    : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'}`}
                                            >
                                                {event.isComingSoon ? "Waitlist Only" : "Active Cohort"}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                <Calendar size={14} className="text-gray-400" />
                                                {event.dates[0]?.date || "TBA"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => setEditingEvent(event)}
                                                    className="p-2 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-colors border border-transparent hover:border-brand-primary/20"
                                                    title="Edit Details"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                                    title="Delete Event"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        </table>
                    </div>
                </div>
            </main>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 dark:border-dark-700"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-700">
                                <h3 className="text-xl font-bold">Edit Event</h3>
                                <button onClick={() => setEditingEvent(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
                                    <input name="title" defaultValue={editingEvent.title} className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-brand-primary/50 outline-none transition-all" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Price</label>
                                        <input name="price" defaultValue={editingEvent.price} className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-brand-primary/50 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                        <select name="status" defaultValue={editingEvent.isComingSoon ? "waitlist" : "active"} className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-brand-primary/50 outline-none transition-all">
                                            <option value="active">Active</option>
                                            <option value="waitlist">Waitlist Only</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 dark:bg-dark-900/50 rounded-xl border border-gray-200 dark:border-dark-600">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Schedule Configuration</p>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Next Cohort Date</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="date"
                                                    name="date"
                                                    defaultValue={formatDateForInput(editingEvent.dates[0]?.date)}
                                                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 focus:ring-2 focus:ring-brand-primary/50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Start Time (EST)</label>
                                                <input
                                                    type="time"
                                                    name="startTime"
                                                    defaultValue={formatTimeForInput(editingEvent.dates[0]?.time).start}
                                                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 focus:ring-2 focus:ring-brand-primary/50 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">End Time (EST)</label>
                                                <input
                                                    type="time"
                                                    name="endTime"
                                                    defaultValue={formatTimeForInput(editingEvent.dates[0]?.time).end}
                                                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 focus:ring-2 focus:ring-brand-primary/50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={() => setEditingEvent(null)} className="px-5 py-2.5 font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-xl transition-colors">Cancel</button>
                                    <button type="submit" className="px-5 py-2.5 font-bold bg-brand-primary text-white hover:opacity-90 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-primary/20 transition-all hover:scale-105">
                                        <Save size={18} /> Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
