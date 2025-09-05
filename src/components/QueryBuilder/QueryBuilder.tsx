import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { QueryBuilderProps, QueryField, QueryValues } from "./types";
import Sidebar from "../Sidebar";

function classNames(...classes: (string | false | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

const defaultControlClass = "form-control form-control-sm";
const defaultLabelClass = "form-label fw-semibold small mb-1";

const BooleanToggle: React.FC<{
    value: boolean | undefined;
    onChange: (val: boolean) => void;
    id: string;
    disabled?: boolean;
}> = ({ value = false, onChange, id, disabled }) => {
    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={id}
                checked={value}
                disabled={disabled}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.checked)
                }
            />
        </div>
    );
};

const FieldRenderer: React.FC<{
    field: QueryField;
    value: unknown;
    setValue: (name: string, value: unknown) => void;
}> = ({ field, value, setValue }) => {
    const id = `qb-${field.name}`;
    const common = {
        id,
        disabled: field.disabled,
        placeholder: field.placeholder,
        className: defaultControlClass,
    } as const;

    return (
        <div className="mb-3">
            <label htmlFor={id} className={defaultLabelClass}>
                {field.label}
            </label>
            {field.type === "string" && (
                <input
                    type="text"
                    {...common}
                    value={(value as string) ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue(field.name, e.target.value)
                    }
                />
            )}
            {field.type === "number" && (
                <input
                    type="number"
                    {...common}
                    value={(value as number | undefined) ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue(
                            field.name,
                            e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                        )
                    }
                    min={field.min}
                    max={field.max}
                    step={field.step}
                />
            )}
            {field.type === "boolean" && (
                <BooleanToggle
                    id={id}
                    value={value as boolean | undefined}
                    onChange={(val) => setValue(field.name, val)}
                    disabled={field.disabled}
                />
            )}
            {field.type === "date" && (
                <input
                    type="date"
                    {...common}
                    value={(value as string) ?? ""}
                    min={field.minDate}
                    max={field.maxDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue(field.name, e.target.value || undefined)
                    }
                />
            )}
            {field.type === "enum" && (
                <select
                    {...common}
                    multiple={field.multiple}
                    value={
                        field.multiple
                            ? (value as (string | number | boolean)[])?.map(
                                  (v) => String(v)
                              ) ?? []
                            : value === undefined
                            ? ""
                            : String(value)
                    }
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        if (field.multiple) {
                            const opts = Array.from(
                                e.target.selectedOptions
                            ).map((o) => o.value);
                            setValue(field.name, opts);
                        } else {
                            setValue(field.name, e.target.value || undefined);
                        }
                    }}
                >
                    {!field.multiple && <option value="">-- Any --</option>}
                    {field.options.map((opt) => (
                        <option
                            key={String(opt.value)}
                            value={String(opt.value)}
                        >
                            {opt.label}
                        </option>
                    ))}
                </select>
            )}
            {field.helpText && (
                <div className="form-text small text-muted">
                    {field.helpText}
                </div>
            )}
        </div>
    );
};

export const QueryBuilder: React.FC<QueryBuilderProps> = ({
    title = "Filters",
    fields,
    initialValues = {},
    submitLabel = "Apply",
    resetLabel = "Reset",
    collapsible = true,
    onSubmit,
    onChange,
    onReset,
    className,
    width = 300,
}) => {
    const [values, setValues] = useState<QueryValues>(() => ({
        ...initialValues,
    }));
    const [isCollapsed, setIsCollapsed] = useState(false);

    // keep external changes to initialValues (if they change) in sync
    useEffect(() => {
        setValues({ ...initialValues });
    }, [initialValues]);

    const setValue = useCallback(
        (name: string, val: unknown) => {
            setValues((v) => {
                const next = { ...v, [name]: val };
                if (onChange) onChange(next);
                return next;
            });
        },
        [onChange]
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            onSubmit?.(values);
        },
        [onSubmit, values]
    );

    const handleReset = useCallback(() => {
        setValues({ ...initialValues });
        onReset?.();
        onChange?.({ ...initialValues });
    }, [initialValues, onReset, onChange]);

    // const sidebarStyle: React.CSSProperties = useMemo(
    //     () => ({
    //         width: typeof width === "number" ? `${width}px` : width,
    //     }),
    //     [width]
    // );

    return (
        <>
            <Sidebar
                className={classNames("bg-body-tertiary", className)}
                // style={sidebarStyle}
                collapsed={collapsible ? isCollapsed : false}
                onCollapseChange={(c) => setIsCollapsed(c)}
                collapseButton={
                    collapsible
                        ? (collapsed) => (collapsed ? "+" : "−")
                        : undefined
                }
                containerClassName="d-flex flex-column flex-grow-1"
            >
                <div className="d-flex align-items-center mb-3">
                    <h6 className="mb-0 me-auto text-uppercase small letter-spacing-1">
                        {title}
                    </h6>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={classNames("flex-grow-1 d-flex flex-column")}
                >
                    <div
                        className="flex-grow-1 overflow-auto pe-1"
                        style={{ maxHeight: "calc(100vh - 220px)" }}
                    >
                        {fields.map((f) => (
                            <FieldRenderer
                                key={f.name}
                                field={f}
                                value={values[f.name]}
                                setValue={setValue}
                            />
                        ))}
                    </div>
                    <div className="mt-2 d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm w-100"
                        >
                            {submitLabel}
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={handleReset}
                        >
                            {resetLabel}
                        </button>
                    </div>
                </form>
            </Sidebar>
        </>
    );
};

export default QueryBuilder;
