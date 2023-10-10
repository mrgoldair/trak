import React, { useReducer, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import logo from '../../assets/brand.svg';

type FieldProps = {
  name: string
  type: string
  required?: boolean
}

type State = {
  valid: boolean
}

type Action =
  | { type: "valid" }
  | { type: "invalid" }

const validator =
  (validity: State, action: Action) => {
    switch (action.type) {
      case "valid": return {
        ...validity,
        valid: true
      }
      case "invalid": return {
        ...validity,
        valid: false
      }
    }
  }

const Field =
  ({ name, type, required = false }: FieldProps) => {

    const ref = useRef<HTMLInputElement>(null)
    const [validity, dispatch] = useReducer(validator, { valid: false })

    const validate: React.ChangeEventHandler<HTMLInputElement> =
      ({ target }) => {
        target.validity.valid
          ? dispatch({ type: "valid" })
          : dispatch({ type: "invalid" })
      }

    return (
      <div className="flex flex-col gap-1.5">
        <label
          className="uppercase text-[13px] text-[#2F3339] font-medium">{name}</label>
        <div>
          <input
            ref={ref}
            autoComplete='false'
            style={{ outline: 'none' }}
            className={`peer w-full h-[47px] px-5 hover:bg-[#efefef]`}
            type={type}
            onChange={validate}
            required={required} />
          <div className="w-0 peer-focus:w-full border-b-[3px] border-black transition-all" />
        </div>
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
        style={{ width: 475 }}
        className="w-1/2 flex flex-col gap-12">
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
          <div className="mb-20">
            <img src={logo} style={{ width: 95 }} />
            <div className='uppercase flex justify-between font-bold text-[#2F2D23] mt-1'>
              {"PROJECTS".split('').map(l => <span>{l}</span>)}
            </div>
          </div>
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
                w-full h-[47px] p-4 mt-4
                flex items-center justify-center
                bg-[#272830] hover:bg-[#33343D] text-white text-[15px] uppercase font-semibold tracking-widest`}
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
