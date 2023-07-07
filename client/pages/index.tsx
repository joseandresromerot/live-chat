const Home = () => {
  return (
    <h1>Hello</h1>
  )
};

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/f9d8cd62-5161-40b9-8d60-a6f804a5f46a",
      permanent: false
    }
  };
}

export default Home;