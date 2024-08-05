export type EventProps = {
    _id: string;
    event_level: string;
    event_type: string;
    event_picture: string;
    description: string;
    from_camera: {
        _id: string;
        name: string;
    };
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};
