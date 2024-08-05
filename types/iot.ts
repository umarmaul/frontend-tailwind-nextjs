export type IotProps = {
    _id: string;
    name: string;
    temperature: number;
    humidity: number;
    AQI: number;
    from_location: {
        name: string;
    };
    status: string;
    createdAt: Date;
};
