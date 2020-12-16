import { useEffect, useContext, createContext, useState, useRef } from 'react';
import { auth, signInWithGoogle } from '../../firebase';
import { mapUserAuthData } from '../../firebase/utils';

import AuthDialogComponent from './AuthDialog';

const UserContext = createContext(null);

const logout = () => {
    auth.signOut();
};

const signInWithCreds = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
};

const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
};

export const useUser = () => {
    const { user, initializing } = useContext(UserContext);

    return {
        user,
        initializing,
        signInWithGoogle,
        logout,
        signInWithCreds,
        signUp
    };
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const initializing = useRef(true);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((auth) => {
            if (initializing.current) initializing.current = false;
            if (!auth) return setUser(null);

            mapUserAuthData(auth).then((authData) => {
                setUser({ ...authData });
            });
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

    return (
        <UserContext.Provider
            value={{ user, initializing: initializing.current }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const AuthDialog = AuthDialogComponent;
