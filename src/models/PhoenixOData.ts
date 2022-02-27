export default class PhoenixOData<T> {
    help: string;
    success: boolean;
    result: PhoenixODataResult<T>;
}

export class PhoenixODataResult<T> {
    include_total: boolean;
    resource_id: string;
    fields: [{type: string, id: string}];
    records_format: string;
    records: [T];
    limit: number;
    links: {start: string, next: string};
    total: number;
}