"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateCard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { createAuditLogs } from "@/lib/create-audit-logs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      errors: "User not authenticated",
    };
  }

  const { id, boardId, ...values } = data;

  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          boardId,
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });
    await createAuditLogs({
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
      action: ACTION.UPDATE,
    });
  } catch (e) {
    return {
      errors: "Failed to update board",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
