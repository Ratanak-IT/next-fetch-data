"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "./card";

import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type LoginType = {
  email: string;
  password: string;
};
const formSchema= z.object({
  email: z.email("Please input email").nonempty(),
  password: z.string().min(8,"At lest 8 character").nonempty()
})

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(formSchema)
  });
  function loginsubmit(data:object){
    console.log(data);
  }
  console.log(watch("email"))
  console.log(watch("password"))
  return (
    <main className="flex justify-center h-screen items-center">
      <Card className="w-full max-w-sm">
        {/* Header */}
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>

          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>

          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>

        {/* Form Content */}
        <CardContent>
          <form onSubmit={handleSubmit(loginsubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  
                  {...register("email")}
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input 
                id="password"
                 type="password"
                
                {...register("password")}
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>
              {/* button need in form for handle submit */}
               <Button type="submit" className="w-full">
                  Login
                </Button>

                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
