import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  errors?: string | null;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validatedFields = schema.safeParse(data);
    if (!validatedFields.success) {
      return {
        fieldErrors: validatedFields.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(validatedFields.data);
  };
};
