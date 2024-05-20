import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'

export default function ResolveRoute() {
  const router = useRouter()

  useEffect(() => {
    const { pathname } = router;
    console.log(pathname)

    if (pathname !== pathname.toLowerCase()) {
      router.push(pathname.toLowerCase())
    }
  })
  return <Error statusCode={404} />
}


export const getServerSideProps = () => {
  return {
    redirect: {
      destination: '/holidays',
    },
  };
};