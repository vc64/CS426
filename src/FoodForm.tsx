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
    <div className="flex flex-col items-center gap-5">
      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput"/>
      <label htmlFor="fileInput" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Select Image</label>
      {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-md" />}
    </div>
  )
}

const FoodForm = () => {
  type Address = {
    street: string;
    state: string;
    zip: string;
  }

  type Times = {
    start: string;
    end: string;
  }

  const [image, setImage] = useState<File | undefined>(undefined);
  const [food, setFood] = useState("");
  const [times, setTimes] = useState<Times | undefined>(undefined);
  const [address, setAddress] = useState<Address | undefined>(undefined);

  const changeTimes = (field: "start" | "end", value: string) => {
    setTimes(prevTimes => {
      return {...(prevTimes || {start:"", end:""}), [field]: value};
    })
  }

  const changeAddress = (field: "street" | "state" | "zip", value: string) => {
    setAddress(prevAddress => {
      return {...(prevAddress || {street:"", state:"", zip:""}), [field]: value}
    })
  }

  return (
    <div className="bg-black rounded-sm bg-white flex justify-center gap-5 flex-col items-left z-10 px-10 py-5 text-black">
      <h2 className="text-3xl font-bold text-gray-800 pb-3">Add a Food Listing</h2>
      <ImageUpload />
      <input 
        type="text"
        placeholder="Name of food"
        value={food}
        onChange={e => setFood(e.target.value)} 
        className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
      />
      <div className="flex flex-row items-center gap-5">
        <p className="text-xl font-semibold">Date: </p>
        <input
          type="date"
          value={times ? times.start : ""}
          onChange={e => changeTimes("start", e.target.value)} 
          className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
        />
      </div>
      <div className="flex flex-row items-center gap-5">
        <p className="text-xl font-semibold">Start: </p>
        <input
          type="time"
          value={times ? times.start : ""}
          onChange={e => changeTimes("start", e.target.value)} 
          className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
        />
      </div>
      <div className="flex flex-row items-center gap-5">
        <p className="text-xl font-semibold">End: </p>
        <input 
          type="time"
          value={times ? times.end : ""}
          onChange={e => changeTimes("end", e.target.value)} 
          className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
        />
      </div>
      <p className="text-xl font-semibold">Where to pick up?</p>
      <input 
        type="text"
        placeholder="street"
        value={address ? address.street : ""}
        onChange={e => changeAddress("street", e.target.value)} 
        className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
      />
      <input 
        type="text"
        placeholder="state"
        value={address ? address.state : ""}
        onChange={e => changeAddress("state", e.target.value)} 
        className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
      />
      <input 
        type="text"
        placeholder="zip code"
        value={address ? address.zip : ""}
        onChange={e => changeAddress("zip", e.target.value)} 
        className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
      />
    </div>
  )
}

export { ImageUpload, FoodForm };