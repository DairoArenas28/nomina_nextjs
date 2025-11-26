

const readJSON = async () => {
  const res = await fetch(`http://localhost:3000/api/fs/`);
  const json = await res.json();
  console.log(json);
  return json
};

export default async function Home() {
  const settings = await readJSON();
  return (
    <div className="flex w-full items-center justify-center font-sans dark:bg-black bg-amber-300">
      <main className="flex  w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-amber-300 dark:bg-black sm:items-start">
        <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-6xl">
          Welcome to <a href="https://nextjs.org">Next.js! {settings.data.name}</a>
        </h1>
        
        <p className="mt-6 text-2xl text-zinc-700 dark:text-zinc-300">
          Get started by editing <code className="rounded-md bg-zinc-100 p-1 dark:bg-zinc-800">app/page.tsx</code>
        </p>
      </main>
    </div>
  );
}
