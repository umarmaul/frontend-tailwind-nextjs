export type LocationProps = {
    _id: string;
    name: string;
    supervisor: {
        _id: string;
        name: string;
        email: string;
    };
    operator: {
        _id: string;
        name: string;
        email: string;
    };
    description: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};
