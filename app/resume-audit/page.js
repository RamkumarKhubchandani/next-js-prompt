"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/app/components/Header';
import { Upload, FileText, CheckCircle, AlertTriangle, ArrowRight, Loader2, Sparkles, AlertCircle, X, ShieldCheck, Download, Wand2, Copy, Check, ChevronLeft, LayoutTemplate, PenTool } from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import ManualResumeForm from './ManualResumeForm';

export default function ResumeAuditPage() {
    const [auditState, setAuditState] = useState('idle');
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [optimizedResume, setOptimizedResume] = useState(null);
    const [originalResumeData, setOriginalResumeData] = useState(null);
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressMessage, setProgressMessage] = useState('');
    const [downloadFormat, setDownloadFormat] = useState('pdf');
    const [selectedLayout, setSelectedLayout] = useState('classic');
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

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

        try {
            setProgress(20);
            await new Promise(resolve => setTimeout(resolve, 500));

            const formData = new FormData();
            if (file) {
                formData.append('resume', file);
            } else if (resumeText) {
                formData.append('resumeText', resumeText);
            } else {
                alert("No resume provided");
                setAuditState('idle');
                return;
            }

            formData.append('jobDescription', jobDescription);

            setProgress(40);
            setProgressMessage('Sending to AI for analysis...');

            const response = await fetch('/api/analyze-resume', {
                method: 'POST',
                body: formData
            });

            setProgress(70);
            setProgressMessage('AI is analyzing your resume...');

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Analysis failed');
            }

            setProgress(90);
            setProgressMessage('Preparing results...');

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
                formatting_issues: data.analysis.formattingIssues,
                improvements: data.analysis.improvements
            });

            setProgress(100);
            setProgressMessage('Complete!');
            await new Promise(resolve => setTimeout(resolve, 300));

            setAuditState('results');
            if (data.analysis.score > 80) confetti();

        } catch (error) {
            console.error('Analysis error:', error);
            alert('Failed to analyze resume. Please check your Gemini API key in .env.local');
            setAuditState('job-input');
        }
    };

    const optimizeResume = async () => {
        setAuditState('optimizing');
        setProgress(0);
        setProgressMessage('Preparing optimization...');

        try {
            setProgress(20);
            await new Promise(resolve => setTimeout(resolve, 500));

            setProgressMessage('Sending to AI...');
            setProgress(40);

            const response = await fetch('/api/optimize-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originalData: originalResumeData,
                    jobDescription: jobDescription
                })
            });

            setProgress(60);
            setProgressMessage('AI is rewriting your resume...');

            if (!response.ok) {
                throw new Error('Optimization failed');
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Optimization failed');
            }

            setProgress(90);
            setProgressMessage('Finalizing...');

            setOptimizedResume(result.data);

            setProgress(100);
            setProgressMessage('Complete!');
            await new Promise(resolve => setTimeout(resolve, 300));

            setAuditState('optimized');
            confetti();

        } catch (error) {
            console.error('Optimization error:', error);
            alert('Failed to optimize resume. Please check your Gemini API key.');
            setAuditState('results');
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
                            <Sparkles size={12} /> AI-Powered Resume Optimizer
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
                                            Analyze Resume with AI →
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
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-100 dark:text-slate-800" />
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * analysis.score) / 100} className="text-orange-500 transition-all duration-1000" />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-5xl font-black text-gray-900 dark:text-white">{analysis.score}</span>
                                                <span className="text-sm font-bold text-gray-400">/ 100</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-xl">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Analysis Summary</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6">{analysis.summary}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                                {/* CTA */}
                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center text-white shadow-2xl mb-8">
                                    <Wand2 size={48} className="mx-auto mb-4" />
                                    <h3 className="text-3xl font-black mb-3">Want to Fix All These Issues?</h3>
                                    <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                                        Our FREE AI will rewrite your resume with YOUR real data + job keywords
                                    </p>
                                    <button
                                        onClick={optimizeResume}
                                        className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-xl inline-flex items-center gap-2"
                                    >
                                        <Sparkles size={20} /> Optimize My Resume with AI
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <AlertCircle className="text-red-500" /> Issues Found
                                        </h3>
                                        {analysis.formatting_issues.map((issue, i) => (
                                            <div key={i} className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
                                                <X className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                                <p className="text-gray-800 dark:text-gray-200 font-medium text-sm">{issue}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <Sparkles className="text-purple-500" /> Improvements
                                        </h3>
                                        {analysis.improvements.map((imp, i) => (
                                            <div key={i} className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm">
                                                <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase mb-1">{imp.section}</div>
                                                <p className="text-gray-700 dark:text-gray-300 text-sm">{imp.tip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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

                                <div className="grid grid-cols-1 gap-6 mb-8">
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
                                </div>

                                {/* Layout Choice */}
                                <div className="mt-8 mb-6">
                                    <h4 className="text-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Choose Resume Layout:</h4>
                                    <div className="flex gap-4 justify-center flex-wrap">
                                        {[
                                            { id: 'classic', label: 'Classic ATS', desc: 'Clean & Standard' },
                                            { id: 'modern', label: 'Modern', desc: 'Stylish & Bold' },
                                            { id: 'executive', label: 'Executive', desc: 'Professional Serif' },
                                            { id: 'tech', label: 'Tech / Dev', desc: 'Monospace Code Style' },
                                            { id: 'glacial', label: 'Glacial', desc: 'Cool Blue & Clean' },
                                            { id: 'minimal', label: 'Minimal', desc: 'Less is More' }
                                        ].map(layout => (
                                            <button
                                                key={layout.id}
                                                onClick={() => setSelectedLayout(layout.id)}
                                                className={`flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all ${selectedLayout === layout.id
                                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                                                    : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:border-purple-300'
                                                    }`}
                                            >
                                                <LayoutTemplate size={20} className="mb-1" />
                                                <span className="font-bold text-sm">{layout.label}</span>
                                                <span className="text-xs opacity-80">{layout.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Download Format Choice */}
                                <div className="mt-4 mb-4">
                                    <h4 className="text-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Choose Download Format:</h4>
                                    <div className="flex gap-4 justify-center">
                                        <label className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-purple-500 transition-all">
                                            <input
                                                type="radio"
                                                name="format"
                                                value="pdf"
                                                checked={downloadFormat === 'pdf'}
                                                onChange={(e) => setDownloadFormat(e.target.value)}
                                                className="w-4 h-4 text-purple-600"
                                            />
                                            <FileText size={18} className="text-red-500" />
                                            <span className="font-bold text-gray-900 dark:text-white">PDF</span>
                                        </label>
                                        <label className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-purple-500 transition-all">
                                            <input
                                                type="radio"
                                                name="format"
                                                value="docx"
                                                checked={downloadFormat === 'docx'}
                                                onChange={(e) => setDownloadFormat(e.target.value)}
                                                className="w-4 h-4 text-purple-600"
                                            />
                                            <FileText size={18} className="text-blue-500" />
                                            <span className="font-bold text-gray-900 dark:text-white">DOCX</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => setAuditState('idle')}
                                        className="px-6 py-3 bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-300 transition-all"
                                    >
                                        Optimize Another
                                    </button>
                                    <button
                                        onClick={downloadOptimizedResume}
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                                    >
                                        <Download size={20} /> Download {downloadFormat.toUpperCase()}
                                    </button>
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
