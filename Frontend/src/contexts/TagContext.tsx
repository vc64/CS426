import { createContext, useState, ReactNode } from 'react';

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

export {TagProvider, TagContext};