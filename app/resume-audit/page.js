"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/app/components/Header';
import { Upload, FileText, CheckCircle, AlertTriangle, ArrowRight, Loader2, Sparkles, AlertCircle, X, ShieldCheck, Download, Wand2, Copy, Check, ChevronLeft, LayoutTemplate, PenTool, Lock, Trophy, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import ManualResumeForm from './ManualResumeForm';
import { useSession } from 'next-auth/react';
import UpgradeToProModal from '../components/UpgradeToProModal';

export default function ResumeAuditPage() {
    const [auditState, setAuditState] = useState('idle');
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [optimizedResume, setOptimizedResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [originalResumeData, setOriginalResumeData] = useState(null);
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressMessage, setProgressMessage] = useState('');
    const [downloadFormat, setDownloadFormat] = useState('pdf');
    const [selectedLayout, setSelectedLayout] = useState('classic');
    const [file, setFile] = useState(null);
    const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
    const fileInputRef = useRef(null);
    const { data: session } = useSession();
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const isPro = !!session;

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setResumeText(''); // Clear manual text if any
            setAuditState('job-input');
        }
    };

    const handleManualSubmit = (text) => {
        setResumeText(text);
        setFile(null); // Clear file if any
        setAuditState('job-input');
    };

    const startAnalysis = async () => {
        setAuditState('analyzing');
        setProgress(0);
        setProgressMessage('Reading your resume...');

        // Smooth progress simulation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev < 95) return prev + 1;
                return prev;
            });
        }, 300);

        try {
            setProgress(10);
            await new Promise(resolve => setTimeout(resolve, 800));

            setProgress(25);
            setProgressMessage('Extracting keywords and skills...');
            await new Promise(resolve => setTimeout(resolve, 600));

            const formData = new FormData();
            if (file) {
                formData.append('resume', file);
            } else if (resumeText) {
                formData.append('resumeText', resumeText);
            } else {
                clearInterval(progressInterval);
                alert("No resume provided");
                setAuditState('idle');
                return;
            }

            formData.append('jobDescription', jobDescription);

            setProgress(45);
            setProgressMessage('Consulting AI Career Expert...');

            const response = await fetch('/api/analyze-resume', {
                method: 'POST',
                body: formData
            });

            setProgress(75);
            setProgressMessage('Generating learning paths...');

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.details || errBody.error || `API error ${response.status}`);
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Analysis failed');
            }

            clearInterval(progressInterval);
            setProgress(95);
            setProgressMessage('Finalizing report...');

            const data = result.data;

            setOriginalResumeData({
                name: data.personalInfo.name,
                email: data.personalInfo.email,
                phone: data.personalInfo.phone,
                linkedin: data.personalInfo.linkedin,
                currentTitle: data.personalInfo.currentTitle,
                experience: data.experience,
                skills: data.skills,
                education: data.education
            });

            setAnalysis({
                score: data.analysis.score,
                summary: `Your resume has been analyzed. Current ATS score: ${data.analysis.score}/100.`,
                ats_compatibility: data.analysis.score > 80 ? 'High' : data.analysis.score > 60 ? 'Medium' : 'Low',
                keywords_found: data.analysis.keywordsFound,
                keywords_missing: data.analysis.keywordsMissing,
                missing_skills_path: data.analysis.missingSkillsLearningPath || [],
                formatting_issues: data.analysis.formattingIssues,
                improvements: data.analysis.improvements,
                key_achievements: data.analysis.keyAchievementsToHighlight || []
            });

            setProgress(100);
            setProgressMessage('Complete!');
            await new Promise(resolve => setTimeout(resolve, 300));

            setAuditState('results');
            if (data.analysis.score > 80) confetti();

        } catch (error) {
            clearInterval(progressInterval);
            console.error('Analysis error:', error);
            alert('🚀 OutlineDev Agent is reaching high demand right now! You have been added to our priority queue. Please try again in 30 minutes for a faster experience.');
            setAuditState('job-input');
        }
    };

    const optimizeResume = async () => {
        setAuditState('optimizing');
        setProgress(0);
        setProgressMessage('Initiating optimization engine...');

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev < 98) return prev + 1;
                return prev;
            });
        }, 250);

        try {
            setProgress(15);
            await new Promise(resolve => setTimeout(resolve, 1000));

            setProgressMessage('Matching achievements to job goals...');
            setProgress(35);
            await new Promise(resolve => setTimeout(resolve, 800));

            const response = await fetch('/api/optimize-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originalData: originalResumeData,
                    jobDescription: jobDescription
                })
            });

            setProgress(70);
            setProgressMessage('Applying high-impact action verbs...');

            if (!response.ok) {
                throw new Error('Optimization failed');
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Optimization failed');
            }

            clearInterval(progressInterval);
            setProgress(98);
            setProgressMessage('Polishing final document...');

            setOptimizedResume(result.data);

            setProgress(100);
            setProgressMessage('Optimization Complete!');
            await new Promise(resolve => setTimeout(resolve, 500));

            setAuditState('optimized');
            confetti();

        } catch (error) {
            clearInterval(progressInterval);
            console.error('Optimization error:', error);
            alert('🚀 OutlineDev Agent is reaching high demand right now! You have been added to our priority queue. Please try again in 30 minutes for a faster experience.');
            setAuditState('results');
        }
    };

    const generateCoverLetter = async () => {
        setIsGeneratingCoverLetter(true);
        try {
            const response = await fetch('/api/generate-cover-letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originalData: originalResumeData,
                    jobDescription: jobDescription
                })
            });

            if (!response.ok) throw new Error('Cover letter failed');
            const result = await response.json();
            if (result.success) setCoverLetter(result.data);

            // Scroll to cover letter section
            const el = document.getElementById('cover-letter-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            console.error('Cover letter error:', error);
            alert('🚀 OutlineDev Agent is reaching high demand right now! You have been added to our priority queue. Please try again in 30 minutes for a faster experience.');
        } finally {
            setIsGeneratingCoverLetter(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadOptimizedResume = async () => {
        if (!optimizedResume || !optimizedResume.personalInfo) return;

        if (downloadFormat === 'pdf') {
            await downloadAsPDF();
        } else {
            await downloadAsDOCX();
        }
    };

    const downloadAsPDF = async () => {
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const xContentWidth = pageWidth - (margin * 2);
        let yPos = 20;

        // --- HELPER WRAPPERS ---
        const checkPageBreak = (addedHeight = 10) => {
            if (yPos + addedHeight > 280) {
                doc.addPage();
                yPos = 20;
                return true;
            }
            return false;
        };

        const renderClassic = () => {
            // NAME (Centered, Big, Bold)
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text(optimizedResume.personalInfo.name.toUpperCase(), pageWidth / 2, yPos, { align: 'center' });
            yPos += 8;

            // CONTACT INFO (Centered, Single Line)
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const contactInfo = [
                optimizedResume.personalInfo.email,
                optimizedResume.personalInfo.phone,
                optimizedResume.personalInfo.linkedin,
                optimizedResume.personalInfo.location
            ].filter(Boolean).join(' | ');
            doc.text(contactInfo, pageWidth / 2, yPos, { align: 'center' });
            yPos += 15;

            // SECTION HEADER HELPER
            const addSectionHeader = (title) => {
                checkPageBreak(20);
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text(title, margin, yPos);
                yPos += 2;
                doc.setLineWidth(0.5);
                doc.setDrawColor(0, 0, 0); // Black
                doc.line(margin, yPos, pageWidth - margin, yPos);
                yPos += 6;
            };

            // RENDER SECTIONS
            renderCommonSections(addSectionHeader, 'helvetica');
        };

        const renderModern = () => {
            // Accent Color: #6b21a8 (Purple-800)
            const accentColor = [107, 33, 168];

            // NAME (Left Aligned, Modern Sans)
            doc.setFontSize(26);
            doc.setTextColor(...accentColor);
            doc.setFont('helvetica', 'bold');
            doc.text(optimizedResume.personalInfo.name, margin, yPos);
            yPos += 7;

            // CONTACT INFO (Left Aligned, Stacked or Row)
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80); // Dark Gray
            doc.setFont('helvetica', 'normal');
            const contactInfo = [
                optimizedResume.personalInfo.email,
                optimizedResume.personalInfo.phone,
                optimizedResume.personalInfo.linkedin,
                optimizedResume.personalInfo.location
            ].filter(Boolean).join('  •  ');
            doc.text(contactInfo, margin, yPos);
            yPos += 15;

            // SECTION HEADER HELPER
            const addSectionHeader = (title) => {
                checkPageBreak(20);
                doc.setFontSize(11);
                doc.setTextColor(...accentColor);
                doc.setFont('helvetica', 'bold');
                doc.text(title.toUpperCase(), margin, yPos);
                yPos += 2;
                doc.setDrawColor(...accentColor);
                doc.setLineWidth(1); // Thicker line
                doc.line(margin, yPos, margin + 20, yPos); // Short accent line
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.1);
                doc.line(margin + 20, yPos, pageWidth - margin, yPos); // Light continuation
                yPos += 8;
                doc.setTextColor(0, 0, 0); // Reset text color
            };

            renderCommonSections(addSectionHeader, 'helvetica');
        };

        const renderExecutive = () => {
            // Font: Times (Standard Serif)
            const fontName = 'times';

            // NAME (Left) & CONTACT (Right)
            doc.setFontSize(24);
            doc.setFont(fontName, 'bold');
            doc.text(optimizedResume.personalInfo.name.toUpperCase(), margin, yPos);

            // Contact info right aligned block
            doc.setFontSize(9);
            doc.setFont(fontName, 'normal');
            const contactLines = [
                optimizedResume.personalInfo.email,
                optimizedResume.personalInfo.phone,
                optimizedResume.personalInfo.linkedin,
                optimizedResume.personalInfo.location
            ].filter(Boolean);

            let contactY = yPos - 5;
            contactLines.forEach(line => {
                doc.text(line, pageWidth - margin, contactY, { align: 'right' });
                contactY += 4;
            });
            yPos += 15;

            // SECTION HEADER HELPER
            const addSectionHeader = (title) => {
                checkPageBreak(20);
                doc.setFontSize(11);
                doc.setFont(fontName, 'bold');
                doc.text(title.toUpperCase(), margin, yPos);
                yPos += 2;
                doc.setLineWidth(0.5);
                doc.setDrawColor(0, 0, 0); // Black
                doc.line(margin, yPos, pageWidth - margin, yPos);
                yPos += 6;
                doc.setLineWidth(0.1); // Double line effect
                doc.line(margin, yPos - 7, pageWidth - margin, yPos - 7);
            };

            renderCommonSections(addSectionHeader, fontName);
        };

        const renderTech = () => {
            const fontName = 'courier';
            const accentColor = [22, 163, 74]; // Green-600

            // NAME
            doc.setFontSize(22);
            doc.setTextColor(...accentColor);
            doc.setFont(fontName, 'bold');
            doc.text(`<${optimizedResume.personalInfo.name} />`, margin, yPos);
            yPos += 8;

            // CONTACT
            doc.setFontSize(10);
            doc.setTextColor(50, 50, 50);
            doc.setFont(fontName, 'normal');
            const contactInfo = [
                optimizedResume.personalInfo.email,
                optimizedResume.personalInfo.phone,
                optimizedResume.personalInfo.linkedin,
                optimizedResume.personalInfo.location
            ].filter(Boolean).join(' // ');
            doc.text(`// ${contactInfo}`, margin, yPos);
            yPos += 15;

            const addSectionHeader = (title) => {
                checkPageBreak(20);
                doc.setFontSize(12);
                doc.setTextColor(...accentColor);
                doc.setFont(fontName, 'bold');
                doc.text(`> ${title}`, margin, yPos);
                yPos += 2;
                doc.setDrawColor(...accentColor);
                doc.setLineWidth(0.5);
                doc.line(margin, yPos, pageWidth - margin, yPos);
                yPos += 8;
                doc.setTextColor(0, 0, 0);
            };

            renderCommonSections(addSectionHeader, fontName);
        };

        const renderGlacial = () => {
            const fontName = 'helvetica';
            const accentColor = [30, 64, 175]; // Blue-800

            // NAME
            doc.setFontSize(28);
            doc.setTextColor(...accentColor);
            doc.setFont(fontName, 'bold');
            doc.text(optimizedResume.personalInfo.name, margin, yPos);
            yPos += 10;

            // CONTACT
            doc.setFontSize(10);
            doc.setTextColor(100, 116, 139); // Slate-500
            doc.setFont(fontName, 'normal');
            const contactInfo = [
                optimizedResume.personalInfo.email,
                optimizedResume.personalInfo.phone,
                optimizedResume.personalInfo.linkedin,
                optimizedResume.personalInfo.location
            ].filter(Boolean).join(' | ');
            doc.text(contactInfo, margin, yPos);
            yPos += 15;

            const addSectionHeader = (title) => {
                checkPageBreak(25);

                // Background block for header
                doc.setFillColor(239, 246, 255); // Blue-50
                doc.rect(margin - 2, yPos - 5, pageWidth - (margin * 2) + 4, 8, 'F');

                doc.setFontSize(11);
                doc.setTextColor(...accentColor);
                doc.setFont(fontName, 'bold');
                doc.text(title.toUpperCase(), margin, yPos);
                yPos += 8;
                doc.setTextColor(0, 0, 0);
            };

            renderCommonSections(addSectionHeader, fontName);
        };

        const renderMinimal = () => {
            const fontName = 'times';

            // NAME (Centered, Small Caps styled via Uppercase)
            doc.setFontSize(18);
            doc.setFont(fontName, 'normal');
            doc.text(optimizedResume.personalInfo.name.toUpperCase(), pageWidth / 2, yPos, { align: 'center', charSpace: 3 });
            yPos += 8;

            // CONTACT
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            const contactInfo = [
                optimizedResume.personalInfo.email,
                optimizedResume.personalInfo.phone,
                optimizedResume.personalInfo.linkedin
            ].filter(Boolean).join('  ·  ');
            doc.text(contactInfo, pageWidth / 2, yPos, { align: 'center' });
            yPos += 15;

            const addSectionHeader = (title) => {
                checkPageBreak(20);
                doc.setFontSize(10);
                doc.setFont(fontName, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(title.toUpperCase(), pageWidth / 2, yPos, { align: 'center', charSpace: 1 });
                yPos += 6;
            };

            renderCommonSections(addSectionHeader, fontName);
        };


        // --- SHARED SECTION RENDERING LOGIC ---
        const renderCommonSections = (addSectionHeader, fontName) => {
            // PROFESSIONAL SUMMARY
            addSectionHeader('PROFESSIONAL SUMMARY');
            doc.setFontSize(10);
            doc.setFont(fontName, 'normal');
            const summaryLines = doc.splitTextToSize(optimizedResume.sections.summary, xContentWidth);
            doc.text(summaryLines, margin, yPos);
            yPos += summaryLines.length * 5 + 8;

            // PROFESSIONAL EXPERIENCE
            addSectionHeader('PROFESSIONAL EXPERIENCE');

            optimizedResume.sections.experience.forEach((exp) => {
                checkPageBreak(30);

                // Title (Left)
                doc.setFontSize(11);
                doc.setFont(fontName, 'bold');
                doc.text(exp.title, margin, yPos);

                // Date (Right)
                doc.setFontSize(10);
                doc.setFont(fontName, 'italic'); // Date Italic
                doc.text(exp.duration, pageWidth - margin, yPos, { align: 'right' });

                // Company | Location (Left, below title)
                yPos += 5;
                doc.setFont(fontName, 'bold'); // Company Name Bold
                doc.text(exp.company, margin, yPos);

                yPos += 6;
                doc.setFont(fontName, 'normal');

                // Bullets
                exp.bullets.forEach(bullet => {
                    checkPageBreak(10);
                    doc.text('•', margin + 2, yPos);
                    const bulletLines = doc.splitTextToSize(bullet, xContentWidth - 8);
                    doc.text(bulletLines, margin + 6, yPos);
                    yPos += bulletLines.length * 5;
                });
                yPos += 4;
            });

            // TECHNICAL SKILLS
            checkPageBreak(30);
            addSectionHeader('TECHNICAL SKILLS');

            Object.entries(optimizedResume.sections.skills).forEach(([category, skills]) => {
                checkPageBreak(15);
                doc.setFontSize(10);
                doc.setFont(fontName, 'bold');
                const categoryTitle = category.toUpperCase() + ': ';
                doc.text(categoryTitle, margin, yPos);

                const categoryWidth = doc.getTextWidth(categoryTitle);
                doc.setFont(fontName, 'normal');
                const skillsText = skills.join(', ');
                const skillsLines = doc.splitTextToSize(skillsText, xContentWidth - categoryWidth);

                // If skills wrap, handle indent
                if (skillsLines.length > 1) {
                    doc.text(skillsLines[0], margin + categoryWidth, yPos);
                    for (let i = 1; i < skillsLines.length; i++) {
                        yPos += 5;
                        checkPageBreak(10);
                        doc.text(skillsLines[i], margin, yPos);
                    }
                } else {
                    doc.text(skillsLines, margin + categoryWidth, yPos);
                }
                yPos += 6;
            });
            yPos += 4;

            // EDUCATION
            if (optimizedResume.sections.education && optimizedResume.sections.education.length > 0) {
                checkPageBreak(30);
                addSectionHeader('EDUCATION');

                optimizedResume.sections.education.forEach(edu => {
                    doc.setFontSize(10);
                    doc.setFont(fontName, 'bold');
                    doc.text(edu.school, margin, yPos);

                    doc.setFont(fontName, 'italic');
                    doc.text(edu.year, pageWidth - margin, yPos, { align: 'right' });

                    yPos += 5;
                    doc.setFont(fontName, 'normal');
                    doc.text(edu.degree, margin, yPos);
                    yPos += 8;
                });
            }
        };

        // EXECUTE SELECTED LAYOUT
        switch (selectedLayout) {
            case 'modern': renderModern(); break;
            case 'executive': renderExecutive(); break;
            case 'tech': renderTech(); break;
            case 'glacial': renderGlacial(); break;
            case 'minimal': renderMinimal(); break;
            default: renderClassic();
        }

        const fileName = `${optimizedResume.personalInfo.name.replace(/\s+/g, '_')}_Resume_${selectedLayout}.pdf`;
        doc.save(fileName);
        confetti();
    };

    const downloadAsDOCX = async () => {
        const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, UnderlineType } = await import('docx');
        const FileSaver = await import('file-saver');
        const saveAs = FileSaver.default || FileSaver.saveAs;

        // ATS-Friendly Header Style
        const sectionHeaderBorder = {
            bottom: {
                style: BorderStyle.SINGLE,
                size: 6,
                space: 1,
            },
        };

        const doc = new Document({
            styles: {
                default: {
                    document: {
                        run: {
                            font: "Arial",
                        },
                    },
                    heading1: {
                        run: {
                            font: "Arial",
                            bold: true,
                            color: "000000",
                        },
                    },
                    heading2: {
                        run: {
                            font: "Arial",
                            bold: true,
                            color: "000000",
                        },
                    },
                },
            },
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: 1000,
                            right: 1440,
                            bottom: 1000,
                            left: 1440,
                        },
                    },
                },
                children: [
                    // NAME
                    new Paragraph({
                        text: optimizedResume.personalInfo.name.toUpperCase(),
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 120 },
                    }),
                    // CONTACT INFO (Single line separated by |)
                    new Paragraph({
                        children: [
                            new TextRun({ text: optimizedResume.personalInfo.email }),
                            new TextRun({ text: " | " }),
                            new TextRun({ text: optimizedResume.personalInfo.phone }),
                            new TextRun({ text: " | " }),
                            new TextRun({ text: optimizedResume.personalInfo.linkedin }),
                            ...(optimizedResume.personalInfo.location ? [
                                new TextRun({ text: " | " }),
                                new TextRun({ text: optimizedResume.personalInfo.location })
                            ] : [])
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 },
                    }),

                    // PROFESSIONAL SUMMARY
                    new Paragraph({
                        text: "PROFESSIONAL SUMMARY",
                        heading: HeadingLevel.HEADING_2,
                        border: sectionHeaderBorder,
                        spacing: { before: 200, after: 120 },
                    }),
                    new Paragraph({
                        text: optimizedResume.sections.summary,
                        spacing: { after: 300 },
                    }),

                    // EXPERIENCE
                    new Paragraph({
                        text: "PROFESSIONAL EXPERIENCE",
                        heading: HeadingLevel.HEADING_2,
                        border: sectionHeaderBorder,
                        spacing: { before: 200, after: 120 },
                    }),
                    ...optimizedResume.sections.experience.flatMap(exp => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: exp.title, bold: true, size: 24 }), // 12pt
                            ],
                            spacing: { before: 120 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: exp.company, bold: true }),
                                new TextRun({ text: ` | ${exp.duration}`, italics: true })
                            ],
                            spacing: { after: 120 },
                        }),
                        ...exp.bullets.map(bullet => new Paragraph({
                            text: bullet,
                            bullet: { level: 0 },
                            spacing: { after: 60 },
                        })),
                        new Paragraph({ text: "" }),
                    ]),

                    // SKILLS
                    new Paragraph({
                        text: "TECHNICAL SKILLS",
                        heading: HeadingLevel.HEADING_2,
                        border: sectionHeaderBorder,
                        spacing: { before: 200, after: 120 },
                    }),
                    ...Object.entries(optimizedResume.sections.skills).map(([category, skills]) =>
                        new Paragraph({
                            children: [
                                new TextRun({ text: `${category.toUpperCase()}: `, bold: true }),
                                new TextRun({ text: skills.join(', ') })
                            ],
                            spacing: { after: 120 },
                        })
                    ),
                    new Paragraph({ text: "" }),

                    // EDUCATION
                    ...(optimizedResume.sections.education && optimizedResume.sections.education.length > 0 ? [
                        new Paragraph({
                            text: "EDUCATION",
                            heading: HeadingLevel.HEADING_2,
                            border: sectionHeaderBorder,
                            spacing: { before: 200, after: 120 },
                        }),
                        ...optimizedResume.sections.education.flatMap(edu => [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: edu.school, bold: true }),
                                    new TextRun({ text: ` | ${edu.year}`, italics: true })
                                ],
                            }),
                            new Paragraph({
                                text: edu.degree,
                                spacing: { after: 200 },
                            }),
                        ])
                    ] : [])
                ]
            }]
        });

        const blob = await Packer.toBlob(doc);
        const fileName = `${optimizedResume.personalInfo.name.replace(/\s+/g, '_')}_Resume.docx`;
        saveAs(blob, fileName);
        confetti();
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 text-slate-900 dark:text-white font-sans selection:bg-brand-primary/30 transition-colors duration-300">
            <Header />

            <main className="pt-24 pb-12 px-4 relative overflow-hidden min-h-screen">
                <div className="max-w-6xl mx-auto mb-6">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium mb-4">
                        <ChevronLeft size={20} /> Back to Dashboard
                    </Link>
                </div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/20 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-4"
                        >
                            <Sparkles size={12} /> OutlineDev | AI-Powered Resume Optimizer
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black tracking-tight mb-4"
                        >
                            Get Your Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:to-pink-400">Interview-Ready</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                        >
                            Upload your resume + paste job description. Our premium powerful AI agent rewrites it to beat ATS and impress recruiters.
                        </motion.p>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* UPLOAD STATE */}
                        {auditState === 'idle' && (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                <UpgradeToProModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
                                {!isPro ? (
                                    <div className="col-span-1 md:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-12 text-center shadow-xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center">
                                        <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                            <Lock size={40} className="text-gray-400 dark:text-gray-500" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                            Pro Feature Locked
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
                                            The AI Resume Audit is a premium feature. Upgrade to Pro to get instant, detailed feedback on your resume.
                                        </p>
                                        <button
                                            onClick={() => setShowUpgradeModal(true)}
                                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
                                        >
                                            Upgrade to Pro
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Upload Card */}
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="group relative border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-12 text-center cursor-pointer transition-all hover:scale-105 shadow-xl flex flex-col items-center justify-center min-h-[300px]"
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileUpload}
                                                accept=".pdf,.docx,.doc"
                                                className="hidden"
                                            />

                                            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <Upload size={32} className="text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                Upload Existing Resume
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                                PDF or DOCX
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <span className="flex items-center gap-1"><FileText size={12} /> Auto-Parsing</span>
                                            </div>
                                        </div>

                                        {/* Manual Input Card */}
                                        <div
                                            onClick={() => setAuditState('manual-input')}
                                            className="group relative border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-12 text-center cursor-pointer transition-all hover:scale-105 shadow-xl flex flex-col items-center justify-center min-h-[300px]"
                                        >
                                            <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <PenTool size={32} className="text-pink-600 dark:text-pink-400" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                Create from Scratch
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                                Enter details manually
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <span className="flex items-center gap-1"><Wand2 size={12} /> AI Generator</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}

                        {/* MANUAL INPUT STATE */}
                        {auditState === 'manual-input' && (
                            <motion.div
                                key="manual-input"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-4xl mx-auto"
                            >
                                <ManualResumeForm
                                    onSubmit={handleManualSubmit}
                                    onCancel={() => setAuditState('idle')}
                                />
                            </motion.div>
                        )}

                        {/* JOB INPUT STATE */}
                        {auditState === 'job-input' && (
                            <motion.div
                                key="job-input"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-3xl mx-auto"
                            >
                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-2xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                            <FileText className="text-purple-600 dark:text-purple-400" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Paste Job Description</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Help us tailor your resume to this role</p>
                                        </div>
                                    </div>

                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        placeholder="Paste the full job description here...

Example:
We're looking for a Senior Software Engineer with 5+ years of experience in React, TypeScript, and system design..."
                                        className="w-full h-64 p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                    />

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={() => setAuditState(resumeText ? 'manual-input' : 'idle')}
                                            className="px-6 py-3 bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-slate-700 transition-all"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            onClick={startAnalysis}
                                            disabled={!jobDescription.trim()}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                                        >
                                            Analyze with OutlineDev AI Agent →
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ANALYZING STATE */}
                        {auditState === 'analyzing' && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="max-w-md mx-auto text-center pt-10"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-8">
                                    <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-800 rounded-full" />
                                    <motion.div
                                        className="absolute inset-0 border-4 border-t-purple-600 border-r-pink-600 border-b-transparent border-l-transparent rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-black text-purple-600">{progress}%</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analyzing with AI...</h3>

                                {/* Progress Bar */}
                                <div className="w-full mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{progressMessage}</span>
                                        <span className="text-sm font-bold text-purple-600">{progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                        <motion.div
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}


                        {/* RESULTS STATE */}
                        {auditState === 'results' && analysis && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full"
                            >
                                {/* Score Card */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                                    <div className="md:col-span-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center shadow-xl">
                                        <h3 className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Current Score</h3>
                                        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                                            <svg className="w-full h-full transform rotate-[-90deg]">
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-100 dark:text-slate-800" />
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * analysis.score) / 100} className={`${analysis.score > 80 ? 'text-green-500' : analysis.score > 60 ? 'text-orange-500' : 'text-red-500'} transition-all duration-1000`} />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                                <span className="text-5xl font-black text-gray-900 dark:text-white leading-none">{analysis.score}</span>
                                                <span className="text-sm font-bold text-gray-400 mt-1">/ 100</span>
                                                <div className="mt-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">
                                                    {analysis.ats_compatibility} Match
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-xl">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Analysis Summary</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6">{analysis.summary}</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CheckCircle size={16} className="text-green-500" />
                                                    <span className="font-bold text-sm text-gray-900 dark:text-white">Keywords Found</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {analysis.keywords_found.map(k => (
                                                        <span key={k} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded font-medium">{k}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <AlertTriangle size={16} className="text-orange-500" />
                                                    <span className="font-bold text-sm text-gray-900 dark:text-white">Missing Keywords</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {analysis.keywords_missing.map(k => (
                                                        <span key={k} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded font-medium">{k}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA - Become the Candidate */}
                                <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 rounded-3xl p-10 text-center text-white shadow-2xl mb-12 relative overflow-hidden group">
                                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[120%] bg-white/5 rounded-full blur-3xl group-hover:translate-x-[20%] transition-transform duration-1000 ease-in-out"></div>
                                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[120%] bg-pink-500/10 rounded-full blur-3xl"></div>

                                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                                            <Wand2 size={42} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                        </div>
                                        <h3 className="text-4xl font-black mb-4 leading-tight tracking-tight">Become the Candidate <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-pink-300">Recruiters Fight Over</span></h3>
                                        <p className="text-purple-100 mb-8 text-lg max-w-2xl font-medium">
                                            Stop guessing. Our AI uses high-impact action verbs and quantified achievements used by Google & McKinsey talent to fix your gaps in seconds.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <button
                                                onClick={optimizeResume}
                                                className="bg-white text-purple-700 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] inline-flex items-center gap-3"
                                            >
                                                <Sparkles size={24} className="text-purple-600" /> Optimize with OutlineDev AI Now
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const el = document.getElementById('mentorship-path');
                                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="bg-purple-900/40 backdrop-blur-md text-white border border-white/20 px-8 py-5 rounded-2xl font-bold hover:bg-purple-900/60 transition-all flex items-center gap-2"
                                            >
                                                View Learning Path
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Analysis Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
                                                <AlertCircle className="text-red-600" size={20} />
                                            </div>
                                            Issues Found
                                        </h3>
                                        <div className="space-y-4">
                                            {analysis.formatting_issues.map((issue, i) => (
                                                <div key={i} className="flex gap-4 p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-red-100 dark:border-red-900/30 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                                    <X className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                                    <p className="text-gray-700 dark:text-gray-200 font-medium text-sm leading-relaxed">{issue}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                                                <Sparkles className="text-green-600" size={20} />
                                            </div>
                                            Strategic Improvements
                                        </h3>
                                        <div className="space-y-4">
                                            {analysis.improvements.map((imp, i) => (
                                                <div key={i} className="p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm hover:border-purple-300 transition-all">
                                                    <div className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 rounded-full w-fit">{imp.section}</div>
                                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">{imp.tip}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Key Achievements Section */}
                                {analysis.key_achievements && analysis.key_achievements.length > 0 && (
                                    <div className="mb-12">
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                                                <Trophy className="text-blue-600" size={20} />
                                            </div>
                                            3 Key Achievements to Highlight
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {analysis.key_achievements.map((achievement, i) => (
                                                <div key={i} className="p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-slate-900 border border-blue-100 dark:border-blue-900/30 rounded-2xl shadow-sm hover:scale-[1.02] transition-transform">
                                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mb-4 shadow-lg">{i + 1}</div>
                                                    <p className="text-gray-700 dark:text-gray-200 text-sm font-bold leading-relaxed">{achievement}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Bottom - Missing Skills Learning Path Section */}
                                {analysis.missing_skills_path && analysis.missing_skills_path.length > 0 && (
                                    <div id="mentorship-path" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-gray-200 dark:border-slate-700 shadow-xl mb-12 overflow-hidden relative">
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <Wand2 size={120} className="text-purple-600" />
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-4">
                                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-2xl flex items-center justify-center shadow-inner">
                                                    <Sparkles className="text-purple-600" size={24} />
                                                </div>
                                                Guided Learning Path to Mastery
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl font-medium">We identified these critical gaps. Here is your personalized roadmap to bridge them and dominate your next interview.</p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {analysis.missing_skills_path.map((skill, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="p-6 bg-white dark:bg-slate-800/40 border border-purple-100 dark:border-purple-800/30 rounded-[2rem] relative group hover:border-purple-400 dark:hover:border-purple-600 transition-all shadow-sm hover:shadow-xl"
                                                    >
                                                        <div className="text-xl font-black text-purple-700 dark:text-purple-400 mb-3 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{skill.skill}</div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed font-medium">{skill.action}</p>
                                                        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white bg-indigo-600 dark:bg-indigo-500 px-4 py-2 rounded-xl group-hover:scale-105 transition-transform shadow-md w-fit">
                                                            <BookOpen size={14} /> {skill.resource}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <div className="mt-12 p-8 bg-slate-900 dark:bg-black rounded-[2rem] border border-white/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-50"></div>
                                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-xl border border-white/20">
                                                    <AlertCircle className="text-yellow-400" size={32} />
                                                </div>
                                                <div className="relative z-10">
                                                    <div className="text-2xl font-black text-white mb-2">Still feeling stuck?</div>
                                                    <p className="text-gray-400 max-w-lg font-medium">Join our 1-on-1 mentorship program. Get guided coaching from tech leaders to master these skills in weeks, not years.</p>
                                                </div>
                                                <Link href="/mentors" className="relative z-10 ml-auto px-10 py-5 bg-white text-slate-900 text-xl font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-white/20 shadow-xl whitespace-nowrap">
                                                    Find a Mentor
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}


                            </motion.div>
                        )}

                        {/* OPTIMIZING STATE */}
                        {auditState === 'optimizing' && (
                            <motion.div
                                key="optimizing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="max-w-md mx-auto text-center pt-10"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-8">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="flex items-center justify-center"
                                    >
                                        <Wand2 size={64} className="text-purple-600 dark:text-purple-400" />
                                    </motion.div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI is Optimizing...</h3>

                                {/* Progress Bar */}
                                <div className="w-full mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{progressMessage}</span>
                                        <span className="text-sm font-bold text-purple-600">{progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                        <motion.div
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* OPTIMIZED STATE */}
                        {auditState === 'optimized' && optimizedResume && (
                            <motion.div
                                key="optimized"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full"
                            >
                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-center text-white shadow-2xl mb-8">
                                    <div className="flex items-center justify-center gap-8 mb-4">
                                        <div>
                                            <div className="text-5xl font-black">{analysis.score}</div>
                                            <div className="text-sm opacity-90">Before</div>
                                        </div>
                                        <ArrowRight size={32} />
                                        <div>
                                            <div className="text-6xl font-black">{optimizedResume.score}</div>
                                            <div className="text-sm opacity-90">After</div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">🎉 +{optimizedResume.score - analysis.score} Point Improvement!</h3>
                                    <p className="text-green-100">Resume optimized with YOUR real data</p>
                                </div>

                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">✨ Professional Summary</h3>
                                        <button
                                            onClick={() => copyToClipboard(optimizedResume.sections.summary)}
                                            className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-bold hover:bg-purple-200 transition-all flex items-center gap-2"
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">{optimizedResume.sections.summary}</p>
                                </div>

                                {/* Layout Choice */}
                                <div className="mt-8 mb-8">
                                    <h4 className="text-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-6 px-2">Choose Your Premium Resume Design:</h4>
                                    <div className="flex gap-4 justify-center overflow-x-auto pb-8 pt-4 px-4 no-scrollbar">
                                        {[
                                            { id: 'classic', label: 'Classic ATS', desc: 'Standard' },
                                            { id: 'modern', label: 'Modern', desc: 'Bold' },
                                            { id: 'executive', label: 'Executive', desc: 'Professional' },
                                            { id: 'tech', label: 'Tech / Dev', desc: 'Monospace' },
                                            { id: 'glacial', label: 'Glacial', desc: 'Blue' },
                                            { id: 'minimal', label: 'Minimal', desc: 'Clean' }
                                        ].map(layout => (
                                            <button
                                                key={layout.id}
                                                onClick={() => setSelectedLayout(layout.id)}
                                                className={`flex flex-col items-center px-6 py-4 rounded-2xl border-2 transition-all min-w-[140px] flex-shrink-0 ${selectedLayout === layout.id
                                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 scale-105 shadow-lg'
                                                    : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:border-purple-300 shadow-sm'
                                                    }`}
                                            >
                                                <LayoutTemplate size={24} className="mb-2" />
                                                <span className="font-bold text-sm mb-1">{layout.label}</span>
                                                <span className="text-[10px] opacity-70 uppercase tracking-tighter">{layout.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Ready to Apply / Download Section */}
                                <div className="max-w-xl mx-auto text-center pb-12">
                                    <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-[0.2em]">Ready to Apply?</h4>
                                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center bg-white/50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm mb-8">
                                        <div className="flex h-12 bg-gray-100 dark:bg-slate-900 rounded-xl p-1 w-full sm:w-auto">
                                            <button
                                                onClick={() => setDownloadFormat('pdf')}
                                                className={`flex-1 sm:px-6 flex items-center justify-center gap-2 rounded-lg font-bold transition-all ${downloadFormat === 'pdf' ? 'bg-white dark:bg-slate-700 text-purple-600 shadow-sm' : 'text-gray-500'}`}
                                            >
                                                PDF
                                            </button>
                                            <button
                                                onClick={() => setDownloadFormat('docx')}
                                                className={`flex-1 sm:px-6 flex items-center justify-center gap-2 rounded-lg font-bold transition-all ${downloadFormat === 'docx' ? 'bg-white dark:bg-slate-700 text-purple-600 shadow-sm' : 'text-gray-500'}`}
                                            >
                                                DOCX
                                            </button>
                                        </div>
                                        <button
                                            onClick={downloadOptimizedResume}
                                            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-black text-lg transition-all shadow-[0_10px_30px_rgba(236,72,153,0.3)] flex items-center justify-center gap-3 hover:scale-105"
                                        >
                                            <Download size={22} /> Download Optimized Resume
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setAuditState('idle')}
                                        className="text-gray-500 hover:text-purple-600 font-bold transition-colors flex items-center gap-2 mx-auto"
                                    >
                                        <ArrowRight className="rotate-180" size={16} /> Start New Scan
                                    </button>
                                </div>

                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-xl mb-12 text-left">
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        <div className="flex-1">
                                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Draft Your Cover Letter</h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                                                A custom-tailored cover letter creates an immediate connection. Let our AI draft one that highlights your best achievements.
                                            </p>

                                            {coverLetter ? (
                                                <div id="cover-letter-section" className="p-8 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-slate-700 mb-6 relative group">
                                                    <div className="absolute top-4 right-4 animate-in fade-in zoom-in duration-300">
                                                        <button
                                                            onClick={() => copyToClipboard(coverLetter.coverLetter)}
                                                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-xl hover:text-purple-600 transition-all shadow-sm border border-gray-100 dark:border-slate-600 font-bold text-sm"
                                                        >
                                                            {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy Letter</>}
                                                        </button>
                                                    </div>
                                                    <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-serif leading-relaxed text-lg pr-12 pb-4">
                                                        {coverLetter.coverLetter}
                                                    </div>
                                                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
                                                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Personalized Strategic Focus:</h4>
                                                        <div className="flex flex-wrap gap-3">
                                                            {coverLetter.keyTailoredPoints.map((point, i) => (
                                                                <span key={i} className="px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-lg border border-indigo-100 dark:border-indigo-800/30 flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> {point}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={generateCoverLetter}
                                                    disabled={isGeneratingCoverLetter}
                                                    className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xl rounded-2xl transition-all shadow-xl flex items-center gap-3 hover:scale-105 active:scale-95 disabled:opacity-50"
                                                >
                                                    {isGeneratingCoverLetter ? (
                                                        <><Loader2 className="animate-spin" /> Crafting Your Story...</>
                                                    ) : (
                                                        <><PenTool size={24} /> Get My AI Cover Letter</>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Mentor CTA */}
                                <div id="mentorship-path" className="bg-slate-900 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden mb-12">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/20 opacity-50"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-5xl font-black mb-6">Go Pro with 1-on-1 Mentorship</h3>
                                        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                                            The resume gets you in the door. <span className="text-white font-bold underline decoration-purple-500 underline-offset-4">The interview gets you the job.</span> Book a session with senior developers from top tech companies.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
                                            {[
                                                { label: 'Mock Interview', price: 'FREE', icon: <ShieldCheck size={32} className="text-blue-400" /> },
                                                { label: 'Portfolio Review', price: 'FREE', icon: <PenTool size={32} className="text-pink-400" /> },
                                                { label: 'Career Strategy', price: 'FREE', icon: <Sparkles size={32} className="text-yellow-400" /> }
                                            ].map((svc, i) => (
                                                <div key={i} className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] flex flex-col items-center hover:bg-white/10 transition-colors group">
                                                    <div className="mb-6 group-hover:scale-110 transition-transform">{svc.icon}</div>
                                                    <div className="font-bold text-xl mb-2 text-gray-300">{svc.label}</div>
                                                    <div className="text-4xl font-black text-white">{svc.price}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <Link href="/mentors" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-slate-900 rounded-3xl font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_60px_rgba(0,0,0,0.6)] group">
                                            Scale My Career <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>


                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

function ScanningStep({ text, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay * 0.8 }}
            className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm"
        >
            <CheckCircle size={14} className="text-green-500" /> {text}
        </motion.div>
    );
}
