"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { uploadImageFile } from "@/lib/data/upload-file";
import ImageUpload, { type ImageFile } from "../image-upload";
import { fetchCategories, insertProduct } from "@/lib/data/fetchPosts";

type Category = { id: number; name: string };

const formSchema = z.object({
  title: z.string().min(5).max(200),
  price: z.coerce.number().positive().default(0),
  categoryId: z.string().min(1, "Please select a category."),
  description: z.string().min(10).max(100),
  images: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

export function InsertForm() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      categoryId: "",
      description: "",
      images: [],
    },
    mode: "onSubmit",
  });

  // ✅ Load categories from Platzi
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await fetchCategories();

         setCategories(data);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load categories");
      } finally {
        if (mounted) setLoadingCategories(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const onhandleImageChange = (imgs: ImageFile[]) => {
    setImages(imgs);
    form.setValue("images", imgs, { shouldValidate: true, shouldDirty: true });
  };

  function assertValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async function onSubmit(product: z.infer<typeof formSchema>) {
  const loadingId = toast.loading("Uploading images...");

  try {
    if (!images.length) throw new Error("Please choose at least 1 image.");

    const uploadedUrls: string[] = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image.file);

      const res = await uploadImageFile(formData);

      const imageUrl = res?.location ?? res?.data?.location;
      if (!imageUrl || typeof imageUrl !== "string")
        throw new Error("Image upload failed (no URL returned).");

      if (!assertValidUrl(imageUrl))
        throw new Error(`Upload returned an invalid URL: ${imageUrl}`);

      uploadedUrls.push(imageUrl);
    }

    const payload = {
      title: product.title,
      price: Number(product.price),
      description: product.description,
      categoryId: Number(product.categoryId),
      images: uploadedUrls,
    };

    const created = await insertProduct(payload);
    
    console.log("Created:", created.data);
    toast.success("Product created successfully 🎉");

    console.log("Created product:", created);

    form.reset();
    setImages([]);
  } catch (error: any) {
    toast.error(error?.message ?? "Something went wrong");
    console.error(error);
  } finally {
    // ✅ REQUIRED so loading toast never sticks
    toast.dismiss(loadingId);
  }
}


  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Product form</CardTitle>
        <CardDescription>Upload images and product info</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="product-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="product-title"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Price</FieldLabel>
                    <Input
                      type="number"
                      value={field.value ?? 0}
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Category</FieldLabel>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={loadingCategories}
                    >
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue
                          placeholder={
                            loadingCategories ? "Loading..." : "Select category"
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea {...field} rows={4} />
                    <InputGroupAddon align="block-end">
                      <InputGroupText>{field.value.length}/100</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="space-y-2">
              <Controller
                name="images"
                control={form.control}
                render={({ fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-images">
                      Choose images
                    </FieldLabel>
                    <ImageUpload
                      aria-invalid={fieldState.invalid}
                      onImagesChange={onhandleImageChange}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>

        <Button type="submit" form="product-form" disabled={loadingCategories}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
