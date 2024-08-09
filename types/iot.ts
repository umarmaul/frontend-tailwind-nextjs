export type IotProps = {
    _id: string;
    temperature: number;
    humidity: number;
    human_presence: boolean;
    AQI: number;
    from_device: {
        _id: string;
        name: string;
        from_location: {
            _id: string;
            name: string;
        };
    };
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};
