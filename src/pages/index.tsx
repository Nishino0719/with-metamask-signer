import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Application</title>
        <meta name="description" content="My Application description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-10">
        <p className="text-3xl">Welcome to Next.js x Tailwind css🎉</p>
      </div>
    </div>
  )
}
