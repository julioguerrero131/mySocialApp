import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { Input } from "../ui/input"
import { PostValidation } from "@/lib/validations"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { toast, useToast } from "../hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost } from "@/lib/react-query/queriesAndMutations"

type PostFormProps = {
  post?: Models.Document;
}

const PostForm = ({ post }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption: "",
      file: [],
      location: post ? post?.location: "",
      tags: post ? post?.tags.join(','): "" 
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newPost = await createPost({
      ...values,
      userId: user.id,
    })

    if (!newPost) {
      toast({
        title: 'Intenta de nuevo'
      })
    }

    navigate('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Descripción</FormLabel>
              <FormControl>
                <Textarea 
                  className="shad-textarea custom-scrollbar"
                  placeholder="Descripción" 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Añadir Fotos</FormLabel>
              <FormControl>
                <FileUploader 
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Añadir Ubicación</FormLabel>
              <FormControl>
                <Input 
                  type="text" 
                  className="shad-input" 
                  placeholder="Ubicación" 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Añadir Etiquetas (separados por comas " , ")
              </FormLabel>
              <FormControl>
                <Input 
                  type="text" 
                  className="shad-input" 
                  placeholder="Arte, Humor, Educativo"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button 
            type="button" 
            className="shad-button_dark_4"
          >
            Cancel
          </Button>
          <Button 
            type="submit" className="shad-button_primary whitespace-nowrap"
          >
            Submit
          </Button>
        </div>

      </form>
    </Form>
  )
}

export default PostForm