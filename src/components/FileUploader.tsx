import { type ChangeEvent, type Ref } from "react";
import Input from "./Form/Input";
import type { FieldHookConfig } from "formik";

export interface FileUploaderProps extends FieldHookConfig<string> {
    name: string;
    accept?: string;
    className?: string;
    errorClassName?: string;
    ref?: Ref<HTMLInputElement | undefined>;
    onChangeCallback?: (e: ChangeEvent<HTMLInputElement>) => unknown;
}

export default function FileUploader({
    onChangeCallback,
    ...props
}: FileUploaderProps) {
    return (
        <>
            <Input
                type="file"
                {...props}
                onChangeCallback={(e) => {
                    if (onChangeCallback)
                        onChangeCallback(e as ChangeEvent<HTMLInputElement>);
                    const target = e.target as HTMLInputElement;
                    return target.value;
                }}
            />
        </>
    );
}
