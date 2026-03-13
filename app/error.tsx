"use client";

import { memo } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const PageError = ({ error, reset }: ErrorProps): React.ReactElement => (
  <>
    <p>Error status code: {error.message}</p>
    <button type="button" onClick={reset}>
      Try again
    </button>
  </>
);

export default memo(PageError);
