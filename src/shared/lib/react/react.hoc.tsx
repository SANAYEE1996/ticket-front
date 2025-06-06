import { type FC, type SuspenseProps, Suspense } from "react";

export function withSuspense<WrappedProps extends Object>(
  WrappedComponent: FC<WrappedProps>,
  suspenseProps: SuspenseProps
): FC<WrappedProps> {
  function WrapperComponent(props: WrappedProps) {
    return (
      <Suspense {...suspenseProps}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  }
  return WrapperComponent;
}
export const SuspensFallbackComponent = () => {
  return <div></div>;
};
