export type TaskProps = {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
        profile_picture: string;
    };
    task: {
        _id: string;
        event_level?: string;
        event_type?: string;
        event_picture?: string;
        description?: string;
        from_camera?: {
            _id?: string;
            name?: string;
        };
        name?: string;
        temperature?: number;
        humidity?: number;
        human_presence?: boolean;
        AQI?: number;
        from_location?: {
            _id?: string;
            name?: string;
        };
        status: string;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
    };
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};
