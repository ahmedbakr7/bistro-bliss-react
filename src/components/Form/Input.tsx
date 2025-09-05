import { useField } from "formik";
import type { FieldHookConfig } from "formik";
import {
    type ReactNode,
    type InputHTMLAttributes,
    type TextareaHTMLAttributes,
    type SelectHTMLAttributes,
    type ElementType,
    type ChangeEvent,
    useCallback,
} from "react";

// Extending the FieldHookConfig type from formik with our custom props and all HTML input attributes
export interface InputProps
    extends FieldHookConfig<string>,
        Omit<
            | InputHTMLAttributes<HTMLInputElement>
            | TextareaHTMLAttributes<HTMLTextAreaElement>
            | SelectHTMLAttributes<HTMLSelectElement>,
            "name"
        > {
    name: string;
    className?: string;
    errorClassName?: string;
    type?: string;
    placeholder?: string;
    as?: ElementType;
    onChangeCallback?: (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => unknown;
    // Additional optional attributes to satisfy TS when passing to generic component
    rows?: number;
    step?: string | number;
}

export default function Input({
    className = "",
    onChangeCallback: customOnChange,
    errorClassName = "theme-border-error",
    as: Component = "input",
    ...props
}: InputProps): ReactNode {
    const [field, meta, helper] = useField(props);

    const handleChange = useCallback(
        (
            e: ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            if (customOnChange) {
                const newValue = customOnChange(e);
                helper.setValue(newValue);
            } else {
                field.onChange(e);
            }
        },
        [customOnChange, helper, field]
    );

    return (
        <>
            <Component
                {...field}
                {...props}
                onChange={handleChange}
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
