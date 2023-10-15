import { ChangeEventHandler } from "react"

type errorFormType = {
    error: {
        valid: boolean,
        message: string,
    }
}

type InputFormType = {
    label: string,
    name: string,
    type: string,
    onChange: ChangeEventHandler,
    value: string,
}

export const InputFormError: React.FC<errorFormType> = ({ error }) => (
    <>
        {!error.valid ? (
            <div className="mb-4 p-2 bg-red-100 text-red-600 border border-red-300 rounded">
                {error.message}
            </div>
        ) : null}
    </>
)

const InputForm: React.FC<InputFormType> = ({ label, name, type, onChange, value }) => <div className="mb-4">
    {
        label ? <label htmlFor={name} className="block text-gray-600">{label}</label> : null
    }
    <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
        required
    />
</div>

export default InputForm