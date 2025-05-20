export interface MemeOption {
    value: string;
    label: string;
    type: "image" | "text";
}

export const MemeOptions: MemeOption[] = [
  { value: "trash", label: "Trash", type: "image" },
  { value: "vr", label: "VR", type: "text" },
  { value: "dab", label: "Dab", type: "image" },
  { value: "disability", label: "Disability", type: "image" },
  { value: "door", label: "Door", type: "image" },
  { value: "egg", label: "Egg", type: "image"},
  { value: "excuseme", label: "Excuse Me", type: "text" },
  { value: "failure", label: "Failure", type: "image" },
  { value: "hitler", label: "Hitler", type: "image" },
  { value: "humanity", label: "Humanity", type: "text" },
  { value: "idelete", label: "Delete", type: "image" },
  { value: "jail", label: "Jail", type: "image" },
  { value: "roblox", label: "Roblox", type: "image" },
  { value: "satan", label: "Satan", type: "image" },
  { value: "stonks", label: "Stonks", type: "text" }
];