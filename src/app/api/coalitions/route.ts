import { NextRequest, NextResponse } from "next/server";
import {
  getInterestCounts,
  addInterest,
  addStake,
  getStakesByDomain,
  addQuery,
  getTrending,
  getQueryCounts,
  pushActivity,
  getRecentActivity,
} from "@/lib/coalitions-db";

// GET: retrieve interest counts, stakes, trending, and activity feed
export async function GET() {
  const [interests, stakesByDomain, trending, activity, queryCounts] = await Promise.all([
    getInterestCounts(),
    getStakesByDomain(),
    getTrending(),
    getRecentActivity(),
    getQueryCounts(),
  ]);

  return NextResponse.json({
    interests,
    stakes: stakesByDomain,
    trending,
    activity,
    totalQueries: queryCounts.total,
    recentQueryCount: queryCounts.recent,
  });
}

// POST: log a query, signal interest, record a stake, or withdraw
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, domainId, query, address, amount, txHash } = body;

  if (action === "query") {
    await addQuery(query || "", domainId || undefined);
    return NextResponse.json({ success: true });
  }

  if (action === "interest") {
    if (!domainId) {
      return NextResponse.json({ error: "domainId required" }, { status: 400 });
    }
    const userId = address || `anon-${Math.random().toString(36).slice(2)}`;
    const count = await addInterest(domainId, userId);
    await pushActivity({ type: "interest", domainId, address: userId });
    return NextResponse.json({ success: true, count });
  }

  if (action === "stake") {
    if (!domainId || !address || !amount || !txHash) {
      return NextResponse.json(
        { error: "domainId, address, amount, and txHash required" },
        { status: 400 }
      );
    }
    await addStake(domainId, address, amount, txHash);
    await pushActivity({ type: "stake", domainId, address, amount });
    return NextResponse.json({ success: true });
  }

  if (action === "withdraw") {
    if (!domainId || !address || !amount) {
      return NextResponse.json({ error: "domainId, address, and amount required" }, { status: 400 });
    }
    await pushActivity({ type: "withdraw", domainId, address, amount });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
