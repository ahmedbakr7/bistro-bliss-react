import {
    useState,
    useEffect,
    useRef,
    type CSSProperties,
    type ReactNode,
    type KeyboardEvent,
    type ClipboardEvent,
} from "react";

export type OtpInputType = "tel" | "number";

interface OtpProps {
    length?: number;
    otpInputStyle?: CSSProperties;
    otpInputType?: OtpInputType;
    onChangeOtp?: (value: string) => void;
    onPaste?: (value: string) => void;
    value?: string; // controlled initial value
    placeholder?: string; // placeholder string (will be sliced to length)
    RenderSeparator?: ReactNode; // optional separator between inputs
    className?: string;
    inputClassName?: string;
    shouldAutoFocus?: boolean;
    shouldAutoSubmit?: boolean; // triggers onComplete when all digits filled
    mask?: string; // e.g. "*" show instead of actual char
    onComplete?: (value: string) => void; // when all boxes are filled
    allowOnlyNumbers?: boolean; // default true
}

export default function Otp({
    length = 6,
    otpInputStyle,
    otpInputType = "tel",
    onChangeOtp,
    onPaste,
    value = "",
    placeholder,
    RenderSeparator,
    shouldAutoFocus,
    shouldAutoSubmit,
    mask,
    className = "",
    inputClassName = "",
    onComplete,
    allowOnlyNumbers = true,
    ...rest
}: OtpProps): ReactNode {
    // warn if provided value length mismatches
    if (value && value.length !== length) {
        console.warn(
            `Otp: provided value length (${value.length}) does not match length prop (${length}). Extra characters will be ignored.`
        );
    }

    const chars = Array.from(placeholder ?? "").slice(0, length);
    const newPlaceholder = [...chars, ...Array(length - chars.length).fill("")];

    const [otp, setOtp] = useState<string[]>(() => {
        const chars = Array.from(value ?? "").slice(0, length);
        return [...chars, ...Array(length - chars.length).fill("")];
    });

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (shouldAutoFocus) {
            inputsRef.current[0]?.focus();
        }
    }, [shouldAutoFocus]);

    // Helper to emit change + completion
    const emitChange = (next: string[]) => {
        const joined = next.join("");
        onChangeOtp?.(joined);
        if (joined.length === length && !next.includes("")) {
            if (shouldAutoSubmit) onComplete?.(joined);
        }
    };

    const focusIndex = (i: number) => {
        if (i < 0 || i >= length) return;
        inputsRef.current[i]?.focus();
        inputsRef.current[i]?.select();
    };

    const distributeCharsFrom = (startIndex: number, raw: string) => {
        if (!raw) return;
        const chars = Array.from(raw).filter((c) =>
            allowOnlyNumbers ? /[0-9]/.test(c) : true
        );
        if (!chars.length) return;
        setOtp((prev) => {
            const next = [...prev];
            let ptr = startIndex;
            for (const c of chars) {
                if (ptr >= length) break;
                next[ptr] = c;
                ptr++;
            }
            // move focus to next empty or last
            const firstEmpty = next.findIndex((c) => c === "");
            focusIndex(
                firstEmpty === -1
                    ? length - 1
                    : Math.max(firstEmpty, startIndex)
            );
            emitChange(next);
            return next;
        });
    };

    const handleChange = (element: HTMLInputElement, index: number) => {
        let val = element.value;
        if (allowOnlyNumbers) val = val.replace(/\D+/g, "");
        if (!val) return; // do nothing if cleared (backspace handled separately)

        // If user typed/pasted multiple chars into one box, distribute
        distributeCharsFrom(index, val);
    };

    const handleBackspace = (
        index: number,
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        setOtp((prev) => {
            const next = [...prev];
            if (prev[index]) {
                // If current has a value, clear it only
                next[index] = "";
                emitChange(next);
                return next;
            }
            // current empty: move back
            if (index > 0) {
                next[index - 1] = "";
                emitChange(next);
                setTimeout(() => focusIndex(index - 1), 0);
            }
            return next;
        });
        e.preventDefault();
    };

    const handleArrowKeyMovement = (
        index: number,
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "ArrowLeft") {
            focusIndex(index - 1);
            e.preventDefault();
        } else if (e.key === "ArrowRight") {
            focusIndex(index + 1);
            e.preventDefault();
        }
    };

    const handleKeyDown = (
        index: number,
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        switch (e.key) {
            case "Backspace":
                handleBackspace(index, e);
                break;
            case "ArrowLeft":
            case "ArrowRight":
                handleArrowKeyMovement(index, e);
                break;
            case "Enter": {
                const joined = otp.join("");
                if (joined.length === length && !otp.includes("")) {
                    onComplete?.(joined);
                }
                break;
            }
            default:
                break;
        }
    };

    const handlePasteEvent = (
        index: number,
        e: ClipboardEvent<HTMLInputElement>
    ) => {
        const clip = e.clipboardData.getData("text");
        if (!clip) return;
        e.preventDefault();
        distributeCharsFrom(index, clip);
        onPaste?.(clip);
    };

    const handleClick = (index: number) => {
        focusIndex(index);
    };

    useEffect(() => {
        // if parent passes a new value prop, sync (controlled like behavior)
        if (value) {
            const incoming = Array.from(value).slice(0, length);
            if (incoming.join("") !== otp.join("")) {
                const next = [
                    ...incoming,
                    ...Array(length - incoming.length).fill(""),
                ];
                setOtp(next);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, length]);

    useEffect(() => {
        // trigger completion side effect when otp filled
        if (!otp.includes("")) {
            const joined = otp.join("");
            if (shouldAutoSubmit) onComplete?.(joined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otp]);

    return (
        <div
            className={`d-flex align-items-center gap-2 ${className}`}
            {...rest}
        >
            {otp.map((val, index) => (
                <div key={index} className="d-flex align-items-center">
                    <input
                        ref={(el) => {
                            inputsRef.current[index] = el;
                        }}
                        inputMode={allowOnlyNumbers ? "numeric" : undefined}
                        maxLength={length} // safeguard (we handle distribution)
                        style={otpInputStyle}
                        className={`${inputClassName}`}
                        type={mask ? "text" : otpInputType}
                        placeholder={newPlaceholder[index]}
                        onChange={(e) =>
                            handleChange(e.target as HTMLInputElement, index)
                        }
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={(e) => handlePasteEvent(index, e)}
                        value={mask && val ? mask : val}
                        aria-label={`OTP character ${index + 1}`}
                        autoComplete="one-time-code"
                    />
                    {RenderSeparator && index !== length - 1 && (
                        <>{RenderSeparator}</>
                    )}
                </div>
            ))}
        </div>
    );
}
