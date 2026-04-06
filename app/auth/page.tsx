import { auth, signIn, signOut } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (session) {
    return (
      <div className="p-4">
        <p>Signed in as {session.user?.email}</p>
        <form action={async () => { "use server"; await signOut(); }}>
          <button type="submit">Sign Out</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4">
      <form action={async () => { "use server"; await signIn("google"); }}>
        <button type="submit">Sign in with Google</button>
      </form>
    </div>
  );
}
