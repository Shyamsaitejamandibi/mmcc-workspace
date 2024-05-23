"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: () => {
      toast.error("Error deleting board");
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pt-3 pb-3"
        side="bottom"
        align="start"
        sideOffset={-10}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Options
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          disabled={isLoading}
          className="w-full rounded-none h-auto py-2 px-5 text-neutral-600 hover:bg-neutral-100 justify-start font-normal text-sm"
        >
          Delete Board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
