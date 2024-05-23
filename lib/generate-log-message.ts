import { Activity } from "@prisma/client";

export const generateLogMessage = (log: Activity) => {
  switch (log.action) {
    case "CREATE":
      return `created ${log.entityType} ${log.entityTitle}`;
    case "UPDATE":
      return `updated ${log.entityType} ${log.entityTitle}`;
    case "DELETE":
      return `deleted ${log.entityType} ${log.entityTitle}`;
    default:
      return "unknown action";
  }
};
