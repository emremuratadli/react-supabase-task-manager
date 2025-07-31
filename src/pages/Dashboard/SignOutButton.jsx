import React from "react";
import { signOut } from "../../services/authService";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <button className="signout-btn" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
