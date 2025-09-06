import { useState } from "react";

export function useTarget<T>() {
    const [target, setTarget] = useState<T>();

    function set(tgt: T) {
        setTarget(tgt);
    }

    return { target, set };
}
