export type DeviceProps = {
    _id: string;
    name: string;
    from_location: {
        _id: string;
        name: string;
    };
    identifier: string;
    specification: string;
    type: string;
    ip_address: string;
    totalAlerts?: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};
