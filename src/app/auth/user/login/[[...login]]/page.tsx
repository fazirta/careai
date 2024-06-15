import { SignIn } from '@clerk/nextjs';

export default async function Page() {
  return <SignIn path="/auth/user/login" routing="path" />;
}
