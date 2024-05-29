import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p className="font-bold text-4xl">Try out clothes without having to buy them!</p>
      <p className="pt-3">See what yourself would look like with different clothing without needing to buy them</p>
      <button className="mt-4 px-3 py-2 border-sm bg-blue-500 rounded-md">Get Started</button>
    </main>
  );
}
