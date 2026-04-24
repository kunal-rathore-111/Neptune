import { Button } from "@repo/ui";
import { useNavigate } from "react-router-dom";

type ErrorCompProps = {
  message?: string;
};

export function ErrorComp({ message }: ErrorCompProps) {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 py-10">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
        <img
          src="/images/404-illustration.svg"
          alt="404 illustration image"
          className="mb-6 h-48 w-auto sm:h-56"
        />

        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Oops!</h2>

            <p className="max-w-md text-sm text-gray-600">
              {message ??
                "Something went wrong. The page you're looking for isn't found, we suggest you back to home."}
            </p>
          </div>

          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    </section>
  );
}
