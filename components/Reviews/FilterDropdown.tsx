import { useEffect, useRef, useState } from "react";

type itemObject = {
  name?: string;
  value: number | string;
};

type item = itemObject | string | number;

type DropdownProps = {
  items: item[];
  value?: string | number;
  placeholder?: string;
  setValue: (value: string | number) => void;
  valuePrefix?: string;
};

export default function FilterDropdown({
  items,
  value,
  setValue,
  placeholder,
                                         valuePrefix,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const displayedValue = (value: string | number | undefined) => {
    if (value) {
      const item = items.find((item) => {
        if (typeof item !== "object") {
          return item === value;
        } else {
          return item.value === value;
        }
      });
      if (item) {
        if (typeof item !== "object") {
          // return usePlaceholder ? placeholder + " - " + item : item;
          return valuePrefix ? valuePrefix + " " + item : item;
        } else {
          return valuePrefix
            ? valuePrefix + (item.name || item.value)
            : item.name || item.value;
        }
      }
    }
    return placeholder;
  };

  // register clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <div
      className="relative flex flex-col items-center w-full"
      ref={dropdownRef}
    >
      <button
        className={`relative w-full text-3xl text-left pl-8 p-4 bg-wisteria-600 hover:bg-wisteria-700 ${
          open
            ? "rounded-b-none dropdown-rounded"
            : "rounded-full transition-delayed"
        }`}
        onClick={() => {
          setOpen(!open);
        }}
        // onBlur={() => setOpen(false)}
      >
        <>
          {displayedValue(value)}
          <span className="absolute right-0 h-full p-2 overflow-hidden -translate-y-1/2 rounded-full top-1/2 aspect-square">
            <svg
              className={`w-full h-full transition-all-300 ${
                open ? "rotate-180" : "transition-delayed"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </>
      </button>
      <div
        className={`absolute z-50 flex text-3xl flex-col max-h-96 overflow-y-auto items-center transition-all-300 ${
          open ? "rect-clip-visible" : "rect-clip-hidden-top"
        } w-full px-4  top-full rounded-b-2xl pb-2 scrollbar-gray-800 border-t-4 scrollbar-m-b-2 bg-base-500 border-base-500`}
      >
        {items.map((item, index) => (
          <button
            className="w-full px-4 py-1 rounded-md transition-all-300 hover:bg-lavender-500"
            key={index}
            onClick={() => {
              if (typeof item !== "object") {
                setValue(item);
              } else {
                setValue(item.value);
              }
              setOpen(false);
            }}
          >
            {typeof item !== "object" ? item : item.name || item.value}
          </button>
        ))}
      </div>
    </div>
  );
}
