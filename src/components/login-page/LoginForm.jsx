import {Input, Button, Typography} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export default function LoginForm({
  changeForm,
  checkLogin,
  loginError,
}) {
  const validationSchema = Yup.object({
    email: Yup.string().trim().required("Required"),
    password: Yup.string().trim().required("Required"),
  }).required();

  // react hook form init
  const {
    register,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      className="flex flex-col gap-4 mt-8 mb-1 w-80 sm:w-96"
      onSubmit={handleSubmit((data, event) => {
        console.log(getValues());
        checkLogin(data);
        event.preventDefault();
      })}
      noValidate>
      {/* Email Field */}
      <>
        <Typography variant="h6" color="white" className="-mb-3">
          Email{" "}
          {errors.email && (
            <span className="text-red-700 !font-light">
              {"     "}*{errors.email?.message}
            </span>
          )}
        </Typography>

        <Input
          {...register("email")}
          type="text"
          size="lg"
          placeholder="Email"
          className="bg-white !border-t-white-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </>
      {/* Password Field */}
      <>
        <Typography variant="h6" color="white" className="-mb-3">
          Password
          {errors.password && (
            <span className="text-red-700 !font-light">
              {"  "}*{errors.password?.message}
            </span>
          )}
        </Typography>
        <Input
          {...register("password")}
          type="password"
          size="lg"
          placeholder="********"
          className="bg-white !border-t-white-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          autoComplete="off"
        />
        <Typography variant="h6">
          <span className="text-red-700 !font-light">{loginError}</span>
        </Typography>
      </>
      <Button className="mt-6" type="submit" fullWidth>
        log in
      </Button>
      <Typography color="gray" className="mt-4 font-normal text-center">
        First time here?{" "}
        <a
          className="font-medium !text-blue-900 hover:underline"
          onClick={changeForm}>
          Create Account
        </a>
      </Typography>
    </form>
  );
}
