import { useField } from "formik";
import type { FieldHookConfig } from "formik";
import type { ReactNode } from "react";

// Extending the FieldHookConfig type from formik with our custom props
interface InputProps extends FieldHookConfig<string> {
    className?: string;
    errorClassName?: string;
}

export default function Input({
    className = "",
    errorClassName = "",
    ...props
}: InputProps): ReactNode {
    // const [field, meta, helper] = useField(props);
    const [field, meta] = useField(props);

    return (
        <>
            <input
                {...field}
                {...props}
                className={`${className} ${
                    meta.touched && meta.error ? errorClassName : ""
                }`}
            />
            {meta.touched && meta.error && (
                <div className="error">{meta.error}</div>
            )}
        </>
    );
}
