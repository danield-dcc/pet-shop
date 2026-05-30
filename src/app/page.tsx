interface Props {
  title: string;
}

const Component = ({ title }: Props) => {
  return (
    <>
      <h2>Component</h2>
    </>
  );
};

export default function Home() {
  return (
    <div>
      <h2>Pet shop</h2>
      <Component title={1} />
    </div>
  );
}
