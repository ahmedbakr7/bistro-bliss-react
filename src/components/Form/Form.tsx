import {
    Form as FormikForm,
    Formik,
    type FormikConfig,
    type FormikState,
    type FormikValues,
    type FormikHelpers,
} from "formik";
import type { ReactNode } from "react";
import * as Yup from "yup";

interface FormProps<T>
    extends Omit<
        FormikConfig<T>,
        | "initialValues"
        | "validationSchema"
        | "onReset"
        | "validateOnChange"
        | "validateOnBlur"
    > {
    children?: ReactNode | ((formState: FormikState<T>) => ReactNode);
    initialValues: T;
    validationSchema: Yup.AnySchema;
    onReset: (values: T, formikHelpers: FormikHelpers<T>) => void;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
}

export default function Form<T extends FormikValues>({
    children,
    initialValues,
    validationSchema,
    ...otherFormikProps
}: FormProps<T>): ReactNode {
    return (
        <Formik
            {...otherFormikProps}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {(formikProps) => (
                <FormikForm>
                    {typeof children === "function"
                        ? children(formikProps)
                        : children}
                </FormikForm>
            )}
        </Formik>
    );
}
