import React, { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import RTE from "../Editor/RTE";
import { Editor } from '@tinymce/tinymce-react';
import variables from '../../../variables'

export default function WritePost() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

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
    .split(",")               // split by comma
    .map(tag => tag.trim())   // remove extra spaces
    .filter(tag => tag.length > 0); // remove empty strings
}

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

  function onSubmit(data) {
    data.date = new Date().toISOString();
    data.tags = transformToArray(data.tags);
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <label htmlFor="">Title :</label> <br />
          <input
            {...register("title", { required: "title is required" })}
            placeholder="Enter title"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        {/* slug */}
        <div>
          <label htmlFor="">Slug :</label> <br />
          <input
            {...register("slug", { required: "Slug is required" })}
            placeholder="Enter Slug"
            onInput={(e) =>  setValue('slug',slugTransform(e.currentTarget.value), {shouldValidate : true})}
          />
          {errors.slug && <p>{errors.slug.message}</p>}
        </div>
        {/* body */}
        <div>
          <label htmlFor="">Body :</label> <br />
          <Editor
            apiKey={variables.editorApiKey}
            onInit={(_evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

            }}
            value={watch("body") || ""}
            onEditorChange={(content) => setValue("body", content)}
          />
        </div>
         <div>
          <label htmlFor="">Tags(comma seprated) :</label> <br />
          <input
            {...register("tags")}
            placeholder="frontend, web dev"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}

