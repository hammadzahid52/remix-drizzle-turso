import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="text-black">
      <main className="p-5">
        <h1 className="text-2xl font-bold">Welcome to Remix!</h1>
        <p className="text-lg">This is a new Remix app.</p>
      </main>
    </div>
  );
}
