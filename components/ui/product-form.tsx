"use client"
import {
    Form,
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  z
} from "zod"
import {
  toast
} from "sonner"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError
} from "@/components/ui/field"
import {
  Button
} from "@/components/ui/button"
import {
  Input
} from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(1)
});

export default function FormProduct() {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-85 rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <Field>
  <FieldLabel htmlFor="username">Username</FieldLabel>
  <Input 
    id="username" 
    placeholder="Username"
    
    {...form.register("username")}
  />
  <FieldDescription>This is your public display name.</FieldDescription>
  <FieldError>{form.formState.errors.username?.message}</FieldError>
</Field>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}