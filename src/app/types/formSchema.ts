import { z } from "zod";

const FormSchema = z.object({
    tz:z.string().length(9,"The ID number must be a maximum of 9 characters"),
    firstName: z.string().min(2, "Name must be at least 2 characters"),
    lastName:z.string().min(2, "Name must be at least 2 characters"),
    birthDate: z.date().refine((date) => date <= new Date(), {
        message: "Date cannot be in the future",
      }),
    email: z.string().email("Invalid email address"),
  });

  export default FormSchema