import { useForm } from "react-hook-form";
import useSubmitState from "../../hooks/useSubmitState";
import { BeatLoader } from "react-spinners";
import { addUserInfo } from "../../store/userInfoSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BASEURL;
const LogIn = () => {
  const { submitState, submitHandler } = useSubmitState();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitHandler = async (value) => {
    try {
      const { data } = await submitHandler(`${baseURL}/login`, value);
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("userName", data.data.name);
      dispatch(
        addUserInfo({
          name: data.data.name,
          email: data.data.email,
          id: data.data.id,
          accessToken: data.data.accessToken,
        })
      );
      reset();
      toast.success("Log in success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                      message: "Please enter valid email",
                    },
                  })}
                />
                <p className="text-red-400 text-sm">{errors.email?.message}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <p className="text-red-400 text-sm">
                  {errors.password?.message}
                </p>
              </div>
            </div>

            <p className="text-red-400 text-sm">
              {submitState.errorMessage && submitState.errorMessage}
            </p>
            <BeatLoader loading={submitState.loading} />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-4"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
