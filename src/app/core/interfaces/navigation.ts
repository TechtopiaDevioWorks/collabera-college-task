export interface DropdownValue {
    title: string;
    value: string;
}

export interface CollegeFilter {
    region?: string | null;
    branch?: string | null;
    minScore?: number | null;
    maxScore?: number | null;
}