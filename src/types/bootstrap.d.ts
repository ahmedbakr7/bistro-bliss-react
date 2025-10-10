declare module "bootstrap/dist/js/bootstrap.bundle.min.js";

// Minimal bootstrap popover type to satisfy TS (subset used)
declare namespace Bootstrap {
    interface PopoverOptions {
        html?: boolean;
        trigger?: string;
        placement?: string;
        sanitize?: boolean;
        container?: string | Element | false;
        customClass?: string | ((tip: Element) => string);
        content?: string | Element | (() => string | Element);
        title?: string | Element | (() => string | Element); // added
    }
    interface PopoverInstance {
        dispose(): void;
        setContent?(
            content: Record<
                string,
                string | Element | (() => string | Element) | null
            >
        ): void;
    }
    interface PopoverStatic {
        new (el: Element, options?: PopoverOptions): PopoverInstance;
        getInstance(el: Element): PopoverInstance | null;
    }
}

declare module "bootstrap" {
    export class Popover {
        constructor(el: Element, options?: Bootstrap.PopoverOptions);
        static getInstance(el: Element): Popover | null;
        static getOrCreateInstance(
            el: Element,
            options?: Bootstrap.PopoverOptions
        ): Popover;
        dispose(): void;
        setContent?(
            content: Record<
                string,
                string | Element | (() => string | Element) | null
            >
        ): void;
    }
}

interface Window {
    bootstrap?: {
        Popover: Bootstrap.PopoverStatic;
    };
}
