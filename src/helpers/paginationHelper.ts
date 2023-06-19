import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (paginationOption: IOptions): IOptionsResult => {
  const page = Number(paginationOption.page || 1);
  const limit = Number(paginationOption.limit);

  const skip = (page - 1) * limit;

  const sortBy = paginationOption.sortBy || 'createdAt';
  const sortOrder = paginationOption.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
