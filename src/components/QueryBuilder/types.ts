export type PrimitiveType = "string" | "number" | "boolean" | "date" | "enum";

export interface EnumOption {
    label: string;
    value: string | number | boolean;
}

export interface QueryFieldBase {
    /** Unique field key */
    name: string;
    /** Label to show in UI */
    label: string;
    /** Primitive data type */
    type: PrimitiveType;
    /** Optional placeholder */
    placeholder?: string;
    /** Optional help text */
    helpText?: string;
    /** Whether the field is disabled */
    disabled?: boolean;
}

export interface StringField extends QueryFieldBase {
    type: "string";
}
export interface NumberField extends QueryFieldBase {
    type: "number";
    min?: number;
    max?: number;
    step?: number;
}
export interface BooleanField extends QueryFieldBase {
    type: "boolean";
}
export interface DateField extends QueryFieldBase {
    type: "date";
    minDate?: string; // ISO
    maxDate?: string; // ISO
}
export interface EnumField extends QueryFieldBase {
    type: "enum";
    options: EnumOption[];
    multiple?: boolean;
}

export type QueryField =
    | StringField
    | NumberField
    | BooleanField
    | DateField
    | EnumField;

export interface QueryBuilderConfig {
    title?: string;
    /** Fields to render */
    fields: QueryField[];
    /** Initial values */
    initialValues?: Record<string, unknown>;
    /** Text for primary action */
    submitLabel?: string;
    /** Text for reset button */
    resetLabel?: string;
    /** Whether to show a collapse/expand toggle */
    collapsible?: boolean;
}

export type QueryValues = Record<string, unknown>;

export interface QueryBuilderProps extends QueryBuilderConfig {
    /** Called when user submits */
    onSubmit?: (values: QueryValues) => void;
    /** Called whenever values change */
    onChange?: (values: QueryValues) => void;
    /** Called on reset */
    onReset?: () => void;
    /** Optional className for the root */
    className?: string;
    /** Width (e.g. '280px') if used as sidebar */
    width?: string | number;
}
