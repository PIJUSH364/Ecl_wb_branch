import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../controller/userDeatils";

export const SignUp = () => {
  const logIngStatus = useSelector((state) => state.user.authStatus);
  const dispatch = useDispatch();
  // form validation
  const formSchema = Yup.object().shape({
    eisNo: Yup.string()
      .required("ESI  is mandatory")
      .min(8, "ESI  code exact 8 char")
      .max(8, "ESI  code exact 8 char"),
    empCode: Yup.string()
      .required("Employee code  is mandatory")
      .min(6, "Employee code  at least 6 char long")
      .max(8, "Employee code  not more than 8 char long"),
    password: Yup.string()
      .required("Password is mandatory")
      .min(3, "Password must be at 3 char long"),
    confirmPwd: Yup.string()
      .required("Password is mandatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    axios
      .post("http://localhost:5000/emp/sing_up", data)
      .then(function (response) {
        console.log(response.data.message);
        alert(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
    return false;
  }

  useEffect(() => {}, [logIngStatus]);

  return (
    <>
      {logIngStatus && (
        <div className="   flex flex-col justify-center items-center p-4  py-[5rem]">
          <p className="text-3xl pb-2">SignUp to ECL Intranet</p>
          <Form
            className="border-[1px] p-10 pb-2 rounded-lg border-slate-400 w-[400px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Field>
              <label>Eis no</label>
              <input
                name="eisNo"
                placeholder="Enter your Eis  Code"
                type="text"
                {...register("eisNo")}
              />
            </Form.Field>
            {errors.eisNo && <p>{errors.eisNo?.message}</p>}
            <Form.Field>
              <label>Employee Code</label>
              <input
                name="empCode"
                placeholder="Enter Unique Code"
                type="text"
                {...register("empCode")}
              />
            </Form.Field>
            {errors.empCode && <p>{errors.empCode?.message}</p>}
            <Form.Field>
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input
                name="confirmPwd"
                type="password"
                {...register("confirmPwd")}
                className={`form-control ${
                  errors.confirmPwd ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.confirmPwd?.message}
              </div>
            </Form.Field>

            <div className="text-center mt-12">
              <button
                type="submit"
                className="border-[2px] p-1 rounded-lg text-lg px-6  border-slate-400"
              >
                Submit
              </button>
            </div>

            <p
              className="pt-2 tracking-wide underline text-sky-700 cursor-pointer"
              onClick={() => dispatch(isAuth(!isAuth))}
            >
              all ready account ? login
            </p>
          </Form>
        </div>
      )}
    </>
  );
};
