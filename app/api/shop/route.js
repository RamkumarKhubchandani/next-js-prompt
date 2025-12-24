import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import connectDB from '../../lib/mongodb';
import User from '../../models/User';

const SHOP_ITEMS = [
    {
        id: 'streak_freeze',
        name: 'Streak Freeze',
        description: 'Miss a day without losing your streak! Automatically used when needed.',
        cost: 200,
        icon: 'Snowflake',
        type: 'consumable',
        max: 2 // Limit holding 2 freezes
    },
    {
        id: 'theme_gold',
        name: 'Golden Theme',
        description: 'Show off your wealth with a shiny profile theme.',
        cost: 1000,
        icon: 'Crown',
        type: 'cosmetic'
    },
    {
        id: 'theme_cyber',
        name: 'Cyberpunk Theme',
        description: 'A futuristic neon look for your profile.',
        cost: 500,
        icon: 'Zap',
        type: 'cosmetic'
    }
];

export async function GET(request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectDB();
        const user = await User.findOne({ email: session.user.email })
            .select('xp inventory')
            .lean();

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            xp: user.xp,
            inventory: user.inventory || { streakFreezes: 0, themes: [] },
            items: SHOP_ITEMS
        });

    } catch (error) {
        console.error('Error fetching shop:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { itemId } = await request.json();
        const item = SHOP_ITEMS.find(i => i.id === itemId);

        if (!item) {
            return NextResponse.json({ message: 'Item not found' }, { status: 400 });
        }

        await connectDB();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Initialize inventory if missing
        if (!user.inventory) {
            user.inventory = { streakFreezes: 0, themes: [] };
        }

        // Check funds
        if (user.xp < item.cost) {
            return NextResponse.json({ message: 'Insufficient XP' }, { status: 400 });
        }

        // Check Limits/Duplicates
        if (item.id === 'streak_freeze') {
            if (user.inventory.streakFreezes >= item.max) {
                return NextResponse.json({ message: 'Inventory full for this item' }, { status: 400 });
            }
            user.inventory.streakFreezes += 1;
        } else if (item.type === 'cosmetic') {
            if (user.inventory.themes.includes(item.id)) {
                return NextResponse.json({ message: 'You already own this item' }, { status: 400 });
            }
            user.inventory.themes.push(item.id);
        }

        // Deduct XP
        user.xp -= item.cost;
        await user.save();

        return NextResponse.json({
            message: `Successfully purchased ${item.name}`,
            xp: user.xp,
            inventory: user.inventory
        });

    } catch (error) {
        console.error('Error processing purchase:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
