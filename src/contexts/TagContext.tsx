import { createContext, useContext, useState, ReactNode } from 'react';

type TagContextType = {
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
};

const TagContext = createContext<TagContextType | undefined>(undefined);

const TagProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All'); // Default tag is "All"

  return (
    <TagContext.Provider value={{ selectedTag, setSelectedTag }}>
      {children}
    </TagContext.Provider>
  );
};

const useTag = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTag must be used within a CounterProvider");
  }
  return context;
};

export {TagProvider, useTag};