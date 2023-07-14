const Home = () => {
  return (
    <h2>Loading...</h2>
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