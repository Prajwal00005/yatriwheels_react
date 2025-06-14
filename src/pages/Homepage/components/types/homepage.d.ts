export interface HomepageInitialState {
    data: Vehicle[],
    loading: boolean,
    searchValue?: string;
    selectedCategpryId: string[],
    minPrice: number | null;
    maxPrice: number | null;


    error?: {
        message: string,
    } | null;
}

export interface Vehicle {
    _id: string;
    name: string;
    description: string;
    category: string;
    types: string;
    price: number;
    seat: number;
    location: string;
    numberPlate: string;
    createdBy: {
        _id: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
}
