export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    const { displayName, photoURL, email } = user;
    const createdAt = new Date(); // ? do we have that data from user object

    try {
      await userRef.set({
        displayName,
        photoURL,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const user = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...user.data(),
    };
  } catch (error) {
    console.error(error);
  }
};

export const mapUserAuthData = async (user) => {
  const { uid, email } = user;
  const token = await user.getIdToken(true);
  return {
    id: uid,
    email,
    token,
  };
};

// export const getDocs = async (collection) => {
//   try {
//     const snapshot = await
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
