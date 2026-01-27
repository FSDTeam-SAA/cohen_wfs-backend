import { Query } from 'mongoose';

class EnquiryQueryBuilder<T> {
    constructor(
        public modelQuery: Query<T[], T>,
        public query: Record<string, unknown>
    ) { }

    search(searchableFields: string[]) {
        const searchTerm = (this.query?.searchTerm as string)?.trim();
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            } as any);
        }
        return this;
    }

    filter() {
        const queryObj = { ...this.query };
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);

        const finalFilters: Record<string, any> = {};

        Object.keys(queryObj).forEach((key) => {
            const value = queryObj[key];
            if (value === null || value === undefined || value === '') return;

            // Map URL 'product' to DB 'productInterest' if necessary
            const dbKey = key === 'product' ? 'productInterest' : key;

            if (typeof value === 'string') {
                // Use a string-based regex with 'i' option for absolute reliability
                // ^ and $ ensure it matches the whole word
                finalFilters[dbKey] = { $regex: `^${value.trim()}$`, $options: 'i' };
            } else {
                finalFilters[dbKey] = value;
            }
        });

        this.modelQuery = this.modelQuery.find(finalFilters);
        return this;
    }

    sort() {
        const sort = (this.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }

    paginate() {
        const page = Number(this.query?.page) || 1;
        const limit = Number(this.query?.limit) || 10;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }

    fields() {
        const fields = (this.query?.fields as string)?.split(',')?.join(' ') || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}

export default EnquiryQueryBuilder;