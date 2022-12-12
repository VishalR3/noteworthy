import AppLayout from "../../src/layouts/AppLayout";

const Sample = () => {
  return (
    <div>
      <h1>Sample Page</h1>
    </div>
  );
};

Sample.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Sample;
