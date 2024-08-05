export type IotProps = {
    _id: string;
    name: string;
    temperature: number;
    humidity: number;
    AQI: number;
    from_location: {
        _id: string;
        name: string;
    };
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};
