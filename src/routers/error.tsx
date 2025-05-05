import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (!error || typeof error !== "object") {
    return (
      <div id="error-page" className="text-center shadow-xl">
        <h1>Oops!</h1>
        <p>Unknown error occurred.</p>
      </div>
    );
  }
  const { message, statusText } = error as {
    message: string;
    statusText?: string;
  };

  return (
    <div id="error-page" className="text-center shadow-xl">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{statusText || message}</i>
      </p>
    </div>
  );
}
