import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import logo from '../../assets/logo.svg';

type FieldProps = {
  name: string
  type: string
  required: boolean
}

const Field =
  ({ name, type, required = false }: FieldProps) => {

    const ref = useRef<HTMLInputElement>(null)
    const [validity, setValidity] = useState<ValidityState | null>(null)

    const validate: React.ChangeEventHandler<HTMLInputElement> =
      ({ target }) => {
        setValidity(target.validity)
      }

    console.log("rendered")

    return (
      <div className="flex flex-col gap-1.5">

        <label
          className="uppercase text-[11px] text-[#2F3339] font-semibold">{name}</label>
        <input
          ref={ref}
          style={{ outline: 'none' }}
          className={`w-full text-[13px] h-[40px] px-4`}
          type={type}
          onChange={validate}
          required={required} />
      </div>
    )
  }

const Form =
  ({ children }: { children: React.ReactNode }) => {

    const handleSubmit =
      () => { }

    return (
      <form noValidate
        onSubmit={e => e.preventDefault()}
        style={{ width: 375 }}
        className="w-1/2 flex flex-col gap-6">
        {children}
      </form>
    )
  }

const SignIn =
  () => {
    const navigate = useNavigate();
    const { signIn } = useAuth();

    return (
      <div
        style={{ width: '100vw', height: '100vh' }}
        className="flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img src={logo} style={{ width: 75 }} className="mb-20" />
          <Form>
            <Field
              name="email"
              type="email"
              required />
            <Field
              name="password"
              type="password" />
            <button
              className={`
                w-full h-[40px] p-4
                flex items-center justify-center
                bg-[#272830] text-white text-xs uppercase font-semibold tracking-wider`}
              onClick={async () => {
                const { data: { session } } = await signIn({ email: "test@naktrak.com.au", password: "password" })
                if (session)
                  navigate("/projects")
              }}>
              Sign in
            </button>
          </Form>
        </div>
      </div>
    )
  }

export default SignIn
