import { useField } from "formik";
import type { FieldHookConfig } from "formik";
import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ElementType } from "react";

// Extending the FieldHookConfig type from formik with our custom props and all HTML input attributes
interface InputProps
    extends FieldHookConfig<string>,
        Omit<InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement> & SelectHTMLAttributes<HTMLSelectElement>, "name"> {
    name: string;
    className?: string;
    errorClassName?: string;
    type?: string;
    placeholder?: string;
    as?: ElementType;
}

export default function Input({
    className = "",
    errorClassName = "theme-border-error",
    as: Component = "input",
    ...props
}: InputProps): ReactNode {
    // const [field, meta, helper] = useField(props);
    const [field, meta] = useField(props);

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
