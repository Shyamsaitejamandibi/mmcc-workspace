import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return new NextResponse("User not authenticated", { status: 401 });
    }

    const auditLogs = await db.activity.findMany({
      where: {
        entityId: params.cardId,
        orgId,
        entityType: "CARD",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    console.log(auditLogs);
    return NextResponse.json(auditLogs);
  } catch (e) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
