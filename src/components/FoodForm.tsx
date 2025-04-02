import { useState, useContext, useEffect } from "react";
import { X } from "lucide-react";
import { FoodListingContext } from "../contexts/FoodListingContext";
import { foodItemType } from "../data/foodItems";
import { FoodCardsContext } from "../contexts/FoodCardsContext";

const ImageUpload = () => {
  const [, setSelectedFile] = useState<File | null>(null);
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
      <div className={`w-[151px] h-[151px] border-black ${preview ? "" : "border-2"} rounded-md flex justify-center items-center`}>
        {preview && <img src={preview} alt="Preview" className="w-[150px] h-[150px] object-cover rounded-md" />}
      </div>
      <label htmlFor="fileInput" className="cursor-pointer bg-[var(--color-fern)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-fern)] text-xl font-semibold">Select Image</label>
    </div>
  )
}

const FoodForm =  ({ foodItem }: { foodItem?: foodItemType }) => {
  type Address = {
    street: string;
    state: string;
    zip: string;
  }

  type Times = {
    date: string;
    start: string;
    end: string;
  }

  const possibleTags = [
    "All",
    "Italian",
    "South Asian",
    "Vegetarian",
    "Vegan",
    "Dairy-Free",
    "Gluten-Free",
    "Student-Made",
    "Dessert",
    "Organic"
  ];
  const tagRecord = possibleTags.reduce((obj, e) => {
    obj[e] = false;
    return obj;
  }, {} as Record<string, boolean>)

  // const [image, setImage] = useState<File | undefined>(undefined);
  const [food, setFood] = useState(foodItem?.foodName || "");
  const [orgName, setOrgName] = useState(foodItem?.foodName || ""); 
  const [tags, setTags] = useState<Record<string, boolean>>(tagRecord);
  const [times, setTimes] = useState<Times | undefined>(undefined);
  const [address, setAddress] = useState<Address | undefined>(undefined);

  const changeTimes = (field: "date" | "start" | "end", value: string) => {
    setTimes(prevTimes => {
      return {...(prevTimes || {date: "", start:"", end:""}), [field]: value};
    })
  }

  const changeAddress = (field: "street" | "state" | "zip", value: string) => {
    setAddress(prevAddress => {
      return {...(prevAddress || {street:"", state:"", zip:""}), [field]: value}
    })
  }

  const { isOpen, toggleOpen } = useContext(FoodListingContext)!;
  const { addCard } = useContext(FoodCardsContext)!;

  useEffect(() => {
    setFood("");
    setOrgName("");
    setTags(tagRecord);
    setTimes(undefined);
    setAddress(undefined);
  }, [isOpen]);

  const onSubmit = () => {
    const newFood: foodItemType = {
      id: 0,
      foodName: food,
      restaurantName: orgName,
      imageUrl: "Pizza.jpg",
      distance: 0,
      pickupTime: `${times ? times.date : ""}, ${times ? times.start : ""} - ${times ? times.end : ""}`,
      tags: Object.entries(tags).filter(([,v]) => v).map(([k,]) => k),
      active: true,
      isFavorite: false
    }
    addCard(newFood);
    toggleOpen();
  }

  return (
    <div className="bg-black rounded-[15px] bg-white flex justify-center gap-5 flex-col items-left z-10 px-10 py-5 text-black">
      <h2 className="text-4xl font-bold text-gray-800 py-3">Add a Food Listing</h2>
      <div className="flex gap-[10px] justify-center items-center">
        <div className="flex-1">
          <ImageUpload />
        </div>
        <div className="flex-1 flex gap-[20px] flex-col">
          <input 
            type="text"
            placeholder="Name of food"
            value={food}
            onChange={e => setFood(e.target.value)} 
            className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
          />
          <input 
            type="text"
            placeholder="Your organization's name"
            value={orgName}
            onChange={e => setOrgName(e.target.value)} 
            className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
          />
          <div className="flex flex-row gap-[20px] items-center">
            <p className="text-xl font-semibold">Date: </p>
            <input
              type="date"
              value={times ? times.date : ""}
              onChange={e => changeTimes("date", e.target.value)} 
              className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-5">
        <p className="text-xl font-semibold">Start: </p>
        <input
          type="time"
          value={times ? times.start : ""}
          onChange={e => changeTimes("start", e.target.value)} 
          className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
        />
        <p className="text-xl font-semibold">End: </p>
        <input 
          type="time"
          value={times ? times.end : ""}
          onChange={e => changeTimes("end", e.target.value)} 
          className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
        />
      </div>
      <div className="flex flex-col gap-[2px]">
        <div className="flex flex-row gap-[10px]">
          <p className="text-xl font-semibold text-black">Tags: </p>
          {Object.entries(tags)
            .filter(([,value]) => value)
            .map(([tag,]) => (
              <p key={tag} className="text-xl text-black">{tag}</p>
          ))}
        </div>
        <select
          onChange={e => setTags({...tags, [e.target.value]:!tags[e.target.value]})}
          className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {possibleTags.map((tag, idx) => 
            (
              <option key={idx} value={tag}>
                {tag}
              </option>
            )
          )}
        </select>
      </div>
      <div className="flex gap-[10px] justify-center items-center">
        <div className="flex-1">
          <p className="text-xl font-semibold">Where to pick up?</p>
        </div>
        <div className="flex-2 flex flex-col gap-[10px]">
          <input 
          type="text"
          placeholder="street"
          value={address ? address.street : ""}
          onChange={e => changeAddress("street", e.target.value)} 
          className="w-full p-2 border rounded-md border-black border-2 text-black text-xl"
          />
          <div className="flex flex-row gap-[10px] justify-center items-center">
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
        </div>
      </div>
      <div className="flex justify-center gap-10">
        <button
          onClick={toggleOpen}
          className="flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-400 transition w-20"
        >
          <X className="w-5 h-5 text-white-700" />
        </button>
        <button
          onClick={onSubmit}
          className="flex justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition w-50"
        >
          <p className="text-xl font-semibold text-white-700">Submit</p>
        </button>
      </div>
    </div>
  )
}

export { ImageUpload, FoodForm };