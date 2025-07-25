import { useField } from "formik";
import type { FieldHookConfig } from "formik";
import type {
    ReactNode,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    SelectHTMLAttributes,
    ElementType,
    ChangeEvent,
} from "react";

// Extending the FieldHookConfig type from formik with our custom props and all HTML input attributes
export interface InputProps
    extends FieldHookConfig<string>,
        Omit<
            InputHTMLAttributes<HTMLInputElement> &
                TextareaHTMLAttributes<HTMLTextAreaElement> &
                SelectHTMLAttributes<HTMLSelectElement>,
            "name"
        > {
    name: string;
    className?: string;
    errorClassName?: string;
    type?: string;
    placeholder?: string;
    onChange?:(e: ChangeEvent< HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >)=>unknown,
    as?: ElementType;
}

export default function Input({
    className = "",
    onChange,
    errorClassName = "theme-border-error",
    as: Component = "input",
    ...props
}: InputProps): ReactNode {
    // const [field, meta, helper] = useField(props);
    const [field, meta, helper] = useField(props);
    // const obj = useField({oncha})

    if (onChange) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        field.onChange = (e:React.ChangeEvent<any>) => {
            const newValue = onChange(e)
            helper.setValue(newValue)
        }
    }
    return (
        <>
            <Component
                {...field}
                {...props}
                className={`${className} ${
                    meta.touched && meta.error ? errorClassName : ""
                }`}
            />
            <p className="theme-text-error">
                {meta.touched && meta.error && meta.error}
            </p>
        </>
    );
}
