import { useEffect, useContext, createContext, useState } from "react";
import { auth, signInWithGoogle } from "../../firebase";
import { mapUserAuthData } from "../../firebase/utils";

import AuthDialogComponent from "./AuthDialog";

const UserContext = createContext(null);

const logout = () => {
  auth.signOut();
};

const signInWithCreds = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const useUser = () => {
  const user = useContext(UserContext);

  return { user, signInWithGoogle, logout, signInWithCreds };
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((auth) => {
      if (!auth) return setUser(null);

      setUser(mapUserAuthData(auth));
      //     const user = await createUserDocument(auth);
      //     firestore.doc(`users/${user.uid}`).onSnapshot((userSnap) => {
      //       this.setState({
      //         user: {
      //           uid: user.uid,
      //           ...userSnap.data(),
      //         },
      //       });
      //     });
    });

    return unsub;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const AuthDialog = AuthDialogComponent;
