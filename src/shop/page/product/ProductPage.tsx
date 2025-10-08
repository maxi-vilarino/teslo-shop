import { useCounterStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";

export const ProductPage = () => {
  const { inc, count, dec } = useCounterStore();
  return (
    <>
      <h1>Count: {count}</h1>
      <Button onClick={inc}>+1</Button>
      <Button onClick={dec}>-1</Button>
    </>
  );
};
