type SubPrismaOrderBy = {
  [name: string]: 'asc' | 'desc';
};
export type PrismaOrderBy = {
  [name: string]: 'asc' | 'desc' | SubPrismaOrderBy;
};
