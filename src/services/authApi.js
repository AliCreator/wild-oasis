import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        avatar: "",
        fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Invalid credentials!");

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateDate;
  if (password) updateDate = { password };
  if (fullName) updateDate = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateDate);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // If the user updated the profile picture/avatar
  const picName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(picName, avatar);
  if (avatarError) throw new Error(avatarError.message);

  // Now let's udpate the user with the url of the new pictur
  // https://gpgkumjuzyvcpcowhvxd.supabase.co/storage/v1/object/public/avatars/wolf.png
  const { data: udpatedUser, error: udpatedUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${picName}`,
      },
    });
  if (udpatedUserError) throw new Error(udpatedUserError.message);
  return udpatedUser;
}
