interface RequestHelperParams<T> {
  setLoading?: (loading: boolean) => void;
  action: () => Promise<T>
  onSuccess?: (response: T) => void
  onError?: (error: unknown) => void
}

export async function requestHelper<T>({
  setLoading,
  action,
  onSuccess,
  onError,
}: RequestHelperParams<T>) {

  try {
    setLoading?.(true);
    const response = await action();
    onSuccess?.(response);
    return response;
  } catch (error) {
    onError?.(error);
  } finally {
    setLoading?.(false);
  }

}
