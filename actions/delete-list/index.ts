"use server";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteList } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { redirect } from "next/navigation";
import { createAuditLogs } from "@/lib/create-audit-logs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      errors: "User not authenticated",
    };
  }

  const { id, boardId } = data;

  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
    await createAuditLogs({
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: list.title,
      action: ACTION.DELETE,
    });
  } catch (e) {
    return {
      errors: "Failed to delete board",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
