import {useEffect, useState} from "react";
import {NotificationSse} from "@/api/volunteeros-be-api.ts";

export function useDataBaseStatus() {

    const [dataBaseMetrics, setDataBaseMetrics] = useState(null);

    useEffect(() => {
        const source = new EventSource(NotificationSse.getDataBaseMetrics, {withCredentials: true});

        source.addEventListener(
            "database-status",
            event => {
                const status = JSON.parse(event.data);
                console.log(status);
                setDataBaseMetrics(status);
            }
        )

        source.onerror = (e) => {
            console.error(e);
        };

        return () => source.close();
    }, []);

    return dataBaseMetrics;
}