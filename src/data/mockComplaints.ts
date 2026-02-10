export interface MockComplaint {
  id: number;
  title: string;
  issueType: "pothole" | "garbage" | "drainage" | "water_leakage" | "other";
  severity: "Low" | "Medium" | "High";
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "Assigned" | "In Progress" | "Resolved";
  area: string;
  date: string;
  duplicateCount: number;
  imageUrl: string;
  aiConfidence: number;
  description: string;
}

export const issueTypeLabels: Record<string, string> = {
  pothole: "Pothole",
  garbage: "Garbage",
  drainage: "Drainage",
  water_leakage: "Water Leakage",
  other: "Other",
};

export const mockComplaints: MockComplaint[] = [
  {
    id: 1001,
    title: "Large pothole on MG Road near bus stop",
    issueType: "pothole",
    severity: "High",
    priority: "Critical",
    status: "Open",
    area: "Ward 3",
    date: "2026-02-10",
    duplicateCount: 12,
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&h=300&fit=crop",
    aiConfidence: 94,
    description: "Deep pothole approximately 2ft wide causing vehicle damage.",
  },
  {
    id: 1002,
    title: "Garbage overflow at Sector 7 bins",
    issueType: "garbage",
    severity: "Medium",
    priority: "High",
    status: "Assigned",
    area: "Ward 1",
    date: "2026-02-09",
    duplicateCount: 5,
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    aiConfidence: 89,
    description: "Municipal bins overflowing for 3 days. Stray animals spreading waste.",
  },
  {
    id: 1003,
    title: "Blocked drainage causing waterlogging",
    issueType: "drainage",
    severity: "High",
    priority: "High",
    status: "Open",
    area: "Ward 5",
    date: "2026-02-09",
    duplicateCount: 8,
    imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
    aiConfidence: 91,
    description: "Storm drain blocked with debris. Water accumulating on road.",
  },
  {
    id: 1004,
    title: "Water pipe leakage on Park Avenue",
    issueType: "water_leakage",
    severity: "High",
    priority: "Critical",
    status: "In Progress",
    area: "Ward 2",
    date: "2026-02-08",
    duplicateCount: 3,
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop",
    aiConfidence: 96,
    description: "Major water main leak flooding residential area.",
  },
  {
    id: 1005,
    title: "Minor crack on sidewalk near school",
    issueType: "pothole",
    severity: "Low",
    priority: "Low",
    status: "Open",
    area: "Ward 4",
    date: "2026-02-07",
    duplicateCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=400&h=300&fit=crop",
    aiConfidence: 72,
    description: "Small crack in sidewalk. Pedestrian hazard for elderly.",
  },
  {
    id: 1006,
    title: "Garbage dumped in vacant lot",
    issueType: "garbage",
    severity: "Medium",
    priority: "Medium",
    status: "Open",
    area: "Ward 6",
    date: "2026-02-07",
    duplicateCount: 4,
    imageUrl: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&h=300&fit=crop",
    aiConfidence: 87,
    description: "Illegal dumping of construction debris and household waste.",
  },
  {
    id: 1007,
    title: "Drainage grate missing on 3rd Street",
    issueType: "drainage",
    severity: "Medium",
    priority: "High",
    status: "Assigned",
    area: "Ward 3",
    date: "2026-02-06",
    duplicateCount: 2,
    imageUrl: "https://images.unsplash.com/photo-1505567745926-ba89000d255a?w=400&h=300&fit=crop",
    aiConfidence: 83,
    description: "Metal grate cover stolen/missing. Open drain is a safety hazard.",
  },
  {
    id: 1008,
    title: "Broken fire hydrant leaking water",
    issueType: "water_leakage",
    severity: "Low",
    priority: "Medium",
    status: "Open",
    area: "Ward 1",
    date: "2026-02-05",
    duplicateCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=400&h=300&fit=crop",
    aiConfidence: 78,
    description: "Slow leak from fire hydrant base. Minor water wastage.",
  },
];
