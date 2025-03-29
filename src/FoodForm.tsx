import { useState } from "react";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex justify-center gap-3 flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 text-black"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-48 h-48 object-cover rounded-lg border text-black"
        />
      )}

      {selectedFile && (
        <p className="mt-2 text-sm text-gray-600 text-black">
          Selected: {selectedFile.name}
        </p>
      )}
    </div>
  )
}

const FoodForm = () => {
  return (
    <div>
      <h2 className="text-black">Add a Food Listing</h2>
      <ImageUpload />
    </div>
  )
}

export { ImageUpload, FoodForm };