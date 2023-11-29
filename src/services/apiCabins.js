import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("Error while fetcing cabins");
    throw new Error(error.message);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // Checking if the cabin data we receive is either for create or edit
  const hasImagepath = newCabin.image?.startsWith?.(supabaseUrl);

  // Creating a filename for image
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  // gpgkumjuzyvcpcowhvxd.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // gpgkumjuzyvcpcowhvxd.supabase.co/storage/v1/object/public/cabin-images/0.8564364308442063-cabin-008.jpg

  // Creating the image path that's needed for inserting in the cabin table
  const imagePath = hasImagepath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // Updating the data
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  // Inserting the data into cabin table
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  const { data, error } = await query.select().single();
  // Checking if there is an error while inserting into cabin table
  if (error) {
    console.log("Error while creating cabins");
    throw new Error(error.message);
  }

  // Now inserting the file into storage

  if (hasImagepath) return data;

  const { error: storageError } = supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // If there is any problem during adding the photo of the cabin, let's delete the cabin data as well
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "There was an error while uploading the image. The cabin data and image was not recorded in database!"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log("Error while deleting the cabin");
    throw new Error(error.message);
  }
  return data;
}
