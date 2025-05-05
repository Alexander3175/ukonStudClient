import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCreatePost } from "../../service/adminService";
import { useUserStore } from "../../stores/userStore";
import {
  createPostSchema,
  TcreatePostForm,
} from "../../validation/adminPanelSchemas";

const CreatePost = () => {
  const { userRole } = useUserStore();
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (FormData: FormData) => fetchCreatePost(FormData),
  });
  useEffect(() => {
    if (!userRole.some((role) => role.role === "ADMIN")) {
      navigate("/");
    }
  }, [userRole, navigate]);

  const { register, handleSubmit, setValue } = useForm<TcreatePostForm>({
    resolver: zodResolver(createPostSchema),
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
      if (allowedFormats.includes(file.type)) {
        setPreview(URL.createObjectURL(file));
        setValue("file", file);
      } else {
        toast.error(
          "Invalid file format. Please select an image file (JPEG, PNG, GIF)."
        );
      }
    }
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tagsInput = event.target.value;
    const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
    setValue("tags", tagsArray);
  };

  const onSubmit: SubmitHandler<TcreatePostForm> = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", data.tags.join(","));
    formData.append("gameDeveloper", data.gameDeveloper);
    formData.append("releaseDate", data.releaseDate);
    formData.append("platform", data.platform);
    if (data.file) formData.append("file", data.file);

    mutate(formData, {
      onSuccess: () => toast.success("Post created successfully!"),
      onError: () => toast.error("Post created Error"),
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container p-8 max-w-3xl w-[500px] bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-8">
          Create a New Post
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Post Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Post Content
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              onChange={handleTagsChange}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tag1, tag2, tag3"
            />
          </div>
          <div>
            <label
              htmlFor="gameDeveloper"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Developer
            </label>
            <input
              type="text"
              id="gameDeveloper"
              {...register("gameDeveloper")}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="developer..."
            />
          </div>
          <div>
            <label
              htmlFor="releaseDate"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Release Date
            </label>
            <input
              type="date"
              id="releaseDate"
              {...register("releaseDate")}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2025-02-11"
            />
          </div>
          <div>
            <label
              htmlFor="platform"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Platform (device)
            </label>
            <input
              type="text"
              id="platform"
              {...register("platform")}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="PC (Microsoft Windows)..."
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Post Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Create Post
            </button>
          </div>
        </form>

        {preview && (
          <div className="mt-6 flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-[50%] max-w-full rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
