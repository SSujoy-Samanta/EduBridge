import { z } from "zod";
export const signUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().endsWith("@gmail.com").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobile: z.string().min(10, "Mobile number is required").max(13),
  affiliates: z.string().min(1, "Country is required"),
  age: z.string().min(1, "Country is required"),
  currDegree: z.string().min(1, "Country is required"),
  pastDegree: z.string().min(1, "Country is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
});
export const signInSchema = z.object({
  email: z.string().endsWith("@gmail.com").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const RoomSchema = z.object({
  roomName: z.string().min(3, "Room name is required"),
});
export const MobileSchema = z.object({
  mobile: z.string().min(10, "Mobile number is required").max(13),
});
export const AddUserSchema = z.object({
  id: z.number().min(1, "User ID is required"),
  affiliates: z.string().min(1, "Country is required"),
  currDegree: z.string().min(1, "Country is required"),
  pastDegree: z.string().min(1, "Country is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
});
export const OtpSchema=z.object({
  email: z.string().endsWith("@gmail.com").min(1, "Email is required"),
  otp:z.string().min(6,"6 digit otp required"),
})
export const OtpEmailSchema=z.object({
  email: z.string().endsWith("@gmail.com").min(1, "Email is required"),
})
export const PasswordSchema=z.object({
  email: z.string().endsWith("@gmail.com").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  otp:z.string().min(6,"6 digit otp required"),
})
export const PostSchema=z.object({
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url().optional().nullable(), // allow file to be optional or nullable
  authorId: z.number().min(1, "Author Id is required"),
})