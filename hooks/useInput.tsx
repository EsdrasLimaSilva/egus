import { Input } from "@/components/Input";
import { useState } from "react";

export function useInput() {
    const [inputValue, setInputValue] = useState("");

    return {
        inputValue,
        Input: (
            <Input
                value={inputValue}
                onChange={(text) => setInputValue(text)}
            />
        ),
    };
}
