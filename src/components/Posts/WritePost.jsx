import React, { useCallback, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import variables from "../../../variables";
import PrimaryBtn from "../buttons/PrimaryBtn";
import { LuRocket } from "react-icons/lu";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../api/postApi";

export default function WritePost({ post }) {
  const [edit, setEdit] = useState(false);
  useEffect(()=> {
    if (post) {
    setEdit((prev) => !prev);
  }
  },[post])
  const id = crypto.randomUUID();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
    title: post?.title || "",
    body: post?.body || "",
    slug: post?.slug || "",
    tags: post?.tags?.join(", ") || "", // if tags are array, join them
  }
  });

  const [createPost, { isLoading: isCreating, isSuccess, isError }] =
    useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const editorRef = useRef();

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  function transformToArray(value) {
    if (!value) return [];
    return value
      .split(",") // split by comma
      .map((tag) => tag.trim()) // remove extra spaces
      .filter((tag) => tag.length > 0) // remove empty strings
      .slice(0, 3);
  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  async function onSubmit(data) {
    data.date = new Date().toISOString();
    data.tags = transformToArray(data.tags);
    console.log(data);
    

    try {
      if (post) {
        await updatePost({ id: post.id, ...data }).unwrap();
      } else {
        await createPost({ id, ...data }).unwrap();
      }
      alert("post is saved");
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[700px]">
      <div>
        <div className="flex flex-col gap-2.5 min-h-[108px]">
          <label className="font-bold text-black dark:text-white text-xl transition-all duration-300 ease-in-out">
            Title
          </label>
          <input
            className="bg-[#E4E3E3] dark:bg-[#272829] px-[20px] py-[10px] rounded focus:outline-[#a1a1a1] focus:outline-1 w-full text-black dark:text-white text-xl transition-all duration-300 ease-in-out"
            {...register("title", { required: "title is required" })}
            placeholder="Enter title"
          />
          <p className="text-red-600 text-xs text-right">
            {errors.title && errors.title.message}
          </p>
        </div>
        {/* slug */}
        <div className="flex flex-col gap-2 min-h-[108px]">
          <label className="font-bold text-black dark:text-white text-xl transition-all duration-300 ease-in-out">
            Slug
          </label>
          <input
            className="bg-[#E4E3E3] dark:bg-[#272829] px-[20px] py-[10px] rounded focus:outline-[#a1a1a1] focus:outline-1 w-full text-black dark:text-white text-xl transition-all duration-300 ease-in-out"
            {...register("slug", { required: "Slug is required" })}
            placeholder="Enter Slug"
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
          <p className="text-red-600 text-xs text-right">
            {errors.slug && errors.slug.message}
          </p>
        </div>
        {/* body */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-black dark:text-white text-xl transition-all duration-300 ease-in-out">
            Body
          </label>
          <div className="min-h-[500px]">
            <Editor
              apiKey={variables.editorApiKey}
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              value={watch("body") || ""}
              onEditorChange={(content) => setValue("body", content)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-[20px] min-h-[108px]">
          <label className="font-bold text-black dark:text-white text-xl transition-all duration-300 ease-in-out">
            Tags{" "}
            <span className="font-light text-sm">
              (comma seprated, add only three)
            </span>
          </label>
          <input
            className="bg-[#E4E3E3] dark:bg-[#272829] px-[20px] py-[10px] rounded focus:outline-[#a1a1a1] focus:outline-1 w-full text-black dark:text-white text-xl transition-all duration-300 ease-in-out"
            {...register("tags")}
            placeholder="frontend, web dev"
          />
        </div>
        <div>
          <PrimaryBtn
            text={
              isCreating || isUpdating ? "Saving..." : edit ? "Edit" : "Upload"
            }
            icon={isCreating || isUpdating ? "" : <LuRocket />}
          />
        </div>
      </div>
    </form>
  );
}
