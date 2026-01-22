"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Form } from "./form";

const formSchema = z.object({
  title: z.string().min(1, "plaease enter a title"),
  price: z.number().min(1, "Price must be greater than 0"),
  Category: z.string().min(1, "selcect a category"),
  image: z.string().min(1, "please enter an image URL"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductAdd() {
  const [files, setFiles] = useState<File[] | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      Category: "",
      image: "",
    },
  });

  function onSubmit(values: FormValues) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-85 rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10 bg-gray-200 p-6 rounded-lg"
      >
        {/* Title */}
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            placeholder="Description of product"
            {...form.register("title")}
          />
          <FieldDescription>Enter the product title</FieldDescription>
          <FieldError>{form.formState.errors.title?.message}</FieldError>
        </Field>

        {/* Price + Category */}
        <div className="grid grid-cols-12 gap-4">
          {/* Price */}
          <div className="col-span-6">
            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                id="price"
                type="number"
                placeholder="200 USD"
                {...form.register("price")}
              />
              <FieldDescription>Enter the product price</FieldDescription>
              <FieldError>{form.formState.errors.price?.message}</FieldError>
            </Field>
          </div>

          {/* Category */}
          <div className="col-span-6">
            <Controller
              name="Category"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="School">School</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>Choose category</FieldDescription>
                  <FieldError>{form.formState.errors.Category?.message}</FieldError>
                </Field>
              )}
            />
          </div>
        </div>

        {/* Image */}
        <Field>
          <FieldLabel htmlFor="image">Product Image</FieldLabel>
          <Input
            id="image"
            placeholder="Image URL or file path"
            {...form.register("image")}
          />
          <FieldDescription>Select a file or provide an image URL.</FieldDescription>
          <FieldError>{form.formState.errors.image?.message}</FieldError>
        </Field>

        {/* Submit */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
