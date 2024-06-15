import { SignIn } from "@clerk/nextjs";

const SignInModule: React.FC<{ path: string }> = async ({ path }) => {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <SignIn path={path} routing="path" />
    </main>
  );
}

export default SignInModule;
