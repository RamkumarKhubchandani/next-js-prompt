import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import dbConnect from '@/app/lib/mongodb';
import User from '@/app/models/User';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email }).select('careerGoals goalPreferences');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            goals: user.careerGoals || { yearly: [], monthly: [], weekly: [] },
            preferences: user.goalPreferences
        });

    } catch (error) {
        console.error('Error fetching career goals:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { type, text, period, isAiSuggested } = await req.json();

        if (!['yearly', 'monthly', 'weekly'].includes(type) || !text || !period) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        await dbConnect();

        const newGoal = {
            id: uuidv4(),
            text,
            isCompleted: false,
            isAiSuggested: isAiSuggested || false,
            progress: 0,
            keyResults: [],
            createdAt: new Date()
        };

        if (type === 'yearly') newGoal.year = period;
        if (type === 'monthly') newGoal.month = period;
        if (type === 'weekly') newGoal.week = period;

        const updateQuery = {};
        updateQuery[`careerGoals.${type}`] = newGoal;

        const user = await User.findOneAndUpdate(
            { email: session.user.email },
            { $push: updateQuery },
            { new: true }
        ).select('careerGoals');

        return NextResponse.json({ success: true, goals: user.careerGoals });

    } catch (error) {
        console.error('Error creating career goal:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { goalId, type, action } = body;

        // action: 'TOGGLE_COMPLETE' | 'ADD_KEY_RESULT' | 'TOGGLE_KEY_RESULT' | 'DELETE_KEY_RESULT'

        if (!goalId || !type) {
            return NextResponse.json({ error: 'Missing goalId or type' }, { status: 400 });
        }

        await dbConnect();

        const typePath = `careerGoals.${type}`;

        if (action === 'TOGGLE_COMPLETE') {
            const updateField = `${typePath}.$.isCompleted`;
            const { isCompleted, progress } = body;
            await User.updateOne(
                { email: session.user.email, [`${typePath}.id`]: goalId },
                { $set: { [updateField]: isCompleted, [`${typePath}.$.progress`]: progress ?? (isCompleted ? 100 : 0) } }
            );
        } else if (action === 'ADD_KEY_RESULT') {
            const { text } = body;
            const newKeyResult = { id: uuidv4(), text, isCompleted: false };
            await User.updateOne(
                { email: session.user.email, [`${typePath}.id`]: goalId },
                { $push: { [`${typePath}.$.keyResults`]: newKeyResult } }
            );
        } else if (action === 'TOGGLE_KEY_RESULT') {
            const { keyResultId, isCompleted } = body;
            // Need to use arrayFilters to update nested array
            await User.updateOne(
                { email: session.user.email },
                { $set: { [`${typePath}.$[goal].keyResults.$[kr].isCompleted`]: isCompleted } },
                { arrayFilters: [{ "goal.id": goalId }, { "kr.id": keyResultId }] }
            );

            // Also need to recalculate progress? Client can send it or we compute.
            // For simplicity, we'll let client re-fetch or optimistically update. 
            // Ideally we should compute progress on server but let's persist the KR state first.
        } else if (action === 'DELETE_KEY_RESULT') {
            const { keyResultId } = body;
            await User.updateOne(
                { email: session.user.email, [`${typePath}.id`]: goalId },
                { $pull: { [`${typePath}.$.keyResults`]: { id: keyResultId } } }
            );
        } else if (action === 'UPDATE_PROGRESS') {
            // Direct progress update
            const { progress } = body;
            await User.updateOne(
                { email: session.user.email, [`${typePath}.id`]: goalId },
                { $set: { [`${typePath}.$.progress`]: progress } }
            );
        }

        // Return updated user goals
        const user = await User.findOne({ email: session.user.email }).select('careerGoals');
        return NextResponse.json({ success: true, goals: user.careerGoals });

    } catch (error) {
        console.error('Error updating goal:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const goalId = searchParams.get('id');
        const type = searchParams.get('type');

        if (!goalId || !type) {
            return NextResponse.json({ error: 'Missing id or type' }, { status: 400 });
        }

        await dbConnect();

        const updateQuery = {};
        updateQuery[`careerGoals.${type}`] = { id: goalId };

        await User.findOneAndUpdate(
            { email: session.user.email },
            { $pull: updateQuery }
        );

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error deleting goal:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
