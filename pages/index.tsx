import Button from '../components/Button';
import Link from 'next/link';
import WaltIdLogo from '../components/icons/WaltIdLogo';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>walt.id ETHDenver</title>
      </Head>
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <WaltIdLogo height={40} width={40} type="black" />
          <h1 className="text-3xl mt-10">walt.id at ETHDenver</h1>
          <p className="mt-5">Two flows. Two Apps. Start with onboarding.</p>
          <div className="flex flex-row gap-5 mt-10">
            <Button>
              <Link href={'/onboarding'}>Onboarding - Franz</Link>
            </Button>
            <Button>
              <Link href={'/login'}>Authentication - Sissi</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
