interface Props {
  title: string;
  content: string;
}

const Component = ({ title, content }: Props) => {
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
      <Component title={1} content={1} />
    </div>
  );
}
