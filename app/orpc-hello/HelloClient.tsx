"use client";

import { useEffect, useState } from "react";
import { orpc } from "@/features/orpc/client";

export default function HelloClient() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        orpc.hello({ name: "Akash" }).then((result) => {
            setMessage(result.message);
        });
    }, []);

    return <p>{message}</p>;
}