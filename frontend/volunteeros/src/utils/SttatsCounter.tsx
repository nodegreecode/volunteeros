import { useEffect, useState } from "react";

interface StatsCounterProps {
  value: number;
}

export default function StatsCounter({ value }: StatsCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const duration = 1500;
    const increment = value / (duration / 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);
  }, [value]);

  return <>{count.toLocaleString()}+</>;
}
