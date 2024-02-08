import {Input, Button, Typography} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import YupPassword from "yup-password";
import {yupResolver} from "@hookform/resolvers/yup";

export default function SignUpForm({
  changeLoginState,
  // emitNewUser,
  changeForm,
}) {
  // Yup validation
  YupPassword(Yup);
  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      .required("Required")
      .min(10, "Atleast 10 characters long"),
    email: Yup.string()
      .trim()
      .required("Required")
      .email("Email must be vaild"),
    password: Yup.string()
      .trim()
      .required("Required")
      .min(8, "Atleast 8 characters long")
      .minNumbers(2, "Must contain atleast 2 numbers"),
    secPassword: Yup.string()
      .trim()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords do not match"),
  }).required();

  // react hook form init
  const {
    register,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      secPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      className="flex flex-col gap-4 mt-8 mb-1 w-80 sm:w-96"
      onSubmit={handleSubmit((data, event) => {
        console.log(data);
        console.log(getValues());
        changeLoginState();
        // emitNewUser(getValues("username", "email", "password"));
        event.preventDefault();
      })}
      noValidate>
      {/* Username Field */}
      <>
        <Typography variant="h6" color="white" className="-mb-3">
          Your Username{" "}
          {errors.username && (
            <span className="text-red-700 !font-light">
              {"     "}*{errors.username?.message}
            </span>
          )}
        </Typography>

        <Input
          {...register("username")}
          type="text"
          size="lg"
          placeholder="Username"
          className="bg-white !border-t-white-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </>
      {/* Email Field */}
      <>
        <Typography variant="h6" color="white" className="-mb-3">
          Your Email{" "}
          {errors.email && (
            <span className="text-red-700 !font-light">
              {"  "}*{errors.email?.message}
            </span>
          )}
        </Typography>
        <Input
          {...register("email")}
          type="email"
          size="lg"
          placeholder="name@mail.com"
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
      </>
      {/* Confirm Password Field */}
      <>
        <Typography variant="h6" color="white" className="-mb-3">
          Re-enter Password{" "}
          {errors.secPassword && (
            <span className="text-red-700 !font-light">
              {"  "}*{errors.secPassword?.message}
            </span>
          )}
        </Typography>
        <Input
          {...register("secPassword")}
          type="password"
          size="lg"
          placeholder="********"
          className="bg-white !border-t-white-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          autoComplete="off"
        />
      </>
      <Button className="mt-6" type="submit" fullWidth>
        sign up
      </Button>
      <Typography color="gray" className="mt-4 font-normal text-center">
        Already have an account?{" "}
        <a
          className="font-medium !text-blue-900 hover:underline"
          onClick={changeForm}>
          Login
        </a>
      </Typography>
    </form>
  );
}
