interface Props {
  name: string;
}

export const AdminTitle = ({ name }: Props) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Welcome back, {name}! 👋
      </h1>
      <p className="text-gray-600">
        Here's what's happening with your business today.
      </p>
    </div>
  );
};
