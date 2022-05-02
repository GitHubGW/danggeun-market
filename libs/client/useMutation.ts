import { useState } from "react";

type MutationFunction = (data?: any) => Promise<void>;

interface MutationState<T> {
  data?: T;
  loading: boolean;
  error?: string;
}

type MutationResult<T> = [MutationFunction, MutationState<T>];

const useMutation = <T extends {}>(url: string): MutationResult<T> => {
  const [state, setState] = useState<MutationState<T>>({ data: undefined, loading: false, error: undefined });

  const mutationFunction = async (data?: any): Promise<void> => {
    try {
      setState({ data: undefined, loading: true, error: undefined });
      const result = await (
        await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      setState({ data: result, loading: false, error: undefined });
    } catch (error) {
      console.log("mutationFunction error");
      setState({ data: undefined, loading: false, error: "mutationFunction error" });
    }
  };

  return [mutationFunction, state];
};

export default useMutation;
