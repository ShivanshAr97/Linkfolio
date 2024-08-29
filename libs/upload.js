import toast from "react-hot-toast";

export async function upload(ev, callbackFn) {
  const file = ev.target.files?.[0];
  console.log(file);

  if (file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ohu5gfhj");

    try {
      const uploadPromise = await fetch(
        "https://api.cloudinary.com/v1_1/dn2oxlhw7/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const a = await uploadPromise.json();
      console.log(a.url);
      // Use the callback to pass the URL
      callbackFn(a.url);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  } else {
    toast.error("No file selected!");
  }
}