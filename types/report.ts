export type ReportProps = {
    _id: string;
    report_type: string;
    reporter: {
        _id: string;
        name: string;
        email: string;
    };
    reported_to: {
        _id: string;
        name: string;
        email: string;
    };
    event?: {
        _id: string;
        event_level: string;
        event_type: string;
        event_picture: string;
        description: string;
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
    sensor?: {
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
    status: string;
    report_file: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};
