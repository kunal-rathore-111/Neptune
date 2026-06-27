import { integer, primaryKey } from 'drizzle-orm/pg-core';
import { boolean, index, pgTable, text, timestamp, uuid, varchar, vector } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('usersTable', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: varchar('email', { length: 400 }).notNull().unique(),
  isVerified: boolean('isVerified').default(false).notNull(),
  password: text('password'),
  image: text('image'),
  createdAt: timestamp('createdAt', { mode: "date", withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: "date", withTimezone: true }).defaultNow().notNull(),
});

export const AccountsTable = pgTable('accountsTable', {
  userId: uuid('userId').references(() => UsersTable.id, { onDelete: "cascade" }).notNull(),
  provider: text('provider').notNull(), // not using enum so flexible for later more provider options
  providerAccountId: text('providerAccountId').notNull()
}, (table) => ({
  accountKey: primaryKey({ columns: [table.provider, table.providerAccountId] })
}));


export const SignUpOTPTable = pgTable('signUpOTPTable', {
  email: text('email').primaryKey(), // will act as indexing as unique
  otp: text('otp').notNull(),
  attempts: integer('attempts').notNull().default(0),
  expiresAt: timestamp('expiresAt', { withTimezone: true, mode: "date" }).notNull()
})
export const ForgotPasswordOTPTable = pgTable('forgotPasswordOTPTable', {
  email: text('email').primaryKey(), // will act as indexing as unique
  otp: text('otp').notNull(),
  attempts: integer('attempts').notNull().default(0),
  expiresAt: timestamp('expiresAt', { withTimezone: true, mode: "date" }).notNull()
})

export const ContentTable = pgTable(
  'contentTable',
  {
    id: uuid('id').primaryKey().defaultRandom().unique(),
    title: text('title').notNull().unique(),
    description: text('description'),
    link: text('link'),
    // varchar instead of pgEnum — category list is validated at the application layer (Zod)

    category: text('category').default('Others').notNull(),

    tags: varchar('tags', { length: 50 }).array(),

    userId: uuid('userId')
      .references(() => UsersTable.id, { onDelete: 'cascade' })
      .notNull(),

    createdDate: timestamp('createdDate').defaultNow().notNull(),
    updatedDate: timestamp('updatedDate').defaultNow().notNull(),
    embedding: vector('embedding', { dimensions: 768 }),
  },
  (ContentTable) => ({
    userIndex: index('userIndex').on(ContentTable.userId),
    embeddingIndex: index('embeddingIndex').using('hnsw', ContentTable.embedding.op('vector_cosine_ops')),
  }),
);


export const UserShareLinkTable = pgTable('UserShareLinkTable', {
  id: uuid('id').primaryKey().defaultRandom(),
  linkHash: text('linkhash').notNull(),
  userId: uuid('userId')
    .notNull()
    .references(() => UsersTable.id, { onDelete: 'cascade' }),
});

// contentLink
export const ContentShareLinkTable = pgTable('ContentShareLinkTable', {
  id: uuid('id').primaryKey().defaultRandom(),
  contentSharehash: text('contentShareHash').notNull(),
  contentId: uuid('contentId')
    .references(() => ContentTable.id, { onDelete: 'cascade' })
    .notNull()
    .unique(), // one content will have one share link
});
