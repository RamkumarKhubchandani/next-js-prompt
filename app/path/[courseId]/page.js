import { notFound } from 'next/navigation';
import { COURSES } from '../../lib/courses/index';
import LearningPathPage from './CoursePageClient';
import JsonLd from '../../components/seo/JsonLd';
import { getCourseSchema } from '../../lib/schema-helpers';

export async function generateMetadata({ params }) {
    const { courseId } = params;
    const course = COURSES[courseId];
    if (!course) return { title: 'Not Found' };

    return {
        title: `${course.title || courseId} Learning Path | OutlineDev`,
        description: course.description || `Master ${course.title || courseId} step-by-day. Checkpoints, labs, sandbox playground and 1:1 mentorship.`,
        alternates: {
            canonical: `https://www.outlinedev.com/path/${courseId}`,
        },
        openGraph: {
            title: `${course.title || courseId} Learning Path`,
            description: course.description,
            url: `https://www.outlinedev.com/path/${courseId}`,
        }
    };
}

export async function generateStaticParams() {
    return Object.keys(COURSES).map((courseId) => ({
        courseId,
    }));
}

export default async function Page({ params }) {
    const { courseId } = params;
    const course = COURSES[courseId];
    if (!course) {
        notFound();
    }

    const courseSchema = getCourseSchema(course);

    return (
        <>
            <JsonLd schema={courseSchema} />
            <LearningPathPage />
        </>
    );
}
