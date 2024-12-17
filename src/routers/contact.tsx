import { useForm } from "react-hook-form";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log("Form Submitted:", data);
    alert("Form was submitted successfully!");
    reset();
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap gap-6"
          >
            <div className="w-full sm:w-[290px] flex flex-col">
              <label htmlFor="firstName" className="text-sm text-gray-400">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                  pattern: {
                    value: /^[\p{L}\p{N}]*$/u,
                    message: "Only letters and numbers are allowed",
                  },
                })}
                className={`h-[56px] rounded-xl border pl-2 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter your first name"
              />
            </div>

            <div className="w-full sm:w-[290px] flex flex-col">
              <label htmlFor="lastName" className="text-sm text-gray-400">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[\p{L}\p{N}]*$/u,
                    message: "Only letters and numbers are allowed",
                  },
                })}
                className={`h-[56px] rounded-xl border pl-2 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter your last name"
              />
            </div>
            <div className="w-full sm:w-[590px] flex flex-col">
              <label htmlFor="email" className="text-sm text-gray-400">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email",
                  },
                })}
                className={`h-[56px] rounded-xl border pl-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter your email"
              />
            </div>
            <div className="w-full sm:w-[590px] flex flex-col">
              <label htmlFor="message" className="text-sm text-gray-400">
                Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                className={`h-[132px] rounded-xl border p-2 ${errors.message ? "border-red-500" : "border-gray-300"}`}
                placeholder="Write your message here"
              ></textarea>
            </div>
            <div className="flex justify-end w-full pt-3">
              <button
                type="submit"
                className="w-[180px] h-[50px] bg-blue-600 text-white p-2 rounded-xl"
              >
                Get in touch
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
