"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateBoard } from "./schema";
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

  const { title, id } = data;

  let board;

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });

    await createAuditLogs({
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      entityTitle: board.title,
      action: ACTION.UPDATE,
    });
  } catch (e) {
    return {
      errors: "Failed to update board",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
