"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function AddListingForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      status: "",
    },
  });
  return (
    <div className="border-2 border-slate-300 rounded-xl flex-grow max-w-2xl p-5">
      <div className="flex items-center space-x-4 mb-5">
        <h1 className="text-4xl font-bold">Adol Bodol</h1>
        <h1 className="text-xl font-bold">List Product</h1>
      </div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}
