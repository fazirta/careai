import { SignUp } from "@clerk/nextjs";

const SignUpModule: React.FC<{ path: string }> = async ({ path }) => {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <SignUp path={path} routing="path" />
    </main>
  );
}

export default SignUpModule;
