"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "../ui/popover";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align = "start",
  sideOffset = 0,
}: FormPopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log("Board Created");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error("Error creating board");
    },
  });

  const onSubmit = (data: FormData) => {
    const title = data.get("title") as string;
    const image = data.get("image") as string;
    console.log("Creating board", title, image);
    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"link"}
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board Tittle"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create Board</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
