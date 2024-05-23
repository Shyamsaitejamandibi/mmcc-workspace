import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";
import { auth, currentUser } from "@clerk/nextjs/server";

interface ActionsProps {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLogs = async ({
  entityId,
  entityType,
  entityTitle,
  action,
}: ActionsProps) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!orgId || !user) {
      throw new Error("User not authenticated");
    }

    await db.activity.create({
      data: {
        id: entityId,
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
