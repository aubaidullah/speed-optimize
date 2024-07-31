export default function Custom404() {
    return null;
  }
  
  export const getServerSideProps = () => {
    return {
      redirect: {
        destination: '/holidays',
      },
    };
  };